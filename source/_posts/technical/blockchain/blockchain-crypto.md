# When do we need cryptography in blockchain space?

also see:

+ https://ethresear.ch/t/when-do-we-need-cryptography-in-blockchain-space
+ https://www.michaelstraka.com/posts/classgroups/
+ https://hackmd.io/@olivierbbb/r10VpNPZU
+ https://github.com/Chia-Network/vdf-competition/blob/master/classgroups.pdf
+ https://blog.goodaudience.com/deep-dive-on-rsa-accumulators-230bc84144d9?gi=b5fa21147b56

我觉得主要就是 VDF, accumulator, zkp, PCD 这些。zkp 所属其实又比较复杂，PCD 和 polynomial commitments 中可能使用 ZKP。(bulletproof, DARKs 是 alternative polynomial commitments? Sonic 中也构建了 polynomial commitments?)

然后里面又有基本工具:

+ hash function
    - 也不是都是抗量子的
        - 所谓抗量子也很复杂，什么 RSA assumption（分解质因数？）， discrete logarithm (DL) problem（DH？），decisional DH, computational DH，SDH。。。
            + 话说 共识里面 关于 assumption 的讨论： [Completeness Theorems for Non-Cryptographic Fault-Tolerant Distributed Computation](https://dl.acm.org/doi/pdf/10.1145/3335741.3335756)
    * 但好像还比较多抗量子的
+ lattice
    * 抗量子
+ GUO
    * 分类
        - RSA group, trusted setup 或 MPC
        - class group, trustless setup
            + 亦可用于 zkp???
    * GUO 可用于
        * [VDF](#vdf)
        * Cryptographic Accumulators
            - [Batching Techniques for Accumulators
with Applications to IOPs and Stateless Blockchains](https://eprint.iacr.org/2018/1188/20181210:211743)
                + create a **vector commitment** data structure analogous to Merkle trees
                    * merkle 应该用的是 hash
                + 这篇文章做到了 Dynamic Accumulator，也就是 constant-sized inclusion proofs
                    * Merkle trees 是 O(logn) ，并且不能 batch proofs for multiple elements
            + Accumulator
                + A cryptographic accumulator is a primitive that produces a short binding commitment to a set of elements together with short membership/non-membership proofs for any element in the set.
            + **Dynamic Accumulator**
                + Accumulator which supports addition/deletion of elements with O(1) cost, independent of the number of accumulated elements
            + Universal Accumulator
                + Dynamic Accumulator which supports membership and non-membership proofs
            + Batching
                + Batch verify n proofs faster than verifying a single proof n times
        * Accumulator 和 commitments 不是一个东西，但是可以用 commitment 去实现 Accumulator。不是彼此独立的概念。不过 accumulator 不关心顺序。主要目的不一样，commitment 是为了 binding，Accumulator 是为了 membership。
            - [Cryptographic accumulators can be interpreted as commitments](https://eprint.iacr.org/2016/766.pdf)
                + The first family of accumulators based on GUO
                + The second family of accumulators based on bilinear maps (即 pairings)
                + A third family of accumulators based on Merkle trees
                + 这几种的 安全性假设可以好好看看
                + 话说这篇文章讲的是 Functional Commitment，他可以同时做到 vector commitment, polynomial commitment 和 accumulator???
            - commitment schemes 有很多种，下面的分类只是 针对的对象不同，而不是说真的是不同的方法
                + [commit to a message 就有三种](https://cypherpunks.ca/~iang/pubs/PolyCommit-AsiaCrypt.pdf)
                    * using random generators of a group of prime order
                    * Pedersen
                    * one-way function
                    + 这几种的 安全性假设也可以好好看看
                + [vector commitments](https://eprint.iacr.org/2011/495.pdf)
                    + Trapdoor commitment -> Mercurial commitment ->  chameleon commitment 应该也属于 vector commitment
                + polynomial commitments
                    * https://pdfs.semanticscholar.org/31eb/add7a0109a584cfbf94b3afaa3c117c78c91.pdf
                    * https://cypherpunks.ca/~iang/pubs/PolyCommit-AsiaCrypt.pdf
                    * https://ethresear.ch/t/using-polynomial-commitments-to-replace-state-roots/
                        - 其中提到 polynomial commitments 也可作为 vector commitments
                + ...

schnorr signature (我感觉我甚至想写一篇 scriptless script is doom...) 感觉也挺有意义, 衍生到各种 DSA 相关。ZEC 他们搞了一堆。

Private_information_retrieval 这个亦有意义，涉及 intersection、交易撮合？

stealth address 这些则和很多相关，暂时不感兴趣。



## PCD
+ https://www.michaelstraka.com/posts/recursivesnarks/
+ https://eprint.iacr.org/2020/499


## VDF
see: https://blog.priewienv.me/post/verifiable-delay-function-1/



### [cVDF](https://eprint.iacr.org/2019/619.pdf)

#### (incremental) PoSW vs cVDF
a PoSW enables generating a publicly verifiable proof of some computation (rather than a specific function with a unique output) that is guaranteed to
have taken a long time. 

(Incremental) PoSWs do not satisfy (computational) uniqueness, which is a major downside for many applications (see [BBBF18] for several examples). 

cVDF enable verifiably outsourcing VDF computation.

incremental PoSW 就是 别人可以接着 PoSW；cVDF 就是别人可以接着 VDF。

### RSA Groups assumption
Everyone seems to love VDFs, but the complexity theory around them is a bit underwhelming — why do they only work against adversaries with a polynomial compute advantage?

[A Note on Low Order Assumptions in RSA groups](https://eprint.iacr.org/2020/402)