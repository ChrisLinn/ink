# UTXO 选择

<!-- ex_nolevel -->

比原 UTXO 选择算法逻辑在 account/utxo_keeper.go 中的 函数 optUTXOs 中，实现对可用的 UTXO 进行选择，使得 __尽量使用多笔小额代替单笔大额__ ，尽量减少残存 UTXO 数，避免 UTXO  __越来越散__ 。

## 1. 将所有的 UTXO 按金额由大到小排序
```
var optAmount, reservedAmount uint64
sort.Slice(utxos, func(i, j int) bool {
    return utxos[i].Amount > utxos[j].Amount
})
```

## 2. 将可用的 utxos push 到list 中 进行 slice 和 list 数据结构转换，得到按面值从大到小排序的 utxoList
```
utxoList := list.New()
for _, u := range utxos {
    if _, ok := uk.reserved[u.OutputID]; ok {
        reservedAmount += u.Amount
        continue
    }
    utxoList.PushBack(u)
}
```

##3. 最重要的部分：遍历 utxoList 中所有 UTXO

第一步从面值大开始选择，直到选中 UTXO 面值累计满足需要花费的金额； 

第二步，将第一步中选中的最大面值 UTXO 用未被选中的更小的面值的 UTXO 进行替换,顺序仍从大到小。如果替换后合计金额仍然大于目标金额，继续拿更小面值替换最大面值，直到选中的 UTXO 个数 大于等于5 且合计金额满足目标花费金额(为了平衡耗费时间和优化效果，超过 5 就不继续优化)，或无小面值可以替换最大面值时。

```
optList := list.New()
for node := utxoList.Front(); node != nil; node = node.Next() {
    //append utxo if we haven't reached the required amount
    if optAmount < amount {
        optList.PushBack(node.Value)
        optAmount += node.Value.(*UTXO).Amount
        continue
    }

    largestNode := optList.Front()
    replaceList := list.New()
    replaceAmount := optAmount - largestNode.Value.(*UTXO).Amount

    for ; node != nil && replaceList.Len() <= desireUtxoCount-optList.Len(); node = node.Next() {
        replaceList.PushBack(node.Value)
        if replaceAmount += node.Value.(*UTXO).Amount; replaceAmount >= amount {
            optList.Remove(largestNode)
            optList.PushBackList(replaceList)
            optAmount = replaceAmount
            break
        }
    }

    //largestNode remaining the same means that there is nothing to be replaced
    if largestNode == optList.Front() {
        break
    }
}
```

## 4. 构建最终选定的结果集
```
optUtxos := []*UTXO{}
for e := optList.Front(); e != nil; e = e.Next() {
    optUtxos = append(optUtxos, e.Value.(*UTXO))
}
```