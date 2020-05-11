# 验证交易

`protocol/validation/tx.go` 中 

`func ValidateTx(tx *bc.Tx, block *bc.Block) (*GasState, error)` 对交易进行验证

交易除了原生 types 层之外，有个 map 层的封装，便于 验证
```
type validationState struct {
    block     *bc.Block
    tx        *bc.Tx
    gasStatus *GasState
    entryID   bc.Hash           // The ID of the nearest enclosing entry
    sourcePos uint64            // The source position, for validate ValueSources
    destPos   uint64            // The destination position, for validate ValueDestinations
    cache     map[bc.Hash]error // Memoized per-entry validation results
}
```

`gasStatus := &GasState{GasValid: false}` 一开始是 `false` ，然后随着验证逐步更新， 如果最终有效  `GasValid`  才为 `true`

先进行一些基本检查，比如 `checkStandardTx` 检查是否是标准交易（P2SH, P2PKH, OP[0]==OP_TRUE, OP[0]==OP_FAIL）

---

然后 `checkValid` 检查输入输出是否合法(输入输出是否平衡，是否进行了正确的引用)，以及 gas 是否足够

`validationState` 中， `entryID` 为待校验的元素，比如 coinbase, spend, issue, retire, mux 等等， 其中 mux 作为一个连接器 连接 输入与输出

`cache` 则是对之前校验过的 entry 的 error 进行缓存，避免重复校验

`func checkValid(vs *validationState, e bc.Entry) ` 中反复有类似 `vs2 := *vs`
的语句出现是为了防止 浅拷贝 造成修改

`vm.Verify` 涉及到 [虚拟机验证](vm-verification.md)

其他的任务就落在了

1. `map[bc.AssetID]int64` 进行金额计算，校验是否溢出，并尝试 `setGas` 
2. 互为对称逻辑的 `checkValidDest` 和 `checkValidSrc` 检查输入
3. 对于 `*bc.Spend` 来说 还要检查 prevout amount 等于该 entry (即该 spend)的 `WitnessDestination.Value`

---

比如我们挑选最经典的 mux 对 `checkValidDest` 进行示范讲解。

对于 一个 `mux` ，代码中可以看到，`checkValid` 先对 `WitnessDestinations` (output) 进行 `checkValidDest`,
```
for i, dest := range e.WitnessDestinations {
    vs2 := *vs
    vs2.destPos = uint64(i)
    if err = checkValidDest(&vs2, dest); err != nil {
        return errors.Wrapf(err, "checking mux destination %d", i)
    }
}
```

然后对 `Sources` (input) 进行 `checkValidSrc`。
```
for i, src := range e.Sources {
    vs2 := *vs
    vs2.sourcePos = uint64(i)
    if err = checkValidSrc(&vs2, src); err != nil {
        return errors.Wrapf(err, "checking mux source %d", i)
    }
}
```

`checkValidDest(&vs2, dest)` 中 `vs2` 就是这个 mux 的验证状态， `dest` 就是这个输出，可能的类型有 `bc.Output`、`bc.Retirement`。

`vd.Ref` 是对这个输出本身的引用（回忆一下：所有 `entryID` 都以 `bc.Hash` 进行标识）
```
e, ok := vs.tx.Entries[*vd.Ref]
if !ok {
    return errors.Wrapf(bc.ErrMissingEntry, "entry for value destination %x not found", vd.Ref.Bytes())
}
```

对于 `bc.Output`、`bc.Retirement` 来说，它不像 mux 一样有很多入口出口，所以 position 为 0。简单来说，可以理解为 mux 有 WitnessDestinations 和 Sources （对应 sourcePosition），而 coindbase、spend、issue 只有 WitnessDestination，output、 retire 只有 Souce。而且这样的话，非 mux 的 `ValueSource` & `ValueDestination` 其实 Position、srcPosition、destPosition 可以统一看作 0，不予校验，因为不是数组。传入时就可以写0。

> `bc.Output`、`bc.Retirement` 的 `Source` ，`bc.Coinbase`、`bc.Issuance`、`bc.Spend` 的 `WitnessDestination` 可以简单地理解为跳过mux 去校验对应的来源／目的地。这样一来，再结合上一段，checkValid 中的 非 mux 的 cases 将会比较好理解。

```
var src *bc.ValueSource
switch ref := e.(type) {
case *bc.Output:
    if vd.Position != 0 {
        return errors.Wrapf(ErrPosition, "invalid position %d for output destination", vd.Position)
    }
    src = ref.Source

case *bc.Retirement:
    if vd.Position != 0 {
        return errors.Wrapf(ErrPosition, "invalid position %d for retirement destination", vd.Position)
    }
    src = ref.Source
```

同理，如果 当前 dest 是个 mux，准确地说是个对应在 mux 上的某位置输入，也就是说 mux 的“上家”是 Coinbase、Issuance 或 Spend，那么这个输入对应在 mux 的输入位置 是不可能大于 mux 所有的输入个数 `len(ref.Sources)` 的
```
if vd.Position >= uint64(len(ref.Sources)) {
    return errors.Wrapf(ErrPosition, "invalid position %d for %d-source mux destination", vd.Position, len(ref.Sources))
}
```

`ref = vs.tx.Entries[*vd.Ref]`, `src = ref.Source`, 这里的 `ref` 和 `.Ref` 可能看起来比较乱，可以理解为 `.Ref` 是 id,  `ref` 就是一个输出实体（一般来说 如果查找正确就是 vd 本身），比如对于 `bc.Output`
```
type Output struct {
    Source         *ValueSource `protobuf:"bytes,1,opt,name=source" json:"source,omitempty"`
    ControlProgram *Program     `protobuf:"bytes,2,opt,name=control_program,json=controlProgram" json:"control_program,omitempty"`
    Ordinal        uint64       `protobuf:"varint,3,opt,name=ordinal" json:"ordinal,omitempty"`
}
```

而 `src` (`src = ref.Source`) 可以理解为一个抽象实体(metadata)，包含了 ID `src.Ref` (对于一个 mux vstate 来说指向 mux, 否则 src 是 coinbase spend issue 这些。)、金额 `src.Value`、和位置信息 `src.Position`:
```
type ValueSource struct {
    Ref      *Hash        `protobuf:"bytes,1,opt,name=ref" json:"ref,omitempty"`
    Value    *AssetAmount `protobuf:"bytes,2,opt,name=value" json:"value,omitempty"`
    Position uint64       `protobuf:"varint,3,opt,name=position" json:"position,omitempty"`
}
```

检查自己确实和通过 vstate 中查到的自己 ID 相等:
```
if src.Ref == nil || *src.Ref != vs.entryID {
    return errors.Wrapf(ErrMismatchedReference, "value destination for %x has disagreeing source %x", vs.entryID.Bytes(), src.Ref.Bytes())
}
```

检查 `vs.destPos` 位置确实和通过 `vs.tx.Entries` 中查到的 src 位置相等（包括 ref 是一个 mux，即 vd 是 mux 上的一个输入，src是 通过 map 找到的输入，的情况）:
```
if src.Position != vs.destPos {
    return errors.Wrapf(ErrMismatchedPosition, "value destination position %d disagrees with %d", src.Position, vs.destPos)
}
```

下面也是很重要的一条，检查 `vd.Value` 是否和 通过 map 找回来的 `src.Value` 金额相等：
```
eq, err := src.Value.Equal(vd.Value)
```

---

`checkValidSrc` 的逻辑和 `checkValidDest` 是对称的，不再进行详细讲解。对 `checkValidSrc()` 还会先把要检查的src重新调用一遍 checkValid， 以保证 source 有效为前提。
