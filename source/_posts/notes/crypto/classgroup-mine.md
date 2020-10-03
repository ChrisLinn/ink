---
title: Class Group
---

# Class Group

## 两种角度

+ ideal class group (imaginary quadratic field)
    * 为什么选择这个判别式
+ form class group (binary quadratic form)
    * 易于表示和计算

具有相同判别式

背后其实是同一个东西

## 选择 & 构造

$K = \mathbb{Q}(\sqrt{d})$, d 是个 负 prime & square free。

if $d \equiv 1\ mod\ 4$, field discriminant $d_K = d$,
if $d \not\equiv 1\ mod\ 4$, field discriminant $d_K = 4d$. (因为 d 是 square free，所以 d 只可能 $d \equiv 2\ mod\ 4$ 或 $d \equiv 3\ mod\ 4$ (?), 而且这里 $d_K \equiv 0\ mod\ 4$)

$d_K$ 应该只会 $d_K \equiv 0\ mod\ 4$ 或 $d_K \equiv 1\ mod\ 4$, 因为只有 0 和 1 是 mod 4 的二次剩余 (quadratic residue)。

$d_K$ 是对于 imaginary quadratic field $\mathbb{Q}(\sqrt{d})$ 来说的，对于 binary quadratic form 来说，即 $f(a, b, c) = ax^2 + bxy + cy^2$ 的判别式 (discriminant) $\Delta = b^2 - 4ac$。

为了方便我们直接选 $d = -prime = 1\ mod\ 4 = \Delta = -3\ mod\ 4$, 那么也就是 $prime = 3\ mod\ 4 = |d|$

## TODOs
+ Concrete groups  discussions （BBF18    &   Wes19）
+ mod 4 什么的，和 sloth 很像，和 squaring 有关？可以谈谈.
    * [sloth 中的 square roots](http://course1.winona.edu/eerrthum/math347/SquareRoots.pdf)

## talk about RSA
为什么 GUO

## class group 的计算、结构
+ https://github.com/Chia-Network/vdf-competition/blob/master/classgroups.pdf
+ [Class groups for imaginary quadratic fields](http://math.stanford.edu/~conrad/676Page/handouts/picgroup.pdf)
+ [The Structure of the Class Group of Imaginary Quadratic Fields, Nicole Miller](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.590.2666&rep=rep1&type=pdf)
    * 从解释了 primitive 和 fundamental 角度解释了 为什么分 $d_K = d$ 和 $d_K = 4d$
        - primitive: gcd = 1
+ [On the computation of quadratic 2-class groups, Wieb Bosma & Peter Stevenhagen](https://www.math.ru.nl/~bosma/pubs/JTNB1996.pdf)
+ [gauss’s ternary form reduction and the 2-sylow subgroup, Daniel Shank](https://www.ams.org/journals/mcom/1971-25-116/S0025-5718-1971-0297737-4/S0025-5718-1971-0297737-4.pdf)
+ [Eta quotients and class fields of imaginary quadratic fields, Jana Sotáková](https://www.math.u-bordeaux.fr/~ybilu/algant/documents/theses/Sotakova.pdf)