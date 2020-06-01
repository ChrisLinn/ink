# When do we need cryptography in blockchain space?

also see:

+ https://ethresear.ch/t/when-do-we-need-cryptography-in-blockchain-space
+ https://www.michaelstraka.com/posts/classgroups/
+ https://hackmd.io/@olivierbbb/r10VpNPZU
+ https://github.com/Chia-Network/vdf-competition/blob/master/classgroups.pdf
+ https://blog.goodaudience.com/deep-dive-on-rsa-accumulators-230bc84144d9?gi=b5fa21147b56

我觉得主要就是 VDF, accumulator, polynomial commitments, zkp, PCD 这些。zkp 所属其实又比较复杂，PCD 中可能使用 ZKP。

然后里面又有基本工具:

+ hash function
    * 貌似基本都是抗量子的？
+ lattice
    * 抗量子
+ GUO
    * 分类
        - RSA group, trusted setup 或 MPC
        - class group, trustless setup
            + 亦可用于 zkp???
    * GUO 可用于
        * VDF
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
+ polynomial commitments 好像又是不同于 Accumulators 的另一类东西
    * https://ethresear.ch/t/using-polynomial-commitments-to-replace-state-roots/

schnorr signature (我感觉我甚至想写一篇 scriptless script is doom...) 感觉也挺有意义, 衍生到各种 DSA 相关。ZEC 他们搞了一堆。

Private_information_retrieval 这个亦有意义，涉及 intersection、交易撮合？

stealth address 这些则和很多相关，暂时不感兴趣。



## PCD
+ https://www.michaelstraka.com/posts/recursivesnarks/
+ https://eprint.iacr.org/2020/499


