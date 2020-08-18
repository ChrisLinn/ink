---
title: Pairing (Bilinear Map)
---

# Pairing (Bilinear Map) 配对（双线性映射）

## Assumptions

### Pairing Inversion Problem
more detail in [Still Wrong Use of Pairings in Cryptography](https://eprint.iacr.org/2016/223.pdf)

### Bilinear Diffie-Hellman Problem
Let $n$ be a prime number. Let $G_1$ = $\langle P \rangle$ be an additively-written group of order $n$ with identity $\infty$, and let $G_T$ be a multiplicatively-written group of order $n$ with identity 1.

The security of many pairing-based protocols is dependent on the intractability
of the following problem.

Let $\hat{e}$ be a bilinear pairing on $(G_1, G_T)$. The **bilinear Diffie-Hellman problem** (BDHP) is the following: Given $P, aP, bP, cP$, compute $\hat{e}(P, P)^{abc}$.

Hardness of the BDHP implies the hardness of the [DHP](/technical/crypto/crypto-interview/#diffie-hellman-problem) in both $G_1$ and $G_T$.

We note that the [decisional Diffie-Hellman problem (DDHP)](/technical/crypto/crypto-interview/#diffie-hellman-problem) in $G_1$ can be efficiently solved. 

#### 更细致的分类
见 [Still Wrong Use of Pairings in Cryptography](https://eprint.iacr.org/2016/223.pdf)

+ Computational Bilinear Diffie-Hellman Problems, Decisional Bilinear Diffie-Hellman Problem
    * It is clear that the decisional Diffie-Hellman problems including the pairing related ones are solvable in polynomial time when one has oracles solving the computational Diffie-Hellman problems. However, there are groups for which **the classical decisional Diffie-Hellman problem is easy while the classical computational Diffie-Hellman problem is believed to be hard**. In particular, a gap Diffi-Helman group has a distinguishability oracle for which solving the computational problem is hard.
+ Gap Diffie-Hellman Problem
+ Co-Assumptions
+ The external Diffie-Hellman (XDH) assumption
+ ...

另外因为 solving DLP 技巧的进展，有些 assumption 也会慢慢不成立。

[PAIRING-BASED CRYPTOGRAPHY AT HIGH SECURITY LEVELS](https://eprint.iacr.org/2005/076.pdf) 讨论了 DHP、DLP on elliptic curves、DHP in the field、BDHP。


## Weil Pairing
Weil配對可將橢圓曲線之撓群（torsion group）上的兩個點，映射到一個特殊有限域之乘法子群上，藉此可將橢圓曲線離散對數問題（ECDLP）投射到一般的離散對數問題（DLP）。

## Tate Pairing
略

## Applications
+ Three-party one-round key agreement
    * 事实上最早引入使用 pairing 的就是这个
+ signatures
    + pairing/ID based signatures are constructed because of some nice structural properties like homomorphic linear authenticators where the authenticators can be aggregated into only one tag, which significantly reduces the communication and computational complexity
    + and...
        * short signatures (also without random oracles), 注意和 aggregate signatures 不同
            - signatures are comprised of **a single group element** (and where the group element can be represented using roughly the same number of bits as an integer modulo n)
            - Most discrete logarithm signature schemes such as the DSA are variants of the ElGamal signature scheme. In such schemes, signatures are generally comprised of **a pair of integers modulo n**, where n is the order of the underlying group $G_1$ = $\langle P \rangle$. 
        * blind signatures (where a user obtains a signature from a signer while the signer does not learn any information about the message being signed)
        * identity based signatures (also including ID-based blind signatures, hierarchical ID-based signatures, ring signatures)
        * chameleon signatures (non-repudiable and non-transferrable)
        * aggregate signatures (which allows multiple signatures to be aggregated into one compact signature)
        * ring signatures (where any group member can sign a message without learning any information about the signed message)
        * group signatures (which is similar to ring signatures except that a “group manager” can detect which group member indeed signed a message)
        * threshold signatures (a valid signature can be computed only if at least t signers cooperate)
        * multisignature
        * authentication-tree based signatures without random oracles
+ encryption
    + Identity-based encryption
    - Hierarchical identity-based Encryption
    - Functional (or Attribute based) Encryption
    - IBE with threshold decryption
    - Searchable encryption

## 扩展阅读
+ [An Introduction to Pairing-Based Cryptography](https://www.math.uwaterloo.ca/~ajmeneze/publications/pairings.pdf)
+ [Still Wrong Use of Pairings in Cryptography](https://eprint.iacr.org/2016/223.pdf)
+ [PAIRING-BASED CRYPTOGRAPHY AT HIGH SECURITY LEVELS](https://eprint.iacr.org/2005/076.pdf)
+ https://en.wikipedia.org/wiki/Pairing-based_cryptography
+ https://zh.wikipedia.org/wiki/%E9%9F%A6%E4%BC%8A%E9%85%8D%E5%AF%B9