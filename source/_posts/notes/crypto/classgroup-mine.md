---
title: Class Group
---

# 类群 (Class Group)

## 两种角度

+ ideal class group (imaginary quadratic field)
    * 为什么选择这个判别式
+ form class group (binary quadratic form)
    * 易于表示和计算

具有相同判别式

背后其实是同一个东西。(不过这句话其实只有 $\Delta < 0$ 且 $f(a, b, c)$  positive definite 时才成立。)

## 选择 & 构造 & 计算

$K = \mathbb{Q}(\sqrt{d})$, d 是个 负 prime (选用 prime 可以方便 composition) & square free。

+ if $d \equiv 1\ mod\ 4$, field discriminant $d_K = d$,
+ if $d \not\equiv 1\ mod\ 4$, field discriminant $d_K = 4d$. (因为 d 是 square free，所以 d 只可能 $d \equiv 2\ mod\ 4$ 或 $d \equiv 3\ mod\ 4$, 而且这里 $d_K \equiv 0\ mod\ 4$)

分 $d \equiv 1\ mod\ 4$ 和 $d\equiv 2, 3\ mod\ 4$ 两种情况是因为 $\mathbb{Q}(\sqrt{d})$ 的整数环 在$d \equiv 1\ mod\ 4$ 时为 \{$a + b\frac{1+\sqrt{d}}{2}$\}，在 $d\equiv 2, 3\ mod\ 4$ 时 为 \{$a + b\sqrt{d}$\}。

$d_K$ 应该只会 $d_K \equiv 0\ mod\ 4$ 或 $d_K \equiv 1\ mod\ 4$, 因为只有 0 和 1 是 mod 4 的二次剩余 (quadratic residue)。

$d_K$ 是对于 imaginary quadratic field $\mathbb{Q}(\sqrt{d})$ 来说的，对于 binary quadratic form 来说，即 $f(a, b, c) = ax^2 + bxy + cy^2$ 的判别式 (discriminant) $\Delta = b^2 - 4ac$。

为了方便我们直接选 $d = -prime = 1\ mod\ 4 = \Delta = -3\ mod\ 4$, 那么也就是 $prime = 3\ mod\ 4 = |d|$。不然我们还要 确保 $\Delta / 4$ 是 square free 的。

然后就可以进行计算了，[Chia 的文档](https://github.com/Chia-Network/vdf-competition/blob/master/classgroups.pdf)中给出了比较具体的计算方法。

class group 的具体结构和计算也可参考：
+ [Class groups for imaginary quadratic fields](http://math.stanford.edu/~conrad/676Page/handouts/picgroup.pdf)
+ [The Structure of the Class Group of Imaginary Quadratic Fields, Nicole Miller](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.590.2666&rep=rep1&type=pdf)
    * 从解释了 primitive 和 fundamental 角度解释了 为什么分 $d_K = d$ 和 $d_K = 4d$
        - primitive: gcd = 1
+ [On the computation of quadratic 2-class groups, Wieb Bosma & Peter Stevenhagen](https://www.math.ru.nl/~bosma/pubs/JTNB1996.pdf)
+ [gauss’s ternary form reduction and the 2-sylow subgroup, Daniel Shank](https://www.ams.org/journals/mcom/1971-25-116/S0025-5718-1971-0297737-4/S0025-5718-1971-0297737-4.pdf)
+ [Eta quotients and class fields of imaginary quadratic fields, Jana Sotáková](https://www.math.u-bordeaux.fr/~ybilu/algant/documents/theses/Sotakova.pdf)

## TODOs
+ Concrete groups  discussions （BBF18    &   Wes19）
+ mod 4 什么的，和 sloth 很像，和 squaring 有关？可以谈谈.
    * [sloth 中的 square roots](http://course1.winona.edu/eerrthum/math347/SquareRoots.pdf)

## talk about RSA
为什么 GUO
