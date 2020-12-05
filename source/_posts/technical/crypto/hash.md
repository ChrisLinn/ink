# Hash

https://ethfans.org/posts/the-state-of-hashing-algorithms-the-why-the-how-and-the-future

https://www.hyperelliptic.org/tanja/teaching/cryptoI14/Hash-Functions-Crypto1_part1.pdf

https://eprint.iacr.org/2004/035.pdf

## some history
SHA1
SHA2
SHA3
    keccak
    blake2b
hashchain
merkle tree

## Resistance
### Collision Resistance
### Preimage Resistance
### Second Preimage Resistance

## Post-quantuam
+ 量子计算 vs 后量子密码学
+ Shor & Groover
+ integer factorization problem & the discrete logarithm problem & the elliptic-curve discrete logarithm problem
+ 一般抗量子计算会用什么密码学原语
    * Lattice-based cryptography
        - Ring-LWE Signature
        - NTRU, BLISS
    * Multivariate cryptography
        - Unbalanced Oil and Vinegar
    * [Hash-based cryptography](/technical/crypto/hash)
        - Merkle signature scheme
    * Code-based cryptography
        - McEliece
        - RLCE
    * Supersingular elliptic curve isogeny cryptography
    * Symmetric key quantum resistance

## snark-friendly hash
SHA?
Poiseden
MiMC
https://github.com/matter-labs/zksync/issues/261

