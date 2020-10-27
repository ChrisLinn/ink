---
title: High-assurance crypto software
---

# High-assurance crypto software

## [djb & Tanja Lange's talk](https://www.youtube.com/watch?v=O07uRT-5BDM)

### Timing attacks

#### Exponentiation with secret exponent (RSA, DH)
Compute $c^d$ given $c$ and $d$.
```py
n = 1000001
d = 12473
c = 41241
l = d.nbits()
D = d.bits()
m = c
for i in range(l-2, -1, -1): # loop length depends on d
    m = m^2 % n
    if D[i] == 1: # branch depends on d
        m = m * c % n
print(m)
```

NIST P-256 上 scalar multiplication 所需要的时间？不可忽视。

其他的一些 exponentiation 方法：略...

#### 泄露一些 bits 会引发什么问题
+ 对于 RSA、DH 有一些影响
+ 对于 DSA、ECDSA 影响很大
    * nonces (one-time scalars) 稍微有点 bias 密钥就可能泄漏
+ even worse: hyperthreading attacks, cache-timing attacks... 或者更多的信息导致导致更多的漏洞

#### Constant-time exponentiation
This costs 1 multiplication per bit, so as slow as worst case.

```py
n = 1000001
d = 12473
c = 41241
l = n.nbits()
D = d.digits(2, padto = 1)
m = 1 # so initial squaring don't matter
for i in range(l-1, -1, -1): # fixed-length loop
    m = m^2 % n
    h = m * c % n
    m = (1 - D[i]) * m + D[i] * h # selection by arithmetic
print(m)
```

#### Interplay with elliptic-curve formulas
+ http://ecchacks.cr.yp.to/

#### Valgrind
use valgrind to help check constant-time & memory leak and so forth

#### clock cycle
...

#### XXX to the rescue
+ Formal logic
    * 但只能说明 代码逻辑没问题，还要担心 complier 等的 bug
+ Testing
    * SUPERCOP crypto test framework
    * testing 可能会 miss
        - Symbolic testing

## 延伸阅读

+ https://www.hacs-workshop.org/links.html
+ https://cryptojedi.org/peter/data/cecc-20160622.pdf
+ https://arxiv.org/pdf/1808.01348.pdf
+ https://ieeexplore.ieee.org/document/7310828