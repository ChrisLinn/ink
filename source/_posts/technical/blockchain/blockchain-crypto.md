# When do we need cryptography in blockchain space?

also see https://ethresear.ch/t/when-do-we-need-cryptography-in-blockchain-space

我觉得主要就是 VDF, accumulator, zkp 这些，然后里面又有基本工具:

+ hash function
+ lattice
+ RSA, class group, GUO
+ polynomial commitments?

schnorr signature (我感觉我甚至想写一篇 scriptless script is doom...) 感觉也挺有意义, 衍生到各种 DSA 相关。ZEC 他们搞了一堆。

Private_information_retrieval 这个亦有意义，涉及 intersection、交易撮合？

stealth address 这些则和很多相关，暂时不感兴趣。


## class group
https://www.michaelstraka.com/posts/classgroups/

https://hackmd.io/@olivierbbb/r10VpNPZU

https://github.com/Chia-Network/vdf-competition/blob/master/classgroups.pdf

https://blog.goodaudience.com/deep-dive-on-rsa-accumulators-230bc84144d9

https://crypto.stanford.edu/pbc/notes/



https://eprint.iacr.org/2018/1188/20181210:211743 uses some basic group theory to build a dynamic accumulator:
+ create a vector commitment data structure analogous to Merkle trees (O(logn) )
+ constant-sized inclusion proofs
+ 用了 GUO, 依赖于 RSA assumption
    * 也可以用
        * RSA group, trusted setup
        * class group, trusted setup
            - 亦可用于 zkp???

## PCD
+ https://www.michaelstraka.com/posts/recursivesnarks/
+ https://eprint.iacr.org/2020/499


