# 链式交易

比原最近的 [PR #1356](https://github.com/Bytom/bytom/pull/1365) 新增了链式交易功能。 可以将多笔 utxo 合并成链并立即直接使用。

注意：目前只支持 spend btm 资产

__重点代码在 `account/builder.go`__

```
//流程： 
buildTxs
    for each spend_action
        -> SpendAccountChain()
            -> reserveBtmUtxoChain()
            -> buildBtmTxChain()
            -> add merged utxos as the input
```

```go
//chainTxUtxoNum maximum utxo quantity in a tx
chainTxUtxoNum = 10
//chainTxMergeGas chain tx gas
chainTxMergeGas = uint64(10000000)

...

// 将每 10 笔 utxo 合成 1 笔。 比如19笔需要合并 2次，成为链式的 2 个 tx；20 笔需要 3 次。
//calcMergeGas calculate the gas required that n utxos are merged into one
func calcMergeGas(num int) uint64 {
    gas := uint64(0)
    for num > 1 {
        gas += chainTxMergeGas
        num -= chainTxUtxoNum - 1
    }
    return gas
}
```

```go
// 预留链式交易 utxo 
func (m *Manager) reserveBtmUtxoChain(builder *txbuilder.TemplateBuilder, accountID string, amount uint64, useUnconfirmed bool) ([]*UTXO, error) {
    reservedAmount := uint64(0)
    utxos := []*UTXO{}
    for gasAmount := uint64(0); reservedAmount < gasAmount+amount; gasAmount = calcMergeGas(len(utxos)) {
        reserveAmount := amount + gasAmount - reservedAmount //原预留金额 + 新增预留金额 = 转账金额 + merge gas
        res, err := m.utxoKeeper.Reserve(accountID, consensus.BTMAssetID, reserveAmount, useUnconfirmed, builder.MaxTime())
        if err != nil {
            return nil, err
        }
        builder.OnRollback(func() { m.utxoKeeper.Cancel(res.id) })
        reservedAmount += reserveAmount + res.change //预留金额 += 新增预留金额+预留产生的找零
        utxos = append(utxos, res.utxos[:]...)
    }
    return utxos, nil
}
```

```go
func (m *Manager) buildBtmTxChain(utxos []*UTXO, signer *signers.Signer) ([]*txbuilder.Template, *UTXO, error) {

    ...

    // 循环每次添加 10 笔 utxo
    for index := 0; index < len(utxos); index++ {
        input, sigInst, err := UtxoToInputs(signer, utxos[index])
        if err != nil {
            return nil, nil, err
        }
        if err = builder.AddInput(input, sigInst); err != nil {
            return nil, nil, err
        }
        buildAmount += input.Amount()
        if builder.InputCount() != chainTxUtxoNum && index != len(utxos)-1 {
            continue
        }

        ...

        outAmount := buildAmount - chainTxMergeGas // 总 input = output + merge gas

        ...

        // 表示 index 已经遍历到最后一个 utxo（合并前的 utxo 数 - 1 = 合并后的 utxo 数 -2）
        if index == len(utxos)-2 {
            break
        }

        ...

```