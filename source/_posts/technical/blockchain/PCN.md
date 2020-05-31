# PCN

## LN
* Poon-Dryja
    - 基于撤销惩罚实现的，这给双方带来了复杂的密钥管理和状态管理，进而增加了正确实现协议的难度和节点操作的风险。
* Decker-Wattenhofer
    - 基于时间戳的状态更新机制
    - 缺点是只允许有限数量的状态更新
        + layer 1 和用户都需要付出更高的成本，因为通道必须定时关闭和开启。
* Decker-Russell-Osuntokun 结构的 eltoo
    - Replace by Version
    - 需要在比特币中引入一个新的操作码 SIGHASH_NOINPUT

