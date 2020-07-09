# Fairness & Privacy

Orign: priewienv's [_secret sharing_](https://blog.priewienv.me/post/randomness-blockchain-1/) draws my attentions.

Some nice books&papers:

+ [Timed Commitments](https://www.iacr.org/archive/crypto2000/18800237/18800237.pdf)
+ [Timed-Release Secret Sharing Scheme with Information Theoretic Security](https://arxiv.org/pdf/1401.5895.pdf)
    + [How to build time-lock encryption](https://eprint.iacr.org/2015/482.pdf)
+ [Threshold Logical Clocks for Asynchronous Distributed Coordination and Consensus](https://arxiv.org/abs/1907.07010)
+ [Homomorphic Time-Lock Puzzles and Applications](https://eprint.iacr.org/2019/635)
    * [TEX – A Securely Scalable Trustless Exchange](https://eprint.iacr.org/2019/265.pdf)
+ [Anonymous Multi-Hop Locks for Blockchain Scalability and Interoperability](https://www.ndss-symposium.org/wp-content/uploads/2019/02/ndss2019_09-4_Malavolta_paper.pdf)
+ [Concurrency and Privacy with Payment-Channel Networks](https://eprint.iacr.org/2017/820)
    * using Multihop HTLC


__Q:__ is there an efficient way to do simple private information retrieval to get 1 out of N items, without the sender knowing which out of the N was requested?

__A:__ [oblivious transfer](https://en.wikipedia.org/wiki/Oblivious_transfer)

+ 1-out-of-n oblivious transfer is incomparable to private information retrieval (PIR). On the one hand, 1-out-of-n oblivious transfer imposes an additional privacy requirement for the database: namely, that the receiver learn at most one of the database entries. On the other hand, PIR requires communication sublinear in n, whereas 1-out-of-n oblivious transfer has no such requirement.

## DKG

## MPC
+ (输出结果)正确性
+ 隐私性
+ 输入独立性
+ 公平性
    * 一个参与者获得了输出，则其他参与者也必须获得输出
+ 保证输出送达
    * 每个诚实参与者都能获得输出

### Homomorphic Encryption, 同态加密
+ The computations are represented as either Boolean or arithmetic(加减乘除) circuits.
+ [What is the link, if any, between Zero Knowledge Proof (ZKP) and Homomorphic encryption?](https://crypto.stackexchange.com/questions/57747/what-is-the-link-if-any-between-zero-knowledge-proof-zkp-and-homomorphic-enc)
+ 分类
    * partially homomorphic
        - 只能实现一个运算
    * somewhat homomorphic
        - 实现两种门电路(运算), but only for a subset of circuits
    * leveled fully homomorphic
        - 先决有限深度的任意运算
    * fully homomorphic
        - 无限深度任意运算
        - 对于实际应用来说，主要是乘法深度比较重要

### Garbled Circuit & Oblivious Transfer
和电路也紧密相关

### Verifiable Secret Sharing
重建 secret, VSS 允许恶意参与者(submitting fake shares).

####  Shamir's Secret Sharing Scheme, SSSS
其实就是门限 Secret Sharing

May not be VSS:

+ https://crypto.stackexchange.com/questions/47230/does-shamir-secret-sharing-provide-integrity
+ https://en.wikipedia.org/wiki/Lagrange_polynomial
+ https://crypto.stackexchange.com/questions/54578/how-to-forge-a-shamir-secret-share


#### multi-signature

bitcoin 原本的 multi-signature (BIP [#11](https://github.com/bitcoin/bips/blob/master/bip-0011.mediawiki), [#16](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki), [#17](https://github.com/bitcoin/bips/blob/master/bip-0017.mediawiki)) [其实和 Shamir's Secret Sharing 有点关系](https://en.bitcoin.it/wiki/Multisignature):
> Shamir's Secret Sharing Scheme (ssss)[2] is a general software implementation of multisig.

而 [MuSig](https://eprint.iacr.org/2018/068.pdf) 中说:

> Multi-signature protocols, first introduced by Itakura and
Nakamura [IN83](https://scinapse.io/papers/200023587), allow a group of signers (each possessing its own private/public key pair) to produce a single signature σ on a message m. Verification of the validity of a purported signature σ can be publicly performed given the message and the set of public keys of all signers. **A trivial way** to transform a standard signature scheme into a multi-signature scheme is to have each signer produce a stand-alone signature for m with its private key and to concatenate all individual signatures. However, the size of the multi-signature in that case **grows linearly** with the number of signers. 

（所以还是找不到名字。。。。所以就叫它  ~~standard-signature-scheme-transformed~~ [IN83]  就好了？逃）

另，MuSig 中还说, Schnorr multi-signature 应该是在 [[BN06]](https://dl.acm.org/citation.cfm?id=1180453) 提出. Schnorr 本身应该是在 [[Sch91]](https://dl.acm.org/citation.cfm?id=2725006) 提出.


## Threshold Signature Scheme
密钥打碎分开存储，然后在需要时通过MPC多方安全计算生成签名

和传统的 多签方案不同的是 多签是有多把私钥，如果私钥复用则泄漏了就有危险。传统多签是链上的，和链采用哪条曲线有关。tss 是链下的纯密码学的计算，目的是为了生成签名，兼容性更强。

和 secret sharing也不一样，secret sharing 虽然也打碎了密钥，但是最终要有一个 dealer 重构出密钥并进行签名，那么就存在 单点故障和重构出的密钥可能被泄露的问题。而 tss不需要 重构出密钥，就不用怕 密钥泄漏。（tss还有一些别的nice feature，key rotation 也就是私钥可变，更增加了攻击的难度）

## Timed Commitments
+ the receiver is kinda guaranteed (I mean, with high probability) to recover the signature from the commitment after given time
    + makes use of time needed for computing squarings
        + gradual revealing, eliminating possibility by trying again and again 
    + high computing power won't speed it up
    + the committer also need to convince the receiver the commiment is indeed the commitment of the desired signature
        + use zkp (a simulator can produce...)
+ there also is a proof as the shortcut to verify, so that others don't need to go through the recovery process again to verify
+ not sure whether the use of CA will introduce problem?
+ applications
    * Contract Signing
    * Collective coin-flipping
    * Honest-Preserving Autions
        - vs [uncheatable auctions](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.24.6692&rep=rep1&type=pdf)
    * in Zero-Knowledge
        - constant time/rounds by using force-opening


## Atomic Swap

Atomic Swap 的一些解释说明。论文rephrase可用。

+ https://en.wikipedia.org/wiki/Atomicity_(database_systems)
    * An indivisible and irreducible series of operations such that either all occur, or nothing occurs.
    * At one moment in time, it has not yet happened, and at the next it has already occurred in whole (or nothing happened if the transaction was cancelled in progress).
+ Atomic Cross-Chain Swaps, https://arxiv.org/pdf/1801.09515.pdf
    * An atomic swap protocol guarantees
        - (1) if all parties conform to the protocol, then all swaps take place,
        - (2) if some coalition deviates from the protocol, then no conforming party ends up worse off, and
        - (3) no coalition has an incentive to deviate from the protocol.

## Differential Privacy, 差分隐私

注入噪音或扰动

在或者不在这个数据集中，对查询结果没有影响。

攻击者通过对该数据集的任何查询或者背景知识都无法准确推断出是否在数据集中。

在不在数据集中都不会影响最终的查询结果，那么可以认为就不在这个数据集中，而如果不在数据集中，数据自然不会泄露。

(Google: https://github.com/google/differential-privacy)
(apple 也有用 差分隐私吧，但不开源？)

+ https://github.com/menisadi/awesome-differential-privacy
+ https://github.com/AceEviliano/Differential-Privacy-Explained


## Projects
+ 密钥托管
    * https://github.com/bitwarden
        - https://github.com/dani-garcia/bitwarden_rs
    * https://github.com/hashicorp/vault
        - https://learn.hashicorp.com/vault
            + https://www.hashicorp.com/
                * https://hashiconf.hashicorp.com/?utm_source=vaultsubnav
    * KZen?
        - [Universal Private Key Management for Cryptocurrencies](https://github.com/ChrisLinn/chrislinn.ink/tree/master/assets/Universal+Private+Key+Management+for+Cryptocurrencies-draft23.pdf)
    * SmartCustody
        - https://www.smartcustody.com/index.html
        - https://github.com/BlockchainCommons/SmartCustodyWhitePapers
        - https://www.smartcustody.com/projects/Smart-Custody-Book/
            + pdf: https://bit.ly/SmartCustodyBookV101
+ MPC
    * https://github.com/microsoft/CCF
        - Confidential Consortium Framework - a framework to build secure, highly available, and performant applications that focus on multi-party compute and data
        - https://microsoft.github.io/CCF/
    * https://github.com/Microsoft/SEAL
        - Microsoft homomorphic encryption library
    * https://github.com/google/private-join-and-compute
* privacy enhancement
    * https://www.future-fis.com/the-pet-project.html

## 如何安全地保存密码？
+ https://signal.org/blog/secure-value-recovery/
    ```
    stretched_key = Argon2(passphrase=user_passphrase, output_length=32)

    auth_key    = HMAC-SHA256(key=stretched_key, "Auth Key")
    c1          = HMAC-SHA256(key=stretched_key, "Master Key Encryption")
    c2          = Secure-Random(output_length=32)

    master_key      = HMAC-SHA256(key=c1, c2)
    application_key = HMAC-SHA256(key=master_key, "Social Graph Encryption")
    ```
    + application_key: 可以根据不同的 app 从 master_key 派生
    + master_key 光知道 用户密码是无法恢复的，还要知道 random 的 c2
    + `r2` is random, we can regenerate others but we will need to restore `r2` 
        * 服务器存 c2，用户自己记得 user_passphrase，这样换设备等时就能恢复 master_key
            * 用 `auth_key` 加密存储 `c2`
            * 同时 c2 要有了 auth_key 才能访问
        * 但是要防止穷举，所以用 SGX 做了失败尝试次数限定
+ https://dchest.com/2020/05/25/improving-storage-of-password-encrypted-secrets-in-end-to-end-encrypted-apps/
    * 这篇文章的分析不错
    * 结论可以看:
        - ![](https://dchest.files.wordpress.com/2020/05/img_0140.png)
        * ![](https://dchest.files.wordpress.com/2020/05/img_0139.png?w=1024)

## Stealth Addresses, Anonymous/Confidential Transactions, CoinJoin
+ https://ethresear.ch/t/open-problem-improving-stealth-addresses/7438/9
+ https://eprint.iacr.org/2020/548
    * https://dl.acm.org/doi/pdf/10.1145/3321408.3321573?download=true
+ https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2020-June/017969.html
    * https://github.com/zkSNACKs/WabiSabi/releases/latest/download/WabiSabi.pdf
