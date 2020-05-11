# 虚拟机验证

protocol/vm/ 里面即是虚拟机代码

vm 运算通过，即可花费 utxo

虚拟机结构在 vm.go 中：
```
type virtualMachine struct {
    context *Context

    program      []byte // the program currently executing
    pc, nextPC   uint32
    runLimit     int64
    deferredCost int64

    expansionReserved bool

    // Stores the data parsed out of an opcode. Used as input to
    // data-pushing opcodes.
    data []byte

    // CHECKPREDICATE spawns a child vm with depth+1
    depth int

    // In each of these stacks, stack[len(stack)-1] is the top element.
    dataStack [][]byte
    altStack  [][]byte
}
```

## context
将数据读进 context 中，然后在  vm 中执行. context 可以理解为 当前执行(到)什么操作

其中 `Context` 格式如下
```
type Context struct {
    VMVersion uint64
    Code      []byte
    Arguments [][]byte

    EntryID []byte

    // TxVersion must be present when verifying transaction components
    // (such as spends and issuances).
    TxVersion   *uint64
    BlockHeight *uint64

    // Fields below this point are required by particular opcodes when
    // verifying transaction components.

    NumResults    *uint64
    AssetID       *[]byte
    Amount        *uint64
    DestPos       *uint64
    SpentOutputID *[]byte

    TxSigHash   func() []byte
    CheckOutput func(index uint64, amount uint64, assetID []byte, vmVersion uint64, code []byte, expansion bool) (bool, error)
}
```

+ `Code` 是合约地址 control program 拓展成 验签 control program
    * 可以理解为 bitcoin 里面的 script
+ `Arguments` 是签名
+ `EntryID` 即 inputID/muxID/outputID 
+ `TxVersion` 用于可能需要不同 decode 模式的情况
+ `TxSigHash` 和 `CheckOutput` 传了两个 func，分别用于 校验交易哈希和 output资产类型&数量， 防止用户恶意构造