# TSS

+ https://github.com/ZenGo-X/awesome-tss

## reshare
+ https://eprint.iacr.org/2019/017.pdf
+ http://pmg.csail.mit.edu/papers/mpss-thesis.pdf
+ https://eprint.iacr.org/2019/1328.pdf
+ https://eprint.iacr.org/2015/304
+ https://eprint.iacr.org/2020/1052.pdf 3.1

## social recovery
+ https://bitrocks.me/secret-social-recovery
    * https://ethereum-magicians.org/t/social-recovery-using-address-book-merkle-proofs/3790

## scalable

+ [white-city](https://github.com/KZen-networks/white-city)
+ [Towards Scalable Threshold Cryptosystems](https://www.computer.org/csdl/proceedings-article/sp/2020/349700b242/1i0rIwLapqM)
    * The main innovation as I see it, is III.B. The work improves over KZG proofs in the case of multipoint evaluation by breaking the polynomial to a binary evaluation tree and use this tree to commit to the polynomial and prove evaluation in multiple points. The tree is binary and therefore instead of asymptotic O(nt) for threshold t they get O(n log t) which for large t makes a difference. 
    - It looks like using roots of unity is another trick but I am not sure if it is complementary or what’s  new about it.
    - I think that our-work on white-city fits nicely to this TSS and DKG protocols: https://github.com/KZen-networks/white-city/blob/master/White-City-Report/white_city.pdf . This is because we are handling the communication layer using BFT-SMR, assuming there is a TSS/DKG protocol. They are dealing with the protocol, assuming a supportive communication layer. Quoting from the paper: "Our DKG and VSS evaluations do not account for network delays. This is an important limitation. Our focus was on the computational bottlenecks of these protocols. Nonetheless, scaling and evaluating the broadcast channel of VSS and DKG protocols is necessary, interesting future work. In particular, ideas from scalable consensus protocols [4] could be used for this"
    - There is also the issue of trusted setup. I think it gets a new meaning here because if you assume your system is using threshold of 1million parties, it means that having adversary that controls 200 parties (as in largest trusted setup done so far lets say) is something that might happen with large probability.
+ GG18
    * https://eprint.iacr.org/2019/114.pdf
    * GG security proof was not tight (same way as Lindell 2P ECDSA)
        * How is the tightness comparison?
            * If you want to read more about tightness considerations in threshold ecdsa - I suggest to read first https://eprint.iacr.org/2019/503.pdf which main contribution is a proof with tightness as opposed to Lindell 2P-ECDSA.
+ Bandwidth-efficient threshold EC-DSA
    * https://eprint.iacr.org/2020/084
+ Hierarchical Threshold Secret Sharing
    * https://www.openu.ac.il/lists/mediaserver_documents/personalsites/tamirtassa/hss_conf.pdf


## non-interactive
preprocessing stage before the signed message is known

### 2020/501 vs 2020/492
see "2020_501 vs 2020_492"

### 2020/498 vs GG20
see "gg20_2"

<!-- 
### Efficient Constant-Round MPC with Identifiable Abort and Public Verifiability
https://eprint.iacr.org/2020/767
 -->

## comparison
+ https://medium.com/blockchain-at-berkeley/alternative-signatures-schemes-14a563d9d562
+ https://medium.com/cryptoadvance/bls-signatures-better-than-schnorr-5a7fe30ea716
+ all based on decisional DH
+ 尽管其中一些技术适用于所有曲线，但有必要考虑曲线效率和辅助因子选择等问题。

### summary
+ tECDSA
+ tBLS
    + [BLS](https://crypto.stanford.edu/~dabo/pubs/papers/BLSmultisig.html)
        * https://blog.dash.org/bls-is-it-really-that-slow-4ca8c1fcd38e
    * based on [pairing](/notes/crypto/pairing)
        - cons: assumption of pairing
            + 现在还没有 efficient, plausibly secure PQ (post-quantum!) bilinear maps （但 不 PQ的应该已经有了？）
    * verification 10x slower than ECDSA
    * 自带多签
        - 不需要多轮通信
            - 聚合很方便
                - 而且还能将区块中的所有签名组合为单个签名！
                    + 由矿工去聚合？虽然最后聚合出来只有一个结果且 size 小，但是聚合过程 pairing 开销大？
            * 大签名集的情况下非常有效
+ schnorr
    * was patented, satoshi missed it
    * efficient verification
        - 可以批量验证
    * 自带多签
        - 不适合扩展到大签名集
            + we need to make a merkle tree of public keys that can get pretty large for large m and n. (Merkle Multisig)
            - 需要多轮通信
    * With signature aggregation we have to rely on random number generator
        * we can’t choose random point R deterministically like we do in ECDSA
        * 如果你使用确定性K，它允许黑客获得我们的私钥
    + 另有新 [FROST: Flexible Round-Optimized Schnorr Threshold Signatures](https://eprint.iacr.org/2020/852.pdf)

## survey
+ https://webpages.uncc.edu/yonwang/papers/reviewTSS.pdf
+ https://eprint.iacr.org/2020/1390.pdf

## Misc
+ https://eprint.iacr.org/2019/523.pdf
+ https://eprint.iacr.org/2018/499.pdf
+ https://arxiv.org/abs/2007.04036
+ [Threshold variant of HashEdDSA with Rescue hash function](https://eprint.iacr.org/2020/214.pdf)
+ [Towards Threshold Key Exchange Protocols](https://arxiv.org/abs/2101.00084)
    + Paper suggests a threshold DH protocols and shows how they can be used to build threshold Wireguard. And we also considered use case of GG18, made two implementation: based on tss-lib (https://github.com/binance-chain/tss-lib) and multi-party-ecdsa (https://github.com/ZenGo-X/multi-party-ecdsa), and compared their performance