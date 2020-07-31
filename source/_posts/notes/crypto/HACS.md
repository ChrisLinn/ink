---
title: high-assurance crypto software
---

# high-assurance crypto software

## [36C3 - High-assurance crypto software](https://www.youtube.com/watch?v=O07uRT-5BDM)

### timing attacks

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


## 衍生阅读

+ https://www.hacs-workshop.org/links.html
+ https://www.youtube.com/watch?v=O07uRT-5BDM
+ https://cryptojedi.org/peter/data/cecc-20160622.pdf
+ https://arxiv.org/pdf/1808.01348.pdf
+ https://ieeexplore.ieee.org/document/7310828