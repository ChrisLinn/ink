# PCN

## LN
* Poon-Dryja
    - 基于撤销惩罚实现的，这给双方带来了复杂的密钥管理和状态管理，进而增加了正确实现协议的难度和节点操作的风险。
* Decker-Wattenhofer
    - 基于时间戳的状态更新机制
    - 缺点是只允许有限数量的状态更新
        + layer 1 和用户都需要付出更高的成本，因为通道必须定时关闭和开启。
* Decker-Russell-Osuntokun 结构的 eltoo
    - doesn't need to store all old state but just the current state
    - Replace by Version
    - 需要在比特币中引入一个新的操作码 SIGHASH_NOINPUT
        + will ignore the prevout
    - 有些开发者诟病
        + channel breaches are not discouraged without penality

## Watch Tower

## Scriptless Scripts / 2 party ECDSA
Schnorr 签名也可达到这个效果，所以 Scriptless Scripts 很可能不会被实现???

用了 homomorphic Paillier encryption

## Schnorr Signatures / Musig
+ Linear signature Scheme
+ ability to hide complex scripts / contracts


<!-- 

Time-Dilation Attacks
+ https://arxiv.org/abs/2006.01418
+ https://bitcoinops.org/en/newsletters/2020/06/10/

fee attack on atomicity?
+ https://bitcoinops.org/en/newsletters/2020/04/29/#new-attack-against-ln-payment-atomicity
+ https://bitcoinops.org/en/topics/transaction-pinning/
+ https://bitcoinops.org/en/newsletters/2020/06/24/


mad-htlc
+ https://arxiv.org/abs/2006.12031


LN fee ransom attack:
+ https://bitcoinops.org/en/newsletters/2020/06/24/
+ https://lists.linuxfoundation.org/pipermail/lightning-dev/2020-June/002735.html

一些客户端 close 的 bug


 -->