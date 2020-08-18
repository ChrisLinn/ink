---
title: When do we need cryptography in blockchain space?
---

# When do we need cryptography in blockchain space?

我觉得主要就是 VDF, accumulator, zkp, PCD 这些。zkp 所属其实又比较复杂，PCD 和 polynomial commitments 中可能使用 ZKP。(bulletproof, DARKs 是 alternative polynomial commitments? Sonic 中也构建了 polynomial commitments?)

对了，还有 [randomness](/notes/blockchain/randomness)，比如 VRF。(对 sharding、leader election 等很重要)

然后里面又有基本工具:

+ hash function
    - 也不是都是[抗量子的](/technical/crypto/hash/#post-quantuam)
    * 但好像还比较多抗量子的
+ lattice
    * 抗量子
    * 但是慢...
+ misc
    * 其他一些新东西...
        - Isogeny based crypto
            + 有啥用?
            + [可以不用 RSW time-lock puzzle 来构建 VDF](https://ethresear.ch/t/vdfs-delay-encryption/7542)
                * time-lock puzzles encode only one participant’s contribution, making individual puzzles almost worthless. And time-lock puzzles are expensive of course.
                * Isogeny VDFs require a trusted setup, but a painless one, nothing like the RSA nastiness. You generate the VDF parameters after the trusted setup, so the trusted setup itself remains tiny.
        - Hyperelliptic curve?
        - ristretto
        - RedDSA?
+ GUO
    * 分类
        - RSA group, trusted setup 或 MPC
        - class group, trustless setup
            + 亦可用于 zkp???
    * compression
        + [Trustless Groups of Unknown Order with Hyperelliptic Curves](https://eprint.iacr.org/2020/196.pdf) section 5 provides a way to Compress group element representation
    * GUO 可用于
        * [VDF](#vdf)
        * Cryptographic Accumulators
            - [Batching Techniques for Accumulators
with Applications to IOPs and Stateless Blockchains](https://eprint.iacr.org/2018/1188/20181210:211743)
                + create a **vector commitment** data structure analogous to Merkle trees
                    * merkle 应该用的是 hash
                + 这篇文章做到了 Dynamic Accumulator，也就是 constant-sized inclusion proofs
                    * Merkle trees 是 O(logn) ，并且不能 batch proofs for multiple elements
            + [Accumulator](https://eprint.iacr.org/2015/087.pdf)
                + A cryptographic accumulator is a primitive that produces a short binding commitment to a set of elements together with short membership/non-membership proofs for any element in the set.
            + **Dynamic Accumulator**
                + Accumulator which supports addition/deletion of elements with O(1) cost, independent of the number of accumulated elements
            + Universal Accumulator
                + Dynamic Accumulator which supports membership and non-membership proofs
            + Batching
                + Batch verify n proofs faster than verifying a single proof n times
            - ZKP accumulator
                + [Zero-Knowledge Accumulators and Set Operations](https://eprint.iacr.org/2015/404)
                + [An Expressive (Zero-Knowledge) Set Accumulator](https://ieeexplore.ieee.org/document/7961978)
                + [Zero-Knowledge Proofs for Set Membership: Efficient, Succinct, Modular](https://eprint.iacr.org/2019/1255)
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
                            + [Constant-Size Commitments to Polynomials and Their Applications](https://www.iacr.org/archive/asiacrypt2010/6477178/6477178.pdf)
                + ...

schnorr signature (我感觉我甚至想写一篇 scriptless script is doom...) 感觉也挺有意义, 衍生到各种 DSA 相关。ZEC 他们搞了一堆。

Private_information_retrieval 这个亦有意义，涉及 intersection、交易撮合？
相关概念： PIR、PSI。

stealth address 这些则和很多相关，暂时不感兴趣。

## General Assumption
- 共识里面 关于 assumption 的讨论： [Completeness Theorems for Non-Cryptographic Fault-Tolerant Distributed Computation](https://dl.acm.org/doi/pdf/10.1145/3335741.3335756).
    + The rapid development of distributed systems raised the natural question of what tasks can be performed by them (especially when faults occur). 
        * cryptographic approach
            - inaugurated by Difiie and Hellman [DH], assumes the players are computationally bounded, and further assumes the existence of certain (one-way) functions, that can be computed but not inverted by the player.
                + This simple assumption was ppstulated in [DH] in order to achieve the **basic task of secure message exchange** between two of the processors, but turned out to be **universal**! In subsequent years ingenious protocols baaed on the same assumption were given for increasingly harder tasks such as **contract signing, secret exchange, joint coin flipping, voting and playing Poker**. These results culminated, through the definition of zero-knowledge proofs [GMR], their existence for NP-complete problems [GMW1] in completeness theorems for two-party [Y1] and multi-party [GMW2] cryptographic distributed computation. In particular the results of Goldreich, Micali and Wigdesrson in [GMW2] were the main inspiration to our work. They show, that if (non-uniform) one way functions exist then every (probabilistic) function of n input,s can be computed by n computationally bounded processors in such a way that: (1) If no faults occur, no subset of the players can compute any additional information, and (2) Even if Byzantine faults are allowed, no set of size t < n/2 can either disrupt the computation or compute additional information. 
        * The non-Cryptographic (or information-theoretic) approach
            * does not limit the computational power of the processors.
                + To facilitate the basic primitive of secret message exchange between a pair of players, we have secure channels.
                    + (For an excellent source of results and problems in the case no secure channels exist, see [BL].

[BL]: M. Ben-Or and N. Linial, Collective coin flipping, FOCS86. 
[DH]: W. Diffie and M. E. Helman, New directions in cryptography, IEEE Trans. Inform. Theory, Vol.IT-22,pp.644-654, 1976. 
[GMW1] O. Goldriech, S. Micali and A. Wigderson, Proofs that yield nothing but the validity of the assertion, and a methodology of cryptographic protocol design, FOCS86, pp. 174-187. 
[GMW2] O. Goldriech, S. Micali and A. Wigderson, How to play any mental game, STOC87, pp. 218-229. 
[GMR] S. Goldwasser, S. Micali and C. Rackoff, The
knowledge complexity of interactive proof systems, STOC85, pp. 291-304.

## PCD
+ https://www.michaelstraka.com/posts/recursivesnarks/
+ https://eprint.iacr.org/2020/499


## VDF
VDF 比较全的资料网站: https://vdfresearch.org/, also see: https://blog.priewienv.me/post/verifiable-delay-function-1/ and https://medium.com/@chia_network/chia-vdf-competition-guide-5382e1f4bd39.

VDF 向上可以追溯到 [Time-lock Puzzles](https://people.csail.mit.edu/rivest/pubs/RSW96.pdf) 和 [Timed Commitments](https://pdfs.semanticscholar.org/764b/41d1cf0c2c64bec722f0afd4b0a2ce0bee27.pdf)。

目前最常用的 两种 VDF 的构造是:

+ [Pie19](https://eprint.iacr.org/2018/627.pdf)
    * fast to create, but large and slow to verify.
    * 另外 poanetwork 中说 Pie19 "Number of iterations must be even and at least 66"
+ [Wes19](https://eprint.iacr.org/2018/623.pdf)
    * slower to create (but parallelizable), but small, and quick to verify.

[BBF18](https://eprint.iacr.org/2018/712) 专门了介绍了他们。其中提到，Pie19 要求 low order assumption，Wes19 要求 adaptive root assumption。Wes19 的要求更严格。

[BBBF18](https://eprint.iacr.org/2018/601.pdf) 则列了各种 18年及以前的 VDF 相关的协议，并正式提出了 Verifiable Delay Functions (VDF) 的概念。

[sloth](https://eprint.iacr.org/2015/366.pdf) 也是 Wes19 的 Wesolowski 提出的，在我看来就是 VDF 正式提出之前，VDF 的前身 (sloth 和 VDF 的 properties 还是有点区别，只能算是 pseudo-VDF)。sloth 和前面提到的 Pie19 和 Wes19 的区别是：sloth 利用了 computing square root (也算是 modular exponentiation，而 there is no known algorithm for computing modular exponentiation which is sublinear in the bit-length of the exponent.) 比它的逆运算难（慢）；而 Pie19 和 Wes19 则是利用了 repeated squaring in an RSA group (也可以不用 RSA group 而用别的 GUO 比如 class group)。(额我觉得我这里说的也不太对? sloth 好像和 hash 相关？然后 Wes19&Pie19 用的是 RSW time-lock puzzle? 我感觉都用了 squaring 的难度啊，应该是因为 RSW time-lock puzzle 的性质更好。)


### [cVDF](https://eprint.iacr.org/2019/619.pdf)

cVDF 中提到 Pie19 和 Wes19 中的 assumption 都不对。

Pie19 assumes the Fiat-Shamir heuristic for a proof system with a superconstant number of rounds.

Wes19 assumes the Fiat-Shamir heuristic for a
constant-round argument system.

cVDF 提到自己的 assumption 比起它们没毛病: relies on Fiat-Shamir heuristic for a
constant-round proof system.

#### (incremental) PoSW vs cVDF
a PoSW enables generating a publicly verifiable proof of some computation (rather than a specific function with a unique output) that is guaranteed to
have taken a long time. 

(Incremental) PoSWs do not satisfy (computational) uniqueness, which is a major downside for many applications (see [BBBF18] for several examples). 

cVDF enable verifiably outsourcing VDF computation.

incremental PoSW 就是 别人可以接着 PoSW；cVDF 就是别人可以接着 VDF。

### RSA Groups assumption
Everyone seems to love VDFs, but the complexity theory around them is a bit underwhelming -- why do they only work against adversaries with a polynomial compute advantage?

[A Note on Low Order Assumptions in RSA groups](https://eprint.iacr.org/2020/402)

## VRF
JP Aumasson 也提到 the most exciting crypto  in real applications 是 [threshold oblivious PRFs](https://twitter.com/veorq/status/1272922678475788288)。

## 延伸阅读

+ https://ethresear.ch/t/when-do-we-need-cryptography-in-blockchain-space
+ https://www.michaelstraka.com/posts/classgroups/
+ https://hackmd.io/@olivierbbb/r10VpNPZU
+ https://github.com/Chia-Network/vdf-competition/blob/master/classgroups.pdf
+ https://blog.goodaudience.com/deep-dive-on-rsa-accumulators-230bc84144d9?gi=b5fa21147b56