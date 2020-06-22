---
title: Class Group (1)
---

# Class Group (1)

###### tags: `study notes` `class groups` `number theory`

整理自 [Notes from a First Encounter with Class Groups](https://hackmd.io/@olivierbbb/r10VpNPZU)

## Introduction

These notes grew out of an effort to understand the basics of __class groups 类群__. With another VDF day around the corner, now seemed as good a time as any to get to grips with this material. Furthermore, class groups 类群 and lattices 格 are part of the standard tool set in areas of cryptography relevant to blockchain and zero knowledge applications.

**[HY: 核心是整数环]** The central object of these notes are **rings of integers 整数环 $\mathcal{O}_K$ in number fields 数域 $K$**. These are objects borrowed from the realm 领域 of algebraic number theory (ANT). Topics derived from their study that have found application in cryptography include:
* Class Groups 类群 (of Imaginary Quadratic Number Fields 虚二次数域),
* Lattices 格 (ideal lattices 理想格 or derived from  groups of units of rings of integers),

and to a lesser extent (it seems),
* Orders 阶 (in Imaginary Quadratic Number Fields associated with elliptic curves).

**[HY: 介绍 classgroup 需要先介绍整数环，同时也会介绍 orders 阶 和 lattice 格]** Discussing the abstract theory of rings of integers is a necessary (?) prerequesite to properly introducing __class groups__; __orders__ and __lattices__ will be mentioned along the way.

Definitions will be given in due time. In the meantime, ...

### How is algebraic number theory relevant to cryptography? [HY: 代数数论与密码学的关系]

Let's stick to the three topics introduced above.

In cryptographic applications, __class groups__ are seen as a __source of groups of unknown order__ (GUO **[HY: 未知阶的群?]**). Recall that the __order__ of a finite group 有限群 $G$ is its cardinality **[HY: 势? 基?]** as a set. GUOs have been considered in the construction of candidate __Verifiable Delay Functions 可验证延迟函数__ (VDF) and __Cryptographic Accumulators 密码学累加器__. They can also serve for as __target groups for (polynomial) commitment schemes 多项式承诺方案__.

RSA groups $(\Bbb{Z}/N\Bbb{Z})^\times$[^RSA_modulus] **[HY: 原来 RSA group 这么写]** provide an alternative family of GUOs[^RSA_are_GUO]. **[HY: RSA 模数生成方案的缺点]** However, generating RSA moduli 模数 $N=pq$ requires either a trusted party[^RSA_trust] or a non-trivial multiparty computation. Generating class groups[^cl_grp_gen] $\mathcal{Cl}(d)$ on the other hand "[only][square free test]" requires generating large negative square free public integers $d$. Taking $d=-p$ for a large prime $p$ is a viable option.
[^RSA_are_GUO]: computing their order is equivalent to factoring $N=pq$, and is a difficult problem

For crypto applications the workflow for generating class groups[^of_quad_num_fields] is summed up below:
![](https://i.imgur.com/pHAvcDd.jpg)
Understanding what comes out at the other end is challenging! A lot is known about these groups, but what matters most to GUO-type applications is that **[HY: GUO-type applications 的重点难点]**:
* these are __always finite abelian groups 有限阿贝尔群__ (finiteness 有限性 is a difficult theorem)
* and computing their order (i.e. size) is __hard__.

[^of_quad_num_fields]: of quadratic number fields
[^RSA_trust]: to generate two large primes $p,q$, their product $N=pq$ and be trusted with discarding the factors $p$ and $q$.
[^cl_grp_gen]: of Imaginary Quadratic Number Fields $K=\Bbb{Q}(\sqrt{d})$, $d<0$
[^RSA_modulus]: where $N=pq$ is the product of two large primes.

__Note.__ **[HY: 一些具体应用的例子]** For potential applications to VDFs, see [Wesolovski's paper][Wesolovski] and [Boneh, Bünz and Fish's survey][BBF VDF survey]. Applications of GUOs and class groups in particular to cryptographic accumulators are discussed in [Bonej, Bünz and Fish][BBF Accumulators]'s paper on the subject. [DARK][DARK], a transparent polynomial comitment scheme, uses GUOs.


__[Lattice based cryptography][lattice based cryptography wiki]__ aims to take advantage of [computationally difficult problems][lattice problems wiki] related to lattices[^lattices_defn]. A potentially important feature of this kind of cryptography is its conjectural resistance to quantum computers. It turns out that number fields are a breeding ground for nontrivial lattices[^lattice_methods]. They crop up naturally in two distinct ways:
* as ideals 理想 of rings of integers $\mathcal{O}_K$,
* as the Log-unit lattice $\mathrm{Log}_K(\mathcal{O}_K^\times)$.

[^lattice_methods]: and lattice methods play a significant role in ANT.

__Orders__[^unrelated_order] and __rings of integers__ also make a double-take-worthy appearance in [isogeny-based cryptography][isogeny based crypto Luca de Feo] **[HY: 基于同源的密码学]**, a subdomain of elliptic curve cryptography. When $E/\Bbb{F}_q$ is an ordinary elliptic curve over a finite field $\Bbb{F}_q$, its ring of endomorphisms 自同态 $\mathcal{O}=\mathrm{End}(E)$ is an __order__ in an imaginary quadratic number field $K=\Bbb{Q}(\sqrt{D})$ associated to the (isogney class of the) curve $E$. The class group $\mathcal{Cl}(\mathcal{O})$ of invertible ideals of $\mathrm{End}(E)$ acts on the isogeny graph of curves defined over $\Bbb{F}_q$ isogenous to $E$ (isogeny graph). One can thus traverse this graph using ideals for transportation. These are considered to be [hard homogeneous spaces][Hard Homogeneous Spaces], and can house Diffie-Hellman-type key exchanges.

[^lattices_defn]: discrete, spanning subgroups $\Lambda\subset\Bbb{R}^n$.
[^unrelated_order]: no relation with the order a group introduced earlier.

### Purpose of these notes

These notes contain a somewhat informal exposition of some basic topics in algebraic number theory as well as pointers as to how these are relevant to cryptography. The reader will find _no proofs_ here, only assertions and my attempts at motivating the theory. __My goal is to swiftly take the reader from the definition of algebraic integers to that of class groups__. In keeping with that philosophy, I have tried to keep all theorems, lemmas, propositions and definitions _short_ and written in plain english whenever possible. 

However, __motivation is key__, and I have tried to follow some guiding threads. The angle that made the most sense to me[^no_originality] is that of __prime-ness 素性: what does it mean to be  prime?__ and __factorization: when/how can one extend the standard theory of prime factorization of integers to other number systems?__ **[HY: factorization 不仅可以用于整数]**

**[HY: 原来素性测试不仅有随机算法，还有确定性算法，还能达到多项式时间，see https://zh.wikipedia.org/wiki/%E7%B4%A0%E6%80%A7%E6%B5%8B%E8%AF%95]**

[^no_originality]: and which is invariably discussed in pretty much every other text on the subject

__Note.__ I discovered rather late in the writing process (thanks to Thomas Piellard) that there already exists an excellent blog post by Michael Straka on [Class Groups for Cryptographic Accumulators][Michael Straka]. While we inevitably tread some common ground, I hope there is room for another blogpost on the subject.

> [TOC]

## Algebraic Numbers 代数数 and Algebraic Integers 代数整数

> In this section we define (complex) algebraic integers **[HY: 复代数整数]**. In the sequel we will restrict to those algebraic integers that reside in small subfields of $\Bbb{C}$ **[HY: 这个符号指的是 complex algebraic numbers?]** or, more generally, in abstract number fields **[HY: 抽象数域]**.

### Complex Algebraic Numbers ...

**[HY: 不是所有的数都是代数数。简单来说，指任何整系数多项式的复根。]** Complex algebraic numbers 复代数数 are those complex numbers that satisfy a polynomial equation 多项式方程 with rational coefficients 有理数系数, i.e. a complex number 复数 $z$ is algebraic 代数的 if it satisfies $P(z)=0$ for a (nonzero) polynomial $P$ with rational coefficients. Examples include:
* rational numbers $q\in\Bbb{Q}$ **[HY: $\Bbb{Q}$ 就是有理数的标识？]**, take $P=X-q\in\Bbb{Q}[X]$;
* square roots of rationals "$\sqrt{q}$" with $q\in\Bbb{Q}$, take $P=X^2-q\in\Bbb{Q}[X]$;
* higher roots such as "$\sqrt[r]{a}$", take $P=X^r-a$; **[HY: 这里怎么不 $\in\Bbb{Q}[X]$ 了]**

and many, many more ... In particular __roots of unity 单位根__ $\zeta=\exp(\frac{2ik\pi}n)$, with $P=X^n-1$, are algebraic numbers.

__Note.__ Not all complex numbers are algebraic. Those that aren't are called __[transcendental][transcendental number wiki] 超越的__.

### ... Form a Field

**[HY: 代数的 和、乘积、商 都还是代数的]** It is a [fact][algebraic numbers form a field wiki] that the sum, product and quotient of algebraic numbers is still algebraic.
> __Theorem.__ The set $\overline{\Bbb{Q}}$ of all complex algebraic numbers forms a subfield of $\Bbb{C}$.

__Note.__ This is not _a priori_ obvious. Take $\alpha=\sqrt{5}+\frac12\frac1{\sqrt{3}}$: individually $\sqrt{5}$ and $\frac1{\sqrt{3}}$ are algebraic (they are roots of $X^2-5$ and $X^2-\frac1{3}$ respectively). To see that their $\Bbb{Q}$-linear combination $\alpha$ is algebraic we need to come up with a (nonzero) rational polynomial $P$ annihilating **[HY: 消去]** $\alpha$. We see that $\alpha^2=\frac{61}{12} - \frac{\sqrt{15}}3$ so that $\alpha$ is a root of

$$P=\Big(X^2 - \frac{61}{12}\Big)^2 - \frac{5}{3} = X^4 - \frac{61}{6} X^2 + \frac{3481}{144}$$

Since $\alpha$ is a root of this rational polynomial, we see that $\alpha$ is algebraic. Doing similar manipulations by hand for more complicated expressions quickly becomes complicated.

__Note.__ Chasing denominators in a rational polynomial $P$ killing a particular algebraic number, we may assume the polynomials $P$ to have integer coefficients. For instance, returning to $\alpha=\sqrt{5}+\frac12\frac1{\sqrt{3}}$, we see that it is also a root of $144X^4-1464 X^2 + 3481\in\Bbb{Z}[X]$

### Complex Algebraic Integers ...

We noted that, chasing denominators **[HY: 通分?]** if necessary, complex algebraic numbers are the complex roots 复数根 of integer coefficient polynomials 整数系数多项式. __Algebraic integers__ are those algebraic numbers that are the roots of __[monic][monic polynomial wiki]__ polynomials 单项多项式 (首一多项式) with integer coefficients.

**[HY: 不是所有的代数都是代数整数。涉及到 本原多项式 Primitive Polynomial、首一多项式 monic polynomial 什么的]** 

All algebraic integers are algebraic numbers, but not all algebraic numbers are algebraic integers. The difference is already stark for rational numbers:

> __Lemma.__ A rational number is an algebraic integer _iff_ it is an integer.

Thus "$\sqrt{d}$" for $d\in\Bbb{Z}$ is an algebraic integer, as a root of the monic integer polynomial $X^2-d$, but $\frac23$ is not. **[HY: 所以 $\sqrt{2}$ 是代数整数? 是的...]**

### ... Form a Ring

**[HY: 代数整数的商不是代数整数。]** The example of rational algebraic integers shows that quotients of algebraic integers usually aren't algebraic integers (algebraic numbers, yes, but not algebraic integers in general). However, sums and products are:

> __Theorem.__ The set $\mathcal{O}_\Bbb{C}$ of all complex algebraic integers is a subring of $\overline{\Bbb{Q}}$.

Again, this is not _a priori_ obvious, see for instance Atiyah and MacDonald's [Introduction to Commutative 交换 Algebra][Atiyah MacDonald], chapter 5, for a general result. As a challenge, the reader may try to compute a monic, integer coefficient polynomial annihilating $\sqrt[3]{2}+i$ from scratch. It's doable, but it's painful[^I_asked_WA] : )

[^I_asked_WA]: according to Wolfram Alpha, $P=X^6 + 3 X^4 - 4 X^3 + 3 X^2 + 12 X + 5$ does the job.

### Beautiful Integers

As an aside, a few years ago, pictures of certain collections of algebraic numbers / algebraic integers were published on the internet. John Baez in particular shared [stunning pictures][root representation Baez] of such sets created by Dan Christensen and Sam Derbyshire. They have a [presentation][root representation Baez slides] where one can read more about the intricate structure of the set of algebraic integers that are roots of polynomials with coefficients in $\{-1,+1\}$ (and marvel at the beautiful pictures).

The pictures below, taken from wikipedia, represent certain subsets of algebraic numbers.


<p><a href="https://en.wikipedia.org/wiki/File:Leadingcoeff.png#/media/File:Leadingcoeff.png"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Leadingcoeff.png/1200px-Leadingcoeff.png" alt="Leadingcoeff.png"></a><br>By <a href="//en.wikipedia.org/wiki/User:Stephen_J._Brooks" title="User:Stephen J. Brooks">Stephen J. Brooks</a> (<a href="//en.wikipedia.org/wiki/User_talk:Stephen_J._Brooks" title="User talk:Stephen J. Brooks">talk</a>) (<a href="//en.wikipedia.org/wiki/User:Stephen_J._Brooks" title="User:Stephen J. Brooks">Stephen J. Brooks</a> (<a href="//en.wikipedia.org/wiki/User_talk:Stephen_J._Brooks" title="User talk:Stephen J. Brooks">talk</a>)) <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons Attribution 3.0">CC BY 3.0</a>, <a href="https://en.wikipedia.org/w/index.php?curid=26727107">Link</a></p>

<a title="Arathron [CC BY-SA (https://creativecommons.org/licenses/by-sa/3.0)]" href="https://commons.wikimedia.org/wiki/File:Algebraic_integers.gif"><img width="512" alt="Algebraic integers" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Algebraic_integers.gif/512px-Algebraic_integers.gif"></a>


## Number Fields

### Definition

> __Definition.__ A __number field__ is a field[^of_char_zero] $K$ that is also a finite dimensional rational vector space: $\dim_\Bbb{Q}K<\infty$.

In other words, $K$ is a field[^of_char_zero] and there exist elements $\alpha_1,\dots,\alpha_d\in K$ such that any element $x\in K$ can be expressed as $$x=\sum_{k=1}^dr_k\cdot\alpha_k$$ for some rational numbers $r_1,\dots,r_d\in\Bbb{Q}$. Here $d\geq\dim_{\Bbb{Q}}K$. **[HY: 不太清楚这里为什么是 $\geq$]**

Elementary linear algebra shows that
> __Lemma.__ All elements of a number field $K$ are algebraic.

**[HY: 向量空间和加法乘法各个律的关系，和“代数的”的关系。]**

[^of_char_zero]: Of characteristic zero

### "Concrete" examples

Examples are plentiful. For instance subfields of the complex numbers such as $$\Bbb{Q}(\sqrt{2})=\{a+b\sqrt{2}\mid a,b\in\Bbb{Q}\}\quad\text{or}\quad\Bbb{Q}(i)=\{a+bi\mid a,b\in\Bbb{Q}\}$$ One easily verifies that these subsets of $\Bbb{C}$ are subfields: they are stable under addition and product, contain the unit $1$, and are stable under taking inverses.

__Note.__ We called these examples "concrete" as they are realized as subfields of the complex numbers. It can be useful to consider "abstract" number fields, number fields obtained by formally adjoining roots of polynomial equations. **[HY: "concrete" vs "abstract"]**

### The right equations 

When adjoining roots of polynomial equations $P(X)=0$ one should restrict to _irreducible_ **[HY: 不可分解？]** polynomials, i.e. polynomials that can't substantially be factored over $\Bbb{Q}[X]$. Consider for instance $P=X^4 - X^2 -2$: this polynomial is reducible, as $P = (X^2 + 1)(X^2 - 2)$. As a consequence it has two qualitatively very different pairs of solutions : $\pm\sqrt{2}$ and $\pm \sqrt{-1}$. Obviously, "adjoining $\sqrt{2}$ to $\Bbb{Q}$" produces $K=\Bbb{Q}[\sqrt{2}]$ a field that is substantially different from $L=\Bbb{Q}[i]$ obtained by "adjoining $\sqrt{-1}$ to $\Bbb{Q}$". To wit: $2$ is a square in $K$ but not in $L$.

### Algebraic indistinguishability of roots

**[HY: 根的代数不可区分性]**

The complex roots of a given __irreducible__ rational polynomial $P$ are __absolutely indistinguishable from an algebraic point of view__.
* You can't tell $\sqrt{2}$ and $-\sqrt{2}$ apart from one another (the roots of the irreducible rational polynomial $X^2-2$) by algebraic manipulations[^w_rat_coeffs] alone.
* Neither can you tell any of $-\sqrt[3]{5}$, $e^{\frac{i\pi}3}\sqrt[3]{5}$ and $e^{-\frac{i\pi}3}\sqrt[3]{5}$ apart from one another (the three roots of the irreducible rational polynomial $X^3+5$) by algebraic manipulations[^w_rat_coeffs].

In the first example one might object: "one is positive, while the other is negative; surely that can't be overlooked!" But in terms of doing algebra[^w_rat_coeffs] with these quantities, both $\sqrt{2}$ and $-\sqrt{2}$ behave exactly the same, like some "abstract quantity" $\delta$ subject to the sole constraint that its square be two (i.e. $\delta$ is _a_ root of $X^2-2$).

Similarly one might object "$-\sqrt[3]{5}$ is a real number while $e^{\frac{i\pi}3}\sqrt[3]{5}$ and $e^{-\frac{i\pi}3}\sqrt[3]{5}$ are not; surely that can't be overlooked!" But from an algebraic point of view[^w_rat_coeffs], these three roots behave precisely the same, like a "formal variable" $\alpha$ subject only to the constraint that its cube be $-5$ (i.e. $\alpha$ is _a_ root of $X^3+5$).

[^w_rat_coeffs]: with rational coefficients

To illustrate this, consider the problem of expressing $\frac1{\delta + 3}$ as a rational-linear combination of $1$ and $\delta$ alternatively with $\delta = \sqrt{2}$ and $\delta = - \sqrt{2}$. The method is the same in both cases: one multiplies this fraction by the "conjugate quantity" both in the numerator and denominator:


| $\delta = \sqrt{2}$ | $\delta = - \sqrt{2}$ |
| -------- | -------- |
| $\displaystyle \frac1{\delta + 3} = \frac1{\sqrt{2} + 3}$ <br> $\ \ \ \ \ \ \ \ \ = \displaystyle \frac{-\sqrt{2} + 3}{(-\sqrt{2} + 3)(\sqrt{2} + 3)}$ <br> $\ \ \ \ \ \ \ \ \ = \displaystyle 3 - \sqrt{2}$ <br> $\ \ \ \ \ \ \ \ \ = \displaystyle 3 - \delta$ | $\displaystyle \frac1{\delta + 3} = \frac1{-\sqrt{2} + 3}$ <br> $\ \ \ \ \ \ \ \ \ = \displaystyle \frac{\sqrt{2} + 3}{(\sqrt{2} + 3)(-\sqrt{2} + 3)}$ <br> $\ \ \ \ \ \ \ \ \ = \displaystyle 3 + \sqrt{2}$ <br> $\ \ \ \ \ \ \ \ \ = \displaystyle 3 - \delta$ |

### Disincarnate number fields

The examples of number fields we gave up until now were "concrete" in the sense that they were subfields of the field of complex numbers. We noted that their algebra could be done _purely formally_. If we take this observation seriously we are led to construct "disincarnate" number fields by "adjoining formal roots" of irreducible polynomials to the rational numbers.

> __Definition.__ Let $P$ be an irreducible polynomial over $\Bbb{Q}$. There is a number field $K_P$ obtained by formally adjoining a root of $P$ to $\Bbb{Q}$.

One can construct $K_P$ as the [quotient ring][quotient ring wiki] $\Bbb{Q}[X]/\langle P\rangle$ of rational polynomials modulo $P$. This produces a number field called the [rupture field of $P$][rupture field wiki]. Indeed, if one defines $x$ to be the class of $X$ mod $P$, then $x$ is a root of $P$ in $K_P$ and $(1,x,\dots,x^{d-1})$ forms a $\Bbb{Q}$-basis of $K_P$ where $d=\deg(P)$.

__Note.__ In concrete terms this means that one defines $K_P$ as the set of polynomials "mod $P$", and does operations "mod $P$". Thus $A\times B$ is computed by computing the ordinary product $A\times B$, doing long division by $P$ and returning the residue.

__Note.__ "Abstract" or "disincarnate" number fields are conceptually useful: they dissociate the algebra of roots (of irreducible polynomials) from their happenstance realization as particular roots/subfields of $\Bbb{C}$. In particular this point of view makes the following trivial:

> __Theorem.__ There are precisely $n$ field homomorphisms $\sigma:K_P\hookrightarrow \Bbb{C}$.

Indeed, to define such a $\sigma$, it is enough to choose one of $P$'s $d$ distinct roots $z_1,\dots,z_d\in\Bbb{C}$ and to set $\sigma(x):=z_k$, where $x=X~\mathrm{mod}~P$. This uniquely pins down $\sigma$.

One can iterate this construction by adjoining a formal root of any $K_P$-irreducible polynomial $Q\in K_P[X]$, and so forth. Remarkably, a single extension is enough to produce all number fields:

> __Primitive Element Theorem.__ Every number field is isomorphic to a number field of the form $K_P$ for  some irreducible rational polynomial $P$.

__Note.__ Distinct irreduible polynomials can produce identical[^iso_or_identical] number fields. For instance the fields $K_P$, $K_Q$ and $K_R$, where $P=X^2-3$, $Q=X^2-12$ and $R=X^2-4X+1$, are isomorphic. This is the reason why one usually insists on square free $d$ when defining $\Bbb{Q}(\sqrt{d})$: the square part of $d$ is irrelevant.

[^iso_or_identical]: isomorphic

## Rings of Integers

> In this section we introduce the main object of study of this note: the ring of integers $\mathcal{O}_K$ of a number field.

### Definitions and basic properties

We stated earlier that all elements in a number field $K$ are _algebraic_. Algebraic _integers_ in $K$ are far rarer. The ring of algebraic integers of a number field is the central object in these notes.

> __Definition.__ Let $K$ be a number field. Its __ring of integers__ $\mathcal{O}_K$ is the subring of all algebraic integers in $K$.

If $K$ is a concrete subfield of $\Bbb{C}$, we have $\mathcal{O}_K=\mathcal{O}_\Bbb{C}\cap K$. We can restate a previous lemma as
> __Lemma.__ The ring of __rational integers__ $\mathcal{O}_\Bbb{Q}$ is the ring $\Bbb{Z}$ of ordinary integers.


__Note.__ The fact that the (so-called) ring of integers of $\Bbb{Q}$ is the usual ring of integers $\Bbb{Z}$ alone would be insufficient grounds to justify calling the other rings $\mathcal{O}_K$ "rings of integers". But the connection runs much deeper. As we will see, these "rings of integers" $\mathcal{O}_K$ satisfy a version of the fundamental theorem of arithmetic. This in turn allows one to define class groups.

While algebraic integers are rarer than algebraic numbers, it is simple to show that any $\alpha\in K$ there will exist some positive (rational) integer $c$ with $c\cdot\alpha\in\mathcal{O}_K$. If follows that:
> __Lemma.__ $\mathcal{O}_K$ spans $K$ as a rational vector space.

The _additive_ structure of $\mathcal{O}_K$ can be made 100% precise:
> __Lemma.__ As an additive group, $\mathcal{O}_K\simeq\Bbb{Z}^n$ where $n=\dim_\Bbb{Q}(K)$.

One says that $\mathcal{O}_K$ is an order of $K$ where
> __Definition.__ An __order__ of $K$ is any subgring $R\subset K$ which spans $K$ and whose additive group is isomorphic to $\Bbb{Z}^n$.

As with any new definition, one's first instinct should be to try to understand some simple examples. But...

### Computing Rings of Integers is _pretty complicated_

Describing the integers of a number field turns out to be __difficult business__. The following are some classical families of number fields for which explicit descriptions of their rings of integers are available.

### Quadratic number fields

__Quadratic number fields__ are fields $K$ with $\dim_\Bbb{Q}(K)=2$. If $K$ is a quadratic number field, there exists a unique [square free][square free wiki] integer $d\in\Bbb{Z}\setminus\{0,1\}$ such that  $K=\Bbb{Q}(\sqrt{d}) = \{a + b\sqrt{d}\mid a,b\in\Bbb{Q}\}$[^iso_actually]. We say that $K=\Bbb{Q}(\sqrt{d})$ is an __imaginary quadratic number field__ when $d<0$. The ring of integers of $\Bbb{Q}(\sqrt{d})$ has a simple description depending on the residue of $d$ mod $4$:

- if $d\equiv 2,3~\mathrm{mod}~4$ then ${\cal O}_{\Bbb{Q}(\sqrt{d})}=\{\text{the set of all }a + b\sqrt{d}\text{ where } a,b\in\Bbb{Z}\}$
- if $d\equiv 1~\mathrm{mod}~4$ then ${\cal O}_{\Bbb{Q}(\sqrt{d})}=\big\{\text{the set of all }a + b\frac{1+\sqrt{d}}2\text{ where } a,b\in\Bbb{Z}\big\}$

Algebraic integers of a quadratic number field are called [quadratic integers][Quadratic integers (wikipedia)].

[^iso_actually]: That should be an isomorphism $K\simeq\Bbb{Q}(\sqrt{d})$ rather than an equality.

__Note.__ This is worked out in section 7.2 of Baker's book.

__Note.__ $d\equiv 0~\mathrm{mod}~4$ is not on the list: if $4=2^2$ divides $d$, then $d$ isn't square free.

__Note.__ Keeping in line with the more formal point of view, one can cleanly define $K$ as $\Bbb{Q}[X]/\langle X^2-d\rangle$ so that $X$ mod $X^2-d$ is a formal square root of $d$ in $K$.

__Note.__ One often sets $$\tau=\begin{cases}\displaystyle\sqrt{d} & \text{if }d\equiv 2,3~\mathrm{mod}~4\\ \displaystyle \frac{1+\sqrt{d}}2 & \text{if }d\equiv 1~\mathrm{mod}~4\end{cases}$$ Then $\mathcal{O}_K=\Bbb{Z}[\tau]=\{a+b\tau\mid a,b\in\Bbb{Z}\}$.

__Note.__ Some values of $d$ yield familiar numbers:
* $d=+5$: then $d\equiv 1~\mathrm{mod}~4$ and $\mathcal{O}_K=\Bbb{Z}[\phi]$ where $\phi=\frac{1+\sqrt{5}}2$ is the [golden ratio][golden ratio wiki]
* $d=-1$: then $d\equiv 3~\mathrm{mod}~4$ and $\mathcal{O}_K=\Bbb{Z}[i]$ are the [Gaussian integers][Gaussian integers wiki]
* $d=-3$: then $d\equiv 1~\mathrm{mod}~4$ and $\mathcal{O}_K=\Bbb{Z}[j]$, where $j=\frac{1+i\sqrt{3}}2=\exp\big(2i\pi/3\big)$ is a primitive third root of unity, are the [Eisenstein integers][Eisenstein integers wiki]

### (Pure) cubic extensions

The next simplest case after quadratic extensions are cubic extensions. This is where things start to get complicated, _truly complicated_. The __general cubic extension__ $K/\Bbb{Q}$ has the form $\Bbb{Q}(\theta)$ where $\theta$ is subject to a relation $\theta^3+p\theta+q$ with $p,q\in\Bbb{Q}$ and $-(27q^2+4p^3)\neq 0$. The latter condition ensures irreducibility of $X^3+pX+q$. Explicit integral bases for $K$'s ring of integers $\mathcal{O}_K$ exist but they are _pretty complicated_, see [Voronoi's Method] or the paper [An Explicit Integral Basis for a Pure Cubic Field][An Explicit Integral Basis for a Pure Cubic Field].

A simpler subcase is that of the __pure cubic extensions__ $K=\Bbb{Q}(\sqrt[3]{d})$ where $d\geq 2$ is a cube free integer. A description of the ring of integers can be found in [this math stackexchange answer][Pure cubic extension MSE]. The "square free" case is treated as an exercise in a few books, see for instance Alan Baker's __A Comprehensive Course in Number Theory__ example 10.1 page 107, exercise (ix) page 110 and exercise (vii) page 120.


### Cyclotomic fields

The [$n$-th cyclotomic field][cyclotomic field wiki] $\Bbb{Q}(\zeta_n)$ is the subfield of $\Bbb{C}$ generated by $\Bbb{Q}$ and a primitive $n$-th root of unity. Alternatively it is the splitting field of the $n$-th [cyclotomic polynomial][cyclotomic polynomial wiki]. Its ring of integers is $$\Bbb{Z}[\zeta_n] = \Big\{\sum_{0\leq k < \varphi(n)}a_{k}\zeta_n^{k}~\Big|~ a_k\in\Bbb{Z}\Big\}.$$ Here $\varphi(n)$ is [Euler's totient function][Euler totient wiki] and the degree of the $n$-th cyclotomic polynomial $\Phi_n$, the minimal polynomial of $\zeta_n$. This isn't an easy result. Baker's account of the case where $n=p$ is prime is good. In the comments to [this MO answer], Keith Conrad sketches an argument for the case $n=p^d$ is a prime power and how to derive the general case from there.


## Primes and factorization

> Number fields $K$ and their rings of integers $\mathcal{O}_K$ provide a vast generalization of the rational numbers $\Bbb{Q}$ and rational integers $\Bbb{Z}$ (note that $\mathcal{O}_\Bbb{Q} = \Bbb{Z}$). Both have a __satisfying theory of primes and unique factorization__ (uniquely representing things as products of prime powers). __But__, the extension is not completely straightforward.

### Primes and factorization: extrapolating from the integer case

There are two equivalent but conceptually different ways to think of prime numbers in $\Bbb{Z}$.

#### Primes as indivisible elements

Prime numbers are the positive integer $p\in\Bbb{Z}$ that possess _precisely_ two distint positive integer factors: $1$ and themselves. Another way of saying the same thing is that $p$ possesses no interesting factorization in $\Bbb{Z}$: indeed, all its factorizations $$p\times 1,~1\times p,~(-p)\times(-1)~\text{and}~(-1)\times(-p)$$ have one factor that is a unit[^unit] of $\Bbb{Z}$, i.e. $\pm1$.

[^unit]: The _units_ of a ring $A$ are its _invertible_ elements, i.e. those elements $a\in R$ such that there exists $b\in R$ with $a\times b= 1_R$. The units of $\Bbb{Z}$ are $-1$ and $+1$.

We can use this as the __template for a definition__ in an arbitrary ring $R$ (in particular $\mathcal{O}_K$):

> __Definition.__ An nonzero and nonunit element $\pi\in R$ is said to be __irreducible__ if for any factorization $\pi=a\times b$, either $a$ or $b$ is a unit in $R$.

Thus the primes of $\Bbb{Z}$ are the (positive) irreducible elements of the ring $\Bbb{Z}$.

#### Primes as atoms of multiplication

Primes also play a basic role in factoring numbers. A (rational) prime is a positive integer $p\in\Bbb{Z}$ such that whenever $p$ divides a product $a\times b$ of integers $a,b$, it has to divide either $a$ or $b$ (and possibly both). Thus $6$ isn't prime since $6$ divides $6=2\times 3$ yet $6$ does not divide either $2$ or $3$.

We can similarly use this as the __template for a definition__ in an arbitrary ring $R$:

> __Definition.__ A nonzero and nonunit element $p\in R$ is said to be __prime__ if for any $a,b\in R$ such that $p$ divides $a\times b$, $p$ divides $a$ or $p$ divides $b$ (or both).

Thus the primes of $\Bbb{Z}$ are the (positive) prime elements of the ring $\Bbb{Z}$.

#### The Fundamental Theorem of Arithmetic (FTA)

When working over the integers, irreducibles and primes coincide. They give rise to the same set of (positive) prime numbers $\{2, 3, 5, 7, 11,\dots\}$ (if we restrict attention to the positive ones). Furthermore, we have the

> __FTA.__ Any positive integer $n$ has a unique factorization as a product of primes.

This is the sort of theorem that we want to generalize to rings of integers $\mathcal{O}_K$. The main result is that the theorem generalizes but its generalization isn't straightforward. Note that this result contains two assertions: __existence__ and __uniqueness__ of a factorization.

### Primes vs. Irreducibles

In a [domain][domain wiki], all primes are irreducible. But in general there may be irreducibles that are not prime. In $\mathbb{Z}$ (and more generally in any [unique factorization domain][UFD wiki]) primes and irreducibles are of course the same: good old prime numbers (and their negatives).

Importantly, primes and irreducibles play very different conceptual roles. Irreducibles are useful for establishing __existence results__[^existence_of_factorizations] while primes are useful for __uniqueness results__[^uniqueness_of_factorizations]. We quote two propositions from algebra to give an idea of what this means.

[^existence_of_factorizations]: existence of factorizations, that is
[^uniqueness_of_factorizations]: existence of factorizations, that is

> __Theorem (Existence of Factorizations).__ Let $R$ be a noetherian domain. Every nonzero nonunit of $R$ can be expressed as a finite product of irreducibles.

Using slightly more symbols, for $x\in R$ neither zero nor a unit, there is a positive integer $n$ and irreducibles $\pi_1,\dots,\pi_n$ such that $x = \prod_{i=1}^n\pi_i$. The reader doesn't have to know what 'noetherian domains' are, it is enough to know that the rings of integers $\mathcal{O}_K$ fall in that category, so that this existence result applies to them. Thus, under some very mild conditions, existence of factorizations into products of irreducibles is a given.

> __Theorem (Uniqueness of Factorizations).__ Let $R$ be a domain. Factorizations into product of primes, when they exist, are essentially unique.

To make that statement slightly more precise, if $x\in R$ (nonzero and not a unit) has a factorization $x=\prod_{i=1}^r p_i$ into a product of primes and if $x=\prod_{i=1}^s q_i$ is yet another factorization of $x$ into a product of primes, then $r=s$ and (up to a permutation of the indices) there are units $u_1,\dots,u_r$ of $R$ such that $q_i = u_i p_i$ for all $i=1,2,\dots,r$.

### Existence and Uniqueness of Factorizations

A [domain][domain wiki] $R$ that satisfies the fundamental theorem of algebra is called a [Unique Factorization Domain][UFD wiki], UFD for short:

> __Definition.__ A __Unique Factorization Domain__ is a domain $R$ in which every nonzero nonunit element has an essentially unique[^essentialUniqueness] factorization into a product of irreducibles.

[^essentialUniqueness]: In the same sense as before: up to reordering and up to units.

We quote a result from algebra:

> __Proposition.__ Let $R$ be a domain s.t. every nonzero nonunit element has a factorization as a product of irreducibles. Then $R$ is a UFD _iff_ all its irreducibles are prime.

This shows that a necessary condition for the FTA to hold in a ring $R$ is that irreducibles and primes be the same. Proofs of these propositions can be found in [this note][irreds are prime implies ufd if noeth dom].



### The Bad News: Unique Factorization can fail in Rings of Integers

We claimed earlier[^noproof] that all $\mathcal{O}_K$ satisfy the 'Existence of Factorizations Theorem'. If our goal is to generalize the fundamental theorem of arithmetic to rings of integers, this is good news. All that is still needed in order to replicate the theory of primes and factorizations of $\Bbb{Z}$ is uniqueness;  half the battle is won!

But that hope is soon squashed: some rings of integers $\mathcal{O}_K$ contain irreducibles that fail to be prime. Examples are a dime a dozon. Consider $K=\Bbb{Q}(\sqrt{-5})$, since $-5\equiv 3~\mathrm{mod}~4$, we have $\mathcal{O}_K=\Bbb{Z}[\sqrt{-5}]=\{a+b\sqrt{-5}\mid a,b\in\Bbb{Z}\}$. The number $6\in\mathcal{O}_K$ has two essentially distinct factorizations into irreducibles: $$2\times 3 = 6 = (1+\sqrt{-5})\times(1-\sqrt{-5})$$ One shows that $2,3,(1+\sqrt{-5})$ and $(1-\sqrt{-5})$ are irreducible[^skip1] but not prime as neither $2$ nor $3$ divide either $(1+\sqrt{-5})$ or $(1-\sqrt{-5})$ and vice versa.

[^noproof]: (without proof)
[^skip1]: This requires a computation which we skip.

## The Fix ...

> Concrete examples show that the FTA does not extend verbatim to rings of integers in number fields. The non trivial step to restoring balance to the galaxy is to use ideals.

### ... is to switch from Elements to Ideals

We can restate _prime-ness_, _divisibility_, _unique factorization_ etc... in a ring $R$ in terms not of the _elements_ of $R$ but in terms of the _ideals_ of $R$.

> __Definition.__ An __ideal__ $I$ in a ring $R$ is an additive subgroup $I\subset R$ such that for all $x\in I$ and $r\in R$ the product $rx$ is again in $I$.

In other words, an ideal $I$ is a (nonempty) subset of $R$ such that if $x,y\in I$ and $r\in R$, then $x\pm y \in I$ and $rx\in I$. Ideals, particularly _prime ideals_, are at the heart of commutative algebra, the field that studies commutative rings and their modules. Ideals are plentiful:

> __Notation.__ Given $x_1,\dots,x_m\in R$, we define $$\langle x_1,\dots,x_m\rangle = \left\{\sum_{k=1}^m r_k x_k~\Bigg|~ r_1,\dots,r_m\in R\right\}$$

Sets of the form $\langle x_1,\dots,x_m\rangle\subset R$ are called __finitely generated ideals__[^rmk_fg_ideals]. In general rings there will be ideals that are not finitely generated, but in rings of integers $\mathcal{O}_K$, _all ideals are finitely generated_[^noeth]. Ideals of the form $\langle x\rangle$ (i.e. generated by a single element) are called __principal ideals__.

If $I\subset\mathcal{O}_K$ is a nonzero ideal and $\alpha\in I\setminus0$, then $\alpha\cdot\mathcal{O}_K=\langle\alpha\rangle\subset I$ shows that $I$ is a full rank additive subgroup of $\mathcal{O}_K$. As such, general results about subroups of $\Bbb{Z}^n(\simeq\mathcal{O}_K)$ impose that
> __Lemma.__ $(I,+)$ is isomorphic to $\Bbb{Z}^n$.

__Note.__ The so-called __trivial ideals__ are the __zero ideal__ $\langle 0\rangle=\{0\}$ and $R$ itself: $\langle 1\rangle=R$.

__Note.__ There are varying nontational conventions for ideals...
* $I,J,K$ often represent ideals; there should never be a confusion with the field $K$
* $\mathfrak{a},\mathfrak{b},\mathfrak{c}$ do too
* The letters $\mathfrak{p}, \mathfrak{q}$ are reserved for prime ideals (introduced later)

[^rmk_fg_ideals]: It is a simple task to verify that these are indeed ideals.
[^noeth]: i.e. the $\mathcal{O}_K$ are _noetherian_. Dedekind rings are noetherian by definition.

### Ideals as generalized elements

#### Operations on Ideals

Let $I,J,K$ be ideals in some ring $R$. The following operations define new ideals of $R$.

> __Sum of ideals.__ Define $I+J=\{x+y\text{ where }x\in I, y\in J\}$.
> __Product of ideals.__ Define $I\cdot J=\{\sum_i x_iy_i\text{ where }x_i\in I, y_i\in J\}$.
> __Divisibility.__ Define $I$ divides $J$, and write $I\mid J$, if there is an ideal $K$ with $I\cdot K = J$.
> __Intersection of ideals.__ The intersection $I\cap J$ remains an ideal.

There are other noteworthy operations but we don't need them here. Sums and products satisfy the expected commutativity, associativity and distributivity properties: $$\left\{\begin{array}{lr}\text{Commutativity: } & I\cdot J = J\cdot I \quad\text{and}\quad I+J = J+I,\\[1mm] \text{Associativity: } & (I\cdot J)\cdot K = I \cdot (J \cdot K) \quad\text{and}\quad (I + J) + K = I  + (J  + K), \\[1mm] \text{Distributivity: } & (I+J)\cdot K = I\cdot K + J\cdot K\end{array}\right.$$

__Note.__ One has $\langle x_1,\dots,x_n\rangle=\sum_{i=1}^n\langle x_i\rangle$ and $\langle x_i\rangle_{1\leq i\leq n}\cdot\langle y_j\rangle_{1\leq j\leq m}=\langle x_iy_j\rangle_{1\leq i\leq n,~1\leq j\leq m}$.

#### Relating operations on elements to operations on ideals

In a ring $R$ we can convert elements into (principal) ideals. Recall $\langle x\rangle = \{rx\mid r\in R\}$. $$\langle \,\cdot\,\rangle:\left\{\begin{array}{c} R\setminus0 & \longrightarrow & \left\{\begin{array}{c}\text{set of all nonzero prin-}\\\text{cipal ideals of }R\end{array}\right\}\\[1mm] x & \longmapsto & \langle x\rangle\end{array}\right.$$ When moving from elements to (principal) ideals, a little bit of information gets lost in the process. Indeed, different elements may give rise to the same (principal) ideal: $\langle x\rangle = \langle y\rangle$ _iff_[^assume_domain] $x$ and $y$ are associates, i.e. there exists a unit $u$ with $y=ux$. But differing by a unit is pretty inconsequential for questions of divisibility and factorization, which is what we are interested in.

Some of the concepts that introduced for elements carry thus over to (principal) ideals in a ring $R$[^assume_domain].
* $a,b\in R$ are associates _iff_ $\langle a\rangle=\langle b\rangle$
* $u\in R$ is a unit _iff_ $\langle u\rangle=R$
* $a$ divides $b$ _iff_ $\langle b\rangle\subset \langle a\rangle$

### Prime ideals

> We slyly introduced _one_ form of divisibility between (principal) ideals in the last bullet point: set theoretic containment. But having defined _products_ of ideals, it would seem to make more sense to define divisibility between ideals in terms of the ideal product.

#### Two notions of divisibility for ideals

The most natural way to define divisibility for ideals is in terms of products: $I\mid J$ when there exists an ideal $K$ such that $I\cdot K=J$. However, in most of commutative algebra, this relation does not play as prominent a rale as the weaker notion of (set theoretic) _containment_. Containment of ideals $J\subset I$, can be seen as a _weaker form of divisibility_. Indeed,
> __Lemma.__ For arbitrary ideals $I,J$ in a ring $R$ one has $I\mid J\implies J\subset I$

Let us introduce nonstandard notation $\mid^{\text{weak}}$ and $\mid^{\text{strong}}$ to mean respectively
* $I\mid^{\text{weak}}J\iff J\subset I$
* $I\mid^{\text{strong}}J \iff I\mid J \iff \exists K,~I\cdot K = J$.

Using this notation we can re-state the previous lemma:
> __Lemma.__ $I\mid^{\text{strong}}J \implies I\mid^{\text{weak}} J$.

When restricted to _principal_ ideals $\mathfrak{a}=\langle a\rangle$ and $\mathfrak{b}=\langle b\rangle$ the two notions coincide:
> __Lemma.__ $\mathfrak{a}\mid^{\text{strong}} \mathfrak{b}\iff\mathfrak{b}\mid^{\text{weak}}\mathfrak{a}\iff a\mid b$.

#### In most rings, these two notions are very different

For non principal ideals (and arbitrary rings) the previous equivalence usually fails. Consider for instance the ring $R=\Bbb{Z}[X]$ of polynomials with (rational) integer coefficients. Consider the three ideals $I=\langle 2,X\rangle$, $J=\langle 2\rangle$ and $J'=\langle X\rangle$. One easily sees that
* $I$ is the ideal of all polynomials whose constant term is even,
* $J$ is the ideal of all polynomials with even coefficients,
* $J'$ is the ideal of all polynomials whose constant term is $0$.

Then $J,J'\subset I$ i.e. $I\mid^{\text{weak}} J,J'$, yet no ideal $K$ can satisfy either $I\cdot K=J$ or $I\cdot K=J'$, i.e. neither $I\mid^{\text{strong}} J$ nor $I\mid^{\text{strong}} J'$ hold.

#### Prime Ideals

The following is not the usual way to define prime ideals[^prime_ideal], but in light of our emphasis on divisibility it is the most appropriate. Let $R$ be a ring.
> __Definition.__ An ideal $\mathfrak{p}$ is __prime__ if for any ideals $I,J$ of $R$, $I\cdot J\subset\mathfrak{p}\implies I\subset \mathfrak{p}$ or $J\subset \mathfrak{p}$.

In other words, $$\mathfrak{p}\text{ prime ideal of }R\iff \Big(\text{for all ideals } I,J\text{,}\quad\mathfrak{p}\mid^{\text{weak}} I\cdot J \implies \mathfrak{p}\mid^{\text{weak}} I \text{ or }\mathfrak{p}\mid^{\text{weak}} J\Big)$$

This shows the connection with the notion of prime elements: $$p\text{ prime element of }R \iff \Big(\text{ for all }a,b\in R,\quad p\mid a\cdot b \implies p\mid a\text{ or }p\mid b\Big)$$

The connection is further strenghtened by
> __Lemma.__ Let $p\in R$ be a nonzero nonunit: $p$ is prime _iff_ $\langle p\rangle$ is a prime ideal.


[^assume_domain]: For this to work, we should assume $R$ to be a domain.
[^prime_ideal]: Prime ideals are usually defined as the ideals $I$ of $R$ such that the quotient ring $R/I$ is a domain.

## More elements, more primes, fewer problems

> The insight of the generalization of the FTA is that by allowing "more elements and more primes" in the form of the _non principal ideals_ and _non principal prime ideals_ one can generalize the FTA to rings of integers $\mathcal{O}_K$[^and_Dedekind_domains].

[^and_Dedekind_domains]: and Dedekind domains more generally.

### More elements and more primes ...

To summarize, we can consider, in a domain $R$,
* nonzero elements[^up_to_ass.] as special avatars of a larger class of "generalized elements": the (nonzero) principal ideals inside the larger set of all nonzero ideals,
* prime elements[^up_to_ass.] as special avatars of a larger class of generalized "primes": the (nonzero) principal prime ideals inside the larger set of all nonzero prime ideals,

And indeed, for most rings, this provides us with a much larger collection of objects that one may legitimately call "primes".

[^up_to_ass.]: (up to association)

![](https://i.imgur.com/Nwgxs8M.jpg)

In the picture above, we identify the nonzero elements of $R$ (up to association) with the set of all nonzero principal ideals. This identification is represented by the blue two headed arrows.

__Note.__ In some rings, all ideals are principal. Domains with this property are called __Principal Ideal Domains__ (PID for short).


### ... Fixes the FTA

We will first recast the Fundamental Theorem of Arithmetic (FTA) of the integers $\Bbb{Z}$ in terms of ideals and their unique factorization into products of prime ideals. We then state (without proof) its extension to rings of integers $\mathcal{O}_K$ for arbitrary number fields $K$.

#### Drawing Inspiration from the Integers

Recall the notation $\langle a\rangle = \{ak\mid k\in\Bbb{Z}\}$. The ring of (rational) integers is particular in the sense that all its ideals are principal[^PID]. In other words, if $I$ is an ideal of $\Bbb{Z}$, there exists a unique nonnegative integer $n$ with $I=\langle n\rangle$. As a consequence, $\mid^{\text{weak}}$ and $\mid^{\text{strong}}$ are the same.

[^PID]: Domains with only principal ideals are called Principal Ideal Domains (PID).

|$\Huge\mathbb{Z}$| With elements | With Ideals |
| -------- | -------- | -------- |
| Division     | $a\mid b$     | $\left.\begin{array}{clc}\langle a \rangle&\mid^{\text{weak}}&\langle b \rangle\\ \langle a \rangle&\mid^{\text{strong}}&\langle b \rangle\end{array}\right\}\text{ same thing}$ |
|Associates| $b=u\cdot a$ for $u\in\mathcal{U}(\Bbb{Z})$| $\langle a \rangle = \langle b \rangle$ |
|Product| $a\cdot c = b$ | $\langle a \rangle\cdot\langle c \rangle=\langle b \rangle$ |
|GCD| $d = \gcd(a,b)$ | $\langle d \rangle = \langle a \rangle + \langle b \rangle$|
|LCM| $m = \mathrm{lcm}(a,b)$ | $\langle m \rangle = \langle a \rangle \cap \langle b \rangle$|
|Primes| prime numbers $p$ | nonzero prime ideals $\langle p \rangle$|
|Set of Primes| $\{$ all positive primes $p$ $\}$ | $\{$ all nonzero prime ideals $\langle p \rangle$ $\}$|
|FTA| Every positive integer $n$ has a unique factorization into a product of primes $$\Large\displaystyle n=\prod_{i=1}^r\;p_i^{m_i}$$| Every nonzero ideal $I=\langle n\rangle$ has a unique factorization into a product of prime ideals $$\Large\displaystyle I =\langle n \rangle=\prod_{i=1}^r\;\langle p_i \rangle^{m_i}$$ |

__Note.__ GCD = greatest common divisor, LCM = lowest common multiple, FTA = Fundamental Theorem of Algebra.

#### The FTA for rings of integers

As promised, here (in the last box) is the version of the FTA for rings of integers $\mathcal{O}_K$ of number fields $K$. We state it without proof, along the intermediary result that $\mid^{\text{weak}}$ and $\mid^{\text{strong}}$ are identical relations.

|$\Huge\mathcal{O}_K$| With elements | With Ideals |
| -------- | -------- | -------- |
| Division     | $a\mid b$     | $\left.\begin{array}{clc}I&\mid^{\text{weak}}&J\\ I &\mid^{\text{strong}} & J\end{array}\right\}\text{ same thing}$
|Associates| $b=u\cdot a$ for $u\in\mathcal{U}({\mathcal{O}_K})$| $I=J$ |
|Product| $a\cdot c = b$ | $I\cdot J$ |
|GCD| <span style="color: #FF3800">_doesn't usually exist_</span> | $I+J$|
|LCM| <span style="color: #FF3800">_doesn't usually exist_</span> | $I\cap J$|
|Primes| prime elements | nonzero prime ideals $\mathfrak{p}$|
|Set of Primes| $\{\text{primes }p\text{ up to association}\}$ | $\begin{array}{c} \{\text{ principal prime ideals }\langle p\rangle\,\} \\ \cap \\ \{\text{ all nonzero prime ideals }\mathfrak{p}\,\}\end{array}$|
|FTA| <span style="color: #FF3800">_usually wrong_</span>| Every nonzero ideal $I$ has a unique factorization into a product of prime ideals $$\Large\displaystyle I=\prod_{i=1}^r\;\mathfrak{p}_i^{m_i}$$ |

### The main ingredient and its corollaries

The theorem follows easily from an important proposition which we state here (without proof). The proof[^the_proof_is_noice], as well as how to derive the corollaries, can be found in Baker's book, Theorem 11.2. We provide further details in [this separate note][details Baker]. Let $I$ be any nonzero ideal in $\mathcal{O}_K$.
> __Theorem.__ There exists a nonzero ideal $J$ such that $I\cdot J$ is principal.

In other words, all (nonzero) ideals in $\mathcal{O}_K$ are __invertible__. With this result in hand, it is pleasantly easy to derive the following propositions. Let $\mathfrak{a}, \mathfrak{b}, \mathfrak{c}$ be nonzero ideals in $\mathcal{O}_K$.
> __Cancellation.__ $\mathfrak{a}\mathfrak{b}=\mathfrak{a}\mathfrak{c}\implies\mathfrak{b}=\mathfrak{c}$.
> __To contain is to divide[^divide_contain].__ $\mathfrak{a}\mid\mathfrak{b}\iff\mathfrak{b}\subset\mathfrak{a}$ that is $\mathfrak{a}\mid^{\text{strong}}\mathfrak{b}\iff \mathfrak{a}\mid^{\text{weak}}\mathfrak{b}$
> __Finite set of divisors.__ There are only finitely many ideals dividing a given ideal $\mathfrak{a}$.
> __FTA.__ Every nonzero ideal is uniquely the product of finitely many prime ideals.

[^divide_contain]: We stole that sentence from __A Conversational Introduction to Algebraic Number Theory__ by

[^the_proof_is_noice]: The proof in Baker is surprisingly simple yet quite non-trivial.

### Revisiting an earlier counter example

We revisit the unfortunate situation $2\times 3=6=(1-\sqrt{-5})(1+\sqrt{-5})$ mentioned earlier. The point of view described here is to factor the principal ideals $\langle 2\rangle$ and $\langle 3\rangle$. Using the fact that the ring of integers $\mathcal{O}_{K}=\Bbb{Z}[\sqrt{-5}]$ of $K=\Bbb{Q}(\sqrt{-5})$ has an integral power basis $(1,\tau)$, where $\tau=\sqrt{-5}$, one may deduce from the factorizations $X^2+5=(X+1)^2~\mathrm{mod}~[2]$ and $X^2+5=(X+1)(X-1)~\mathrm{mod}~[3]$ of $\tau$'s minimal polynomial $X^2+5$ the factorizations $$
\langle 2\rangle = \langle 2, 1+\sqrt{-5}\rangle^2
\qquad\text{and}\qquad
\langle 3\rangle=\langle 3, 1+\sqrt{-5}\rangle\cdot\langle 3, 1-\sqrt{-5}\rangle
$$ Furthermore, the ideals $\langle 2, 1+\sqrt{-5}\rangle$, $\langle 3, 1+\sqrt{-5}\rangle$ and $\langle 3, 1-\sqrt{-5}\rangle$ are prime (indeed, maximal) by inspection[^usual_prime_characterization]: $$\mathcal{O}_{K}\Big/\langle 2, 1+\sqrt{-5}\rangle\simeq\Bbb{F}_2\qquad\text{and}\qquad \mathcal{O}_{K}\Big/\langle 3, 1\pm\sqrt{-5}\rangle\simeq\Bbb{F}_3$$

[^usual_prime_characterization]: using the standard characterization of prime ideals as those ideals $\mathfrak{p}$ whose quotient ring$R/\mathfrak{p}$ is a domain.

We also get the prime factorizations of $\langle 1+\sqrt{-5}\rangle$ and $\langle 1-\sqrt{-5}\rangle$: $$\begin{array}{rcl}
\langle 2, 1+\sqrt{5}\rangle\cdot \langle 3, 1+\sqrt{5}\rangle 
& = & \langle 6, 2(1+\sqrt{-5}), 3(1+\sqrt{-5}), (1+\sqrt{5})^2\rangle \\ 
& = & \langle 1+\sqrt{5}\rangle 
\end{array}$$ and, given that $\langle 2, 1+\sqrt{5}\rangle=\langle 2, 1-\sqrt{5}\rangle$, $$\begin{array}{rcl}
\langle 2, 1-\sqrt{5}\rangle\cdot \langle 3, 1-\sqrt{5}\rangle 
& = & \langle 6, 2(1-\sqrt{-5}), 3(1-\sqrt{-5}), (1-\sqrt{5})^2\rangle \\ 
& = & \langle 1-\sqrt{5}\rangle 
\end{array}$$

## Ideal Groups

> This section contains nothing new. We simply state consequences of the four preceding properties. In particular, we define the __ideal class group of a number field $K$__. We state (without proof) the decidedly non trivial fact that this group is _always finite_.

### The monoid of ideals in a ring of integers

In any domain $R$, the set $\mathcal{I}(R)$ of nonzero ideals along with ideal multiplication "$\;\cdot\;$" forms a _commutative monoid_ with unit $\langle 1\rangle = R$. Recall that a (commutative) monoid is a set $M$ with a multiplication "$\;\cdot\;:M\times M\to M\;$" which is (commutative) _associative_ and _unital_. The subset $\mathcal{P}(R)$ of all (nonzero) principal ideals forms a submonoid.

> __Definition.__ A (nonzero) ideal $I$ of $R$ is said to be __invertible__ if there exists $J$ with $I\cdot J$ principal.

The "__main ingredient__" from two sections ago states that all (nonzero) ideals in $\mathcal{O}_K$ for a number field $K$ are invertible. Also, the results on existence and uniqueness of factorizations into prime ideals tells us that when $R$ is the ring of integers $\mathcal{O}_K$ of a number field $K$, its monoid of ideals $\mathcal{I}(\mathcal{O}_K)$ has special properties:
* every ideal $I\in\mathcal{I}(\mathcal{O}_K)$ is "invertible mod $\mathcal{P}(\mathcal{O}_K)$", in the sense that there exists $J\in\mathcal{I}(\mathcal{O}_K)$ with $I\cdot J\in\mathcal{P}(\mathcal{O}_K)$.
* $\mathcal{I}(\mathcal{O}_K)$ is _cancellative_ in the sense that $I\cdot J=I\cdot J'\implies J=J'$,
* furthermore, its structure is exceedingly simple: $$\begin{array}{rcl}\Big(\mathcal{I}(\mathcal{O}_K),\cdot\Big) & \overset{\sim}\longrightarrow & \displaystyle\Big(\bigoplus_{\mathfrak{p}}\Bbb{N},+\Big)\\ I & \longmapsto & \big(\nu_{\mathfrak{p}}(I)\big)_{\mathfrak{p}}\end{array}$$

Where $\nu_\mathfrak{p}(I)$ denotes the __multiplicity__ of $\mathfrak{p}$ in $I$: if $I=\prod_{i=1}^r\mathfrak{p}_i^{m_i}$ is the decomposition of $I$ into a product of prime ideals, then $$\text{for all nonzero prime ideals }\mathfrak{p},\quad\nu_\mathfrak{p}(I)=\begin{cases}m_i&\text{ if }\mathfrak{p}=\mathfrak{p}_i\\[1mm]0&\text{ otherwise}\end{cases}$$ In other words, $\mathcal{I}(\mathcal{O}_K)$ is the free monoid on the set of nonzero prime ideals.

__Note.__ In the special case $K=\Bbb{Q}$ and $\mathcal{O}_K=\Bbb{Z}$, the monoid of nonzero ideals is isomorphic to the monoid of positive integers $\Bbb{N}\setminus 0$ under multiplication and the previous isomorphism is $$(\Bbb{N}\setminus 0,\times)\simeq\Big(\bigoplus_{p\text{ prime}}\Bbb{N},+\Big)$$

### The group of fractional ideals of a ring of integers

We can convert these free abelian monoids into groups. The resulting group can be identified with the collection of so-called __fractional ideals__. The name is a little unfortunate, as these are actually (nonzero) $\mathcal{O}_K$-submodules $M$ of the $\mathcal{O}_K$-module $K$ with the property that for some $x\in K$, $xM\subset\mathcal{O}_K$.

__Note.__ In the special case $K=\Bbb{Q}$ and $\mathcal{O}_K=\Bbb{Z}$, fractional ideals are of the form $q\Bbb{Z}\subset\Bbb{Q}$, for some positive rational number $q$. The group of nonzero fractional ideals is thus isomorphic to the group of positive rationals $\Bbb{Q}_+^*$ under multiplication and the previous isomorphism is $$(\Bbb{Q}_+^*,\times)\simeq\Big(\bigoplus_{p\text{ prime}}\Bbb{Z},+\Big)$$

### Ideal Class group of a ring of integers

We described how to associate to $\mathcal{O}_K$ the group of its "fractional ideals" $\mathcal{FI}(\mathcal{O}_K)$ and the subgroup of its "principal fractional ideals" $\mathcal{FP}(\mathcal{O}_K)$. This produces two short exact sequences $$1\to \mathcal{U}(K)\rightarrow K^\times \xrightarrow{~x~\mapsto~ \langle x\rangle~}\mathcal{FP}(\mathcal{O}_K)\to 1$$ and $$1\to \mathcal{FP}(\mathcal{O}_K)\rightarrow \mathcal{FI}(\mathcal{O}_K)\to\mathrm{Cl}(\mathcal{O}_K)\to 1$$ where, by definition:
> __Definition.__ $\mathcal{O}_K$'s __ideal class group__ $\mathrm{Cl}(\mathcal{O}_K)$ is the quotient group $\mathcal{FI}(\mathcal{O}_K)/\mathcal{FP}(\mathcal{O}_K)$.

It is a [simple fact][in DDK PID iff UFD] that the ring of integers $\mathcal{O}_K$ of a number field $K$[^and_more_generally_any_DDK_domain] is a PID _iff_ it is a UFD. Also, $\mathcal{O}_K$ is a PID _iff_ $\mathcal{I}(\mathcal{O}_K)=\mathcal{P}(\mathcal{O}_K)$ _iff_ $\mathcal{FI}(\mathcal{O}_K)=\mathcal{FP}(\mathcal{O}_K)$ _iff_ $\mathrm{Cl}(\mathcal{O}_K)=\{1\}$. Thus

> __Theorem.__ Are equivalent: (i) $\mathcal{O}_K$ is a PID (ii) $\mathcal{O}_K$ is a UFD (iii) $\mathrm{Cl}(\mathcal{O}_K)$ is trivial.

__Non Examples.__ The rings $\Bbb{Z}$ of rational integers, $\Bbb{Z}[i]$ of Gaussian integers and $\Bbb{Z}[j]$ of Eisenstein integers are PIDs[^euclidean_actually] and so their class groups are trivial.

The following is very much __nontrivial__:
[^euclidean_actually]: euclidean, actually

> __Theorem.__ The ideal class group of a number field is _finite_.

Computing class groups is __f*****g hard__ and involves topics we didn't discuss. It costs nothing, at this point, to remark that prime factorization implies that $\mathrm{Cl}(\mathcal{O}_K)$ is generated by the (nonzero) prime ideals $\mathfrak{p}$. These are connected to good old (rational) primes by the theory of [ramification of primes][ramification of primes wiki]. Another ingredient in class group computations is [Minkovski's bound][Minkovski bound wiki], which helps narrow the search.

__Example.__ The class group of $\Bbb{Z}[\sqrt{-5}]$ is (isomorphic to) $\Bbb{Z}/2\Bbb{Z}$ and generated by any one of the three ideals $\langle 2, 1+\sqrt{-5}\rangle$, $\langle 3, 1+\sqrt{-5}\rangle$ or $\langle 3, 1-\sqrt{-5}\rangle$ we encountered earlier.

[^and_more_generally_any_DDK_domain]: and more generally any Dedekind domain

## The Dirichlet Unit Theorem

### Statement of the DUT

We have collected some classical facts about, and computations of, unit groups of rings in an appendix. They represent what little I know (or knew at some point) about them. My impression is that for most rings $R$ explicit descriptions of its units are rare, and explicit descriptions of the _structure_ of unit groups $\mathcal{U}(R)$ are even rarer.

It is then remarkable that for rings of integers $\mathcal{O}_K$ of number fields $K$ both of these exist:
> __Lemma.__ An algebraic integer $\alpha\in\mathcal{O}_K$ is a unit _iff_ its norm $N_{K/\Bbb{Q}}(\alpha)$ is $\pm1$.

In order for this note to be as non technical as possible we have omitted many of the standard tools of the theory. Chief among them: the [norm][norm map wiki] $N_{K/\Bbb{Q}}$ and [trace][trace map wiki] $\mathrm{Tr}_{K/\Bbb{Q}}$ maps. Any book/set of lecture notes on ANT defines them.

For the following (non trivial) theorem to make sense we must define two integers $s,t$ associated with the number field $K$. Let $n=\dim_\Bbb{Q}(K)$ be $K$'s dimension as a rational vector space. It follows from the __Primitive Element Theorem__ quoted above[^explanation] that there are $n$ distinct field embeddings $\sigma:K\hookrightarrow\Bbb{C}$, say $\sigma_1,\dots,\sigma_n$. Such an embedding is called __real__ if it takes $K$ to a subfield of the real numbers, and __complex__ otherwise. If $\sigma$ is complex, then composing it with complex conjugation yields a different embedding $\overline{\sigma}$. Complex embeddings therefore come in __pairs__. We put $s=$ number of real embeddings of $K$, $2t=$ number of complex embeddings of $K$. Note that $s+2t=n$.
[^explanation]: and we already explained why back then

> __Dirichlet's Unit Theorem.__ The unit group $\mathcal{U}(\mathcal{O}_K)$ is isomorphic to $\mu_K\times \Bbb{Z}^r$, where $\mu_K$ is the (finite cyclic) group of roots of unity of $K$ and $r=s+t-1~(\geq 0)$.

The proof found in Baker (Theorem 12.3) is really worthwhile. I have collected some _details_ about certain parts of that proof in a [separate file][details Baker].

### Example: Quadratic number fields

The only situation that is easy enough for me to describe explicitely is that of quadratic number fields $K=\Bbb{Q}(\sqrt{d})=\Bbb{Q}[X]/\langle X^2-d\rangle$ for some squarefree integer $d$. We use the notation $\mathcal{O}_K=\Bbb{Z}[\tau]$ introduced in a previous section. There are two cases to distinguish:
* $d\leq -1$: then $s=0$, $t=1$ and the two embeddings are defined by $\tau\mapsto \pm i\sqrt{|d|}$. Then $r=0$ and the unit group is a finite, cyclic group of roots of unity in $K$. For all $d<0$ except $d=-1$ and $d=-3$ the unit group is $\{-1,+1\}$; the nontrivial cases are
    * $d=-1$, then $\tau=i$ and $\mathcal{U}(\Bbb{Z}[i])=\{\pm 1,\pm i\}\simeq \Bbb{Z}/4\Bbb{Z}$,
    * $d=-3$, then $\tau=j=\exp(2i\pi/3)$ and $\mathcal{U}(\Bbb{Z}[j])=\{\pm 1,\pm j,\pm \overline{j\,}\}\simeq \Bbb{Z}/6\Bbb{Z}$.

* $d\geq 2$: In that case $s=2$, $t=0$, the two embeddings being defined by $X\mapsto \pm \sqrt{d}$. The roots of unity of $K$ are $\{\pm 1\}$. We have $r=1$ and there is a so-called [fundamental unit][fundamental unit wiki] $\epsilon\in\mathcal{O}_K$ such that all units are of the form $\pm\epsilon^m$, for $m\in\Bbb{Z}$.


This recovers the classical resolution of the so-called [Pell equation][Pell equation wiki], see in particular [this section][Pell equation ANT wiki].

## Where to go from here ?

### Proper references

Readers who know the material will have noted some glaring omissions (beyond the total absence of proofs). For one, I barely mention norms[^ideals_elements] at all. If you want a _proper_ introduction to this material, you will find there is no shortage of _excellent_ online course notes and books on these subjects. I can wholeheartedly recommend two such books: Paul Pollack's __A Conversational Introduction to Algebraic Number Theory: Arithmetic Beyond Z__ **[HY: !!!]**, a gentle and very pleasant introduction to these matters, which spends a lot of time on the quadratic case, and Alan Baker's marvellous __A Comprehensive Course in Number Theory__ **[HY: !!!]**, a model of exposition and economy. The latter, specifically chapters 10, 11 and 12, was my main reference in preparing these notes and learning the material. I have collected some notes regarding certain proofs found in that book in a [separate document][details Baker] **[HY: !!!]**.

[^ideals_elements]: of either elements or ideals

### General theory of Dedekind domains

**[HY: ???]** Class groups can be defined for a very broad collecion of rings, at least for so-called __Dedekind domains__, see [wikipedia][Dedekind domain wiki] for basic definitions. These rings have the same remarkable "to contain is to divide" property for ideals that is the cornerstone of the present theory. The __Fundamental Theorem of Arithmetic for Ideals__ carries over to these more general domains, and one can similarly define class groups. Finiteness, however, isn't guaranteed. The general theory is exposed in these (french) [lecture notes][DDK JF Dat] by Jean-François Dat, and elsewhere in the litterature.

### Connection with quadratic forms

The theory as presented here remains quite abstract. There are equivalent formulations that are amenable to concrete computer assisted computations.

The starting point is again a square free integer $d$ and an associated quantity $D$ called the "discriminant" **[HY: 判别式]** : if $d \equiv 2, 3\ \mathrm{mod}\ [4]$, set $D=4d$, if $d \equiv 1\ \mathrm{mod}\ [4]$, set $D=d$. This time the object of interest are __binary quadratic forms__, that is: homogeneous degree two polynomial maps $f:\Bbb{Z}\times\Bbb{Z}\to\Bbb{Z}$ of the form $f(x,y)=ax^2+bxy+c y^2$[^for_all_x_y] with discriminant equal to $D$, i.e. satisfying $b^2-4ac = D$[^conventions_vary]. We conflate $f$ with the vector $[a,b,c]$.

[^conventions_vary]: Conventions vary.

The prime example turns out to come from $\mathcal{O}_K$, $K=\Bbb{Q}(\sqrt{d})$: the norm $N_{K/\Bbb{Q}}$ restricted to the ring $\mathcal{O}_K$. Recall that its underlying additive group is isomorphic as a group to $\Bbb{Z}^2$, explicitely by choosing the $\Bbb{Z}$-basis $(1,\tau)$. One computes the norm in these coordinates: $$N_{K/\Bbb{Q}}(x+y\tau)=(x+y\tau)(x+y\overline{\tau})=\begin{cases}x^2-dy^2 & \text{if }d\equiv 2,3~[4]\\x^2+xy+\frac{1-d}4y^2 & \text{if }d\equiv 1~[4]\end{cases}$$ This defines a binary quadratic form and one easily checks its discriminant equals $D$.

To tame the collection of all such forms (which is infinite), one considers them __up to base change__. That is we identify two such forms $f, g$ if there exists a (direct) base change matrix $U=\begin{pmatrix}s & t \\ u & v\end{pmatrix}$ (i.e. $s,t,u,v\in\Bbb{Z}$, $sv-tu=1$) such that $f\circ U=g$. There are only finitely many equivalence classes of forms.

It turns out that (at least when $d<0$) this finite set of equivalence classes is in one to one correspondence with the class group $\mathcal{Cl}(d)$. Furthermore, this one to one correspondence is the shadow of a beautiful map that sends (nonzero) ideals $I$ of $\mathcal{O}_K$ to the quadratic space $(I,q_I)$, where $q_I$ is simply the (suitably normalized) restriction of the norm form $N_K/\Bbb{Q}$ to $I$! $$\begin{array}{ccc}
\Big\{\text{nonzero ideals of }\mathcal{O}_K\Big\} 
& \longrightarrow & 
\left\{\begin{array}{c}\text{quadratic forms on }\Bbb{Z}^2\\ \text{with discriminant }D\end{array}\right\} \\[2mm]
I & \longmapsto & (I,q_I)\\[4mm]
{\color{red}\downarrow}~{\color{red}\downarrow}~{\color{red}\downarrow} & & {\color{red}\downarrow}~{\color{red}\downarrow}~{\color{red}\downarrow} \\[4mm]
\mathcal{Cl}(d) & \overset\sim\longleftrightarrow & \left\{ \begin{array}{c} \text{equivalence classes of}\\\text{binary quadratic forms} \end{array} \right\}\\[2mm]
[I] & \longleftrightarrow & \big[\text{iso. class of }(I,q_I)\big]\end{array}$$

(To be fair, the proper target of the first map is the category of oriented quadratic planes: free abelian groups of rank $2$ with an orientation and a quadratic form of discriminant $D$, and ideals on the left should be endowed with an orientation.)

An explicit construction can be found in the appendix [to this paper][G. Harcos class group via quadratic forms]. (The equivalence class of) $(\mathcal{O}_K, N_{K/\Bbb{Q}})$ corresponds to the neutral element $[\langle 1\rangle]=[\mathcal{O}_K]$, and there are explicit algebraic formulas for computing the product of two representatives forms represented by $[a,b,c]$ and $[\alpha,\beta,\gamma]$ respectively. This law is called __composition of quadratic forms__.

[Brian Conrad's course notes][B Conrad course notes] explain this correspondence __very satisfyingly__ without arbitrary base choices. I should also mention [Serre's short paper $\Delta=b^2-4ac$][Serre Delta] which discusses class number $1$ and related problems.

[^for_all_x_y]: for all $x,y\in\Bbb{Z}$,

### Isogeny based crypto

We briefly mentioned that rings of integers, orders and their ideals make a remarkable appearance in isogeny theory (and thus isogeny based cryptography). We will sketch this out a little bit.

__Note.__ Luca de Feo has excellent [slides][LDF slides 1], [__slides__][LDF slides 2] and [slides][LDF slides 3] that distill the basics of isogeny-based cryptography, and [detailed lecture notes][Luca de Feo lecture notes]. I found the second set of slides (the bold link) particularly useful. Another interesting source discussing the endomorphism rings of elliptic curves is [David Kohel's Thesis][David Kohel thesis]. Of course any treatise on elliptic curves such as Silverman's __The Arithmetic of Elliptic Curves__ includes a discussion of this topic.

__Note.__ Recall that $E/\Bbb{F}_q$ admits a so-called Frobenius automorphism, which on points $P=(x,y)\in E$ acts by $\mathbf{Frob}_q(P) = (x^q, y^q)$. This acts as the identity on $\Bbb{F}_q$-rational points but defines a nontrivial automorphism of the curve[^alg_closed].

[^alg_closed]: if we consider for instance all $\overline{\Bbb{F}_q}$-rational points.

__Note.__ Recall that __[isogenies][isogeny wiki]__ are the "right kind of map" between elliptic curves. They are usually defined in terms of nonconstant morphisms between curves (in the sense of algebraic geometry) that preserve chosen base points. Remarkably, they are always group homomorphisms. The self-isogenies of an elliptic curve $E$ (along with the constant map to the base point) thus form a ring $\mathrm{End}(E)$.

In the introduction we wrote that the ring of endomorphisms of an ordinary curve $E/\Bbb{F}_q$ is an __order__ in a quadratic ring of integers. For instance the algebraic relation due to Hasse $$\mathbf{Frob}_q^2- t\cdot\mathbf{Frob}_q + q\cdot\mathrm{id}=0$$ where #$( E / \Bbb{F}_q ) = q + 1 - t$, expresses the fact that the Frobenius endomorphism $\mathbf{Frob}_q$ of the curve $E$ is _integral_. $t$ is known as the __trace of the Frobenius__ of $E/\Bbb{F}_q$. It further holds that $$\Bbb{Z}[\mathbf{Frob}_q]\subset\mathrm{End}(E)\subset\mathcal{O}_K$$ where $K$ is the splitting field of $X^2-tX+1$. When the curve is ordinary $t$ is coprime to $q$ and $K=\Bbb{Q}(D)$ is __complex__ since $D=t^2-4q<0$ by the [Hasse bound][Hasse bound wiki].

The ring of endomorphism appears thus as a full rank subring of $\mathcal{O}_K$, i.e. an __order__ of $K$. Orders $\mathcal{O}$ of quadratic number rings are easy to describe: they are all of the form $\mathcal{O}=\Bbb{Z}+f\mathcal{O}_K$ for a unique positive integer $f$. Furthermore, $f$ is the index of the $\mathcal{O}$ as a subgroup of $\mathcal{O}_K$, and $\mathcal{O}\subset \mathcal{O}'$ _iff_ $f'\mid f$.

An important property of the trace $t$ is the
> __Theorem (Serre-Tate).__ $E/\Bbb{F}_q$ and $E'/\Bbb{F}_q$ are isogenous over $\Bbb{F}_q$ _iff_ $t=t'$.

The Serre-Tate theorem tells us that **the endomorphism rings of isogenous elliptic curves are all sandwiched between the orders $\Bbb{Z}[\mathbf{Frob}_q]$ and $\mathcal{O}_K$ of the same number field $K$**. Futhermore, the previous remark about divisibility of indices implies that there are only finitely many orders in that gap.

On page 6 of Luca de Feo _et al._'s paper [Towards practical key exchange from ordinary isogeny graphs][LDF Towards] one finds a description of how (invertible) ideals $\mathfrak{a}$ of $\mathcal{O}:=\mathrm{End}(E)$ define finite subgroups $$E[\mathfrak{a}]=\lbrace P \in E\mid \forall\varphi \in \mathfrak{a}, \varphi(P)=O\rbrace$$ and associated isognies $E\twoheadrightarrow\mathfrak{a}*E$ where $\mathfrak{a}*E=E/E[\mathfrak{a}]$ is the quotient curve. These isogenies are always __horizontal__ (in the sense of page 66 out of 96 of the bold link) so that $\mathrm{End}(\mathfrak{a}*E)=\mathcal{O}=\mathrm{End}(E)$. It turns out that this defines an action of the class group of invertible ideals of $\mathcal{O}$ on the isogeny graph of $E$. One can thus walk along this graph using products of ideals. This is the basis of Diffie-Hellman-type key exchange protocols.

[LDF Towards]: https://eprint.iacr.org/2018/485

# Appendix

## Glossary

**[HY: 环的定义]** A __ring__ is an algebraic structure $R$ in which one can add, subtract and multiply and the usual rules of algebra apply. See [wikipedia][ring wikipedia] for a formal definition. The most familiar example is the ring of (rational) integers $\Bbb{Z}=\{\dots,-2,-1,0,1,2,3,\dots\}$ with the usual addition and multiplication. _Division_ is usually not possible: for instance $½\notin\Bbb{Z}$. Of course $½$ exists as a rational number, but it's not an integer. We say that $a\in R$ divides $b\in R$, and we write $a\mid b$, if there is some $c\in R$ such that $a\times c = b$.

The rings in this note are all __commutative__ **[HY: 交换的]** (for all $a,b\in R$ it holds that $a\times b = b\times a$) and __unital__ (there is an element $1_R$ such that forall $a\in R$ we have $1_R\times a=a=a\times 1_R$). When working in a ring one usually drops the "$\times$" symbol and writes $ab$ or $a\cdot b$ in stead of $a\times b$, also one usually writes $1$ in stead of $1_R$.

A __domain__ **[HY: ???]** is a ring where cancellation is true: if $a\neq 0$ and $b,c\in R$ satisfy $a\times b = a\times c$ then $b=c$. Equivalently it is a ring in which the product of two nonzero elements is again nonzero. Not all rings of interest in cryptography are domains. For instance RSA cryptography works in rings $R =\Bbb{Z}/N\Bbb{Z}$ of (rational) integers modulo an "RSA modulus" $N$ (a product of two large distinct primes $N=pq$). Such rings aren't domains: both $p$ and $q$ are nonzero in $R$, yet their product $pq$ (which is $N$) is zero in $R$. To wit, $2,3\neq 0$ in $\Bbb{Z}/6\Bbb{Z}$ yet $2\cdot 3 =0$ in $\Bbb{Z}/6\Bbb{Z}$.

An element $a\in R$ is said to be __invertible__ or a __unit__ if there exists $b\in R$ with $ab=1$. The set of all units is the __group of units__ of $R$ is the set of all units of $R$. It is a group under multiplication, and is sometimes written $\mathcal{U}(R)$, $\mathcal{U}_R$ or even $R^\times$. For instance
* the units of $\Bbb{Z}$ are precisely $\{-1,+1\}$
* the units of the field of rational numbers $\Bbb{Q}$ are all nonzero rational numbers $\Bbb{Q}^\times$
* the units of $\Bbb{Z}/7\Bbb{Z}$ are[^explanation7] $\{1,2,3,4,5,6\}$ since $1\cdot 1=1$, $2\cdot 4 = 1$, $3\cdot 5=1$ in $\Bbb{Z}/7\Bbb{Z}$
* the units of $\Bbb{Z}/12\Bbb{Z}$ are[^explanation12] $\{1,5,7,11\}$ since $1\cdot 1=1$, $5\cdot 5 = 1$, $7\cdot 7=1$ and $11\cdot 11 = 1$ in $\Bbb{Z}/12\Bbb{Z}$

Two elements $x$ and $y$ in a ring $R$ are said to be __associates__ if they are the same up to a unit in the sense that there is some unit $u\in\mathcal{U}(R)$ such that $y=ux$.
[^explanation7]: $2 \cdot 4 = 8 = 1 \cdot 7 + 1 \equiv 1\ \mathrm{mod}\ 7$ so $2$ is invertible with inverse $4$, <br> $3 \cdot 5 = 15 = 2\cdot 7 + 1 \equiv 1\ \mathrm{mod}\ 7$ so $3$ is invertible with inverse $5$, <br> $6 \cdot 6 = 36 = 5 \cdot 7 + 1 \equiv 1\ \mathrm{mod}\ 7$ so $6$ is invertible and is its own inverse.
[^explanation12]: $5 \cdot 5 = 25 = 2 \cdot 12 + 1 \equiv 1\ \mathrm{mod}\ 12$ so $5$ is invertible and is its own inverse, <br> $7 \cdot 7 = 49 = 4 \cdot 12 + 1 \equiv 1\ \mathrm{mod}\ 12$ so $7$ is invertible and is its own inverse, <br> $11 \cdot 11 = 121 = 10 \cdot 12 + 1 \equiv 1\ \mathrm{mod}\ 12$ so $11$ is invertible and is its own inverse

**[HY: 域和环的关系]** A __field__ is a ring in which every nonzero element has an inverse. Typical examples include the rational numbers $\Bbb{Q}$, the real numbers $\Bbb{R}$ and the complex numbers $\Bbb{C}$. There are also the prime fields $\Bbb{F}_p=\Bbb{Z}/p\Bbb{Z}$ for a (rational) prime $p$ (for instance $\Bbb{Z}/7\Bbb{Z}$ encountered above) and more generally, the finite fields $\Bbb{F}_{q}$ of size $q$ where $q$ is a prime power. Number fields discussed in this text are fields (by definition).

## Units and structure of unit groups - classical examples and some facts

There are of course exceptions, and many classical results determining the structure of groups of units of rings.
* $\Bbb{Z}^\times=\{\pm1\}$,
* $\Bbb{Q}^*_+\simeq\bigoplus_{p\text{ prime}}\Bbb{Z}$, and taking signs into account, $\Bbb{Q}^*\simeq \{\pm1\}\times \Bbb{Q}^*_+$;
* $\Bbb{R}^*_+\simeq(\Bbb{R},+)$ via the exponential map / logarithm, $\Bbb{R}^*\simeq\{\pm1\}\times(\Bbb{R},+)$
* $\Bbb{U} = \lbrace z\in\Bbb{C}\mid |z|=1 \rbrace$, $\Bbb{U}\simeq\Bbb{R}/\Bbb{Z}$ via $t\mapsto\exp(2i\pi t)$
* $\Bbb{C}^* \simeq \Bbb{U} \times \Bbb{R}_+^*$

For rings of the form $\Bbb{Z}/N\Bbb{Z}$ it is enough, thanks to the [Chinese Remainder Theorem][CRT wiki] to deal with the prime power case $N=p^d$:
* if $\mathcal{U}(\Bbb{Z}/p^d\Bbb{Z})$ is cyclic isomorphic to $\Bbb{Z}/(p-1)p^{d-1}\Bbb{Z}$.

It is a [fact][fin subgrp of units of field] that finite subgroups of $L^\times$ (for any field $L$) are cyclic. As a consequence:
* For any finite field $\Bbb{F}_q$, $\Bbb{F}_q^\times\simeq\Bbb{Z}/(q-1)\Bbb{Z}$.

If $A$ is any ring, $A[X]$ its ring of polynomials, $P=a_0+a_1X+\cdots+a_d X^d\in A[X]$, then
* $P$ is invertible in $A[X]$ _iff_ $a_0$ is invertible in $A$ and $a_1,\dots,a_d$ are nilpotent.

In particular, if $A$ is [reduced][reduced ring wiki] **[HY: ???]** then $A[X]^\times\simeq A^\times$.

Likely the most important example on this list is the (noncommutative) ring of matrixes $M_n(A)$ for a (commutative **[HY: 交换的]**) ring $A$: its units are precisely those matrices whose determinant is a unit in $A$.

[Canonical Embedding, 5.3]: https://faculty.math.illinois.edu/~r-ash/Ant/AntChapter5.pdf
[Lemmermeyer]: http://www.fen.bilkent.edu.tr/~franz/ant-st.pdf
[Factorization, primes and ideals, Joel Kamnitzer]: http://www.math.toronto.edu/jkamnitz/courses/mat347/347_1516_W14.pdf
[Factorizations of Algebraic Integers, Scott Chapman]: https://www.shsu.edu/~stc008/Rice2017.pdf
[Class Group Calculations, Keith Conrad]: https://kconrad.math.uconn.edu/blurbs/gradnumthy/classgpex.pdf 
[Quadratic integers (wikipedia)]: https://en.wikipedia.org/wiki/Quadratic_integer
[cubic MSE]: https://math.stackexchange.com/a/774810/11258
[The simplest cubic fields, Daniel Shanks]: https://www.ams.org/journals/mcom/1974-28-128/S0025-5718-1974-0352049-8/S0025-5718-1974-0352049-8.pdf
[Every abelian group is a class group]: (https://web.archive.org/web/20170107022505/http://projecteuclid.org/DPubS/Repository/1.0/Disseminate?view=body&id=pdf_1&handle=euclid.pjm/1102994263)
[Pure cubic extension MSE]: https://math.stackexchange.com/a/3508522/11258
[this MO answer]: https://mathoverflow.net/a/17329/13700
[ring of integers of cyclotomic fields]: https://faculty.math.illinois.edu/~r-ash/Ant/AntChapter7.pdf
[the logarithmic embedding]: https://faculty.math.illinois.edu/~r-ash/Ant/AntChapter6.pdf
[slides (Alexandre Gelin)]: https://jc2-2017.inria.fr/files/2017/05/gelin.pdf
[thesis (Alexandre Gelin)]: https://tel.archives-ouvertes.fr/tel-01746176/document
[Voronoi's Method]: https://people.math.carleton.ca/~williams/papers/pdf/263.pdf
[An Explicit Integral Basis for a Pure Cubic Field]: https://people.math.carleton.ca/~williams/papers/pdf/216.pdf
[transcendental number wiki]: https://en.wikipedia.org/wiki/Transcendental_number
[UFD wiki]: https://en.wikipedia.org/wiki/Unique_factorization_domain
[in DDK PID iff UFD]: https://planetmath.org/pidandufdareequivalentinadedekinddomain
[Dedekind domain wiki]: https://en.wikipedia.org/wiki/Dedekind_domain
[domain wiki]: https://en.wikipedia.org/wiki/Integral_domain
[square free wiki]: https://en.wikipedia.org/wiki/Square-free_integer
[ring wikipedia]: https://en.wikipedia.org/wiki/Ring_%28mathematics%29
[monic polynomial wiki]: https://en.wikipedia.org/wiki/Monic_polynomial
[algebraic numbers form a field wiki]: https://en.wikipedia.org/wiki/Algebraic_number#The_field_of_algebraic_numbers
[rupture field wiki]: https://en.wikipedia.org/wiki/Rupture_field
[CRT wiki]: https://en.wikipedia.org/wiki/Chinese_remainder_theorem#Theorem_statement
[reduced ring wiki]: https://en.wikipedia.org/wiki/Reduced_ring
[fin subgrp of units of field]: https://mathoverflow.net/questions/54735/collecting-proofs-that-finite-multiplicative-subgroups-of-fields-are-cyclic
[norm map wiki]: https://en.wikipedia.org/wiki/Field_norm
[trace map wiki]: https://en.wikipedia.org/wiki/Field_trace
[Pell equation wiki]: https://en.wikipedia.org/wiki/Pell%27s_equation
[Pell equation ANT wiki]: https://en.wikipedia.org/wiki/Pell%27s_equation#Algebraic_number_theory
[ramification of primes wiki]: https://en.wikipedia.org/wiki/Ramification_(mathematics)#In_algebraic_number_theory
[Minkovski bound wiki]: https://en.wikipedia.org/wiki/Minkowski%27s_bound
[lattice based cryptography wiki]: https://en.wikipedia.org/wiki/Lattice-based_cryptography
[lattice problems wiki]: https://en.wikipedia.org/wiki/Lattice_problem
[isogeny wiki]: https://en.wikipedia.org/wiki/Isogeny
[quotient ring wiki]: https://en.wikipedia.org/wiki/Quotient_ring
[golden ratio wiki]: https://en.wikipedia.org/wiki/Golden_ratio
[Gaussian integers wiki]: https://en.wikipedia.org/wiki/Gaussian_integer
[Eisenstein integers wiki]: https://en.wikipedia.org/wiki/Eisenstein_integer
[cyclotomic polynomial wiki]: https://en.wikipedia.org/wiki/Cyclotomic_polynomial
[cyclotomic field wiki]: https://en.wikipedia.org/wiki/Cyclotomic_field
[Euler totient wiki]: https://en.wikipedia.org/wiki/Euler%27s_totient_function
[fundamental unit wiki]: https://en.wikipedia.org/wiki/Fundamental_unit_(number_theory)
[Atiyah MacDonald]: Introduction-to-Commutative-Algebra
[root representation MSE]: https://math.stackexchange.com/questions/2749930/roots-of-polynomials-with-bounded-integer-coefficients
[root representation Baez]: http://math.ucr.edu/home/baez/roots/
[root representation Baez slides]: http://math.ucr.edu/home/baez/roots/beauty.pdf
[root high res pictures]: http://jdc.math.uwo.ca/roots/
[details Baker]: https://hackmd.io/@olivierbbb/Byp7v5VzU
[Lattice based crypto for beginners]: https://eprint.iacr.org/2015/938.pdf
[square free test]: https://mathoverflow.net/questions/16098/complexity-of-testing-integer-square-freeness
[super singular embedding degree leq 6]: https://theory.stanford.edu/~dfreeman/papers/ants-embedding.pdf

[K. Conrad class group via quadratic forms]: http://virtualmath1.stanford.edu/~conrad/248APage/handouts/picgroup.pdf
[G. Harcos class group via quadratic forms]:
https://www.renyi.hu/~gharcos/heegner.pdf

[M. Straka blog on class groups]: https://www.michaelstraka.com/posts/classgroups/

[Isogeny seminar slides]: https://defeo.lu/docet/assets/slides/2016-09-29-lausanne.pdf
[David Kohel thesis]: http://iml.univ-mrs.fr/~kohel/pub/thesis.pdf
[K Conrad notes]: https://kconrad.math.uconn.edu/blurbs/
[B Conrad course notes]: http://virtualmath1.stanford.edu/~conrad/248APage/handouts.html
[Michael Straka]: https://www.michaelstraka.com/posts/classgroups/
[Wesolovski]: https://eprint.iacr.org/2018/623
[BBF VDF survey]: https://eprint.iacr.org/2018/712
[isogeny based crypto Luca de Feo]: https://arxiv.org/pdf/1711.04062.pdf
[DARK]: https://eprint.iacr.org/2019/1229
[DDK JF Dat]: https://webusers.imj-prg.fr/~jean-francois.dat/enseignement/TNM2/TNM2.pdf
[irreds are prime implies ufd if noeth dom]: http://ramanujan.math.trinity.edu/rdaileda/teach/m4363s07/non_ufd.pdf
[Luca de Feo lecture notes]: https://arxiv.org/abs/1711.04062
[LDF slides 1]: http://defeo.lu/docet/assets/slides/2018-11-15-gardanne.pdf
[LDF slides 2]: https://defeo.lu/docet/assets/slides/2019-09-16-birmingham.pdf 
[LDF slides 3]: https://defeo.lu/docet/assets/slides/2016-09-29-lausanne.pdf
[Hasse bound wiki]: https://en.wikipedia.org/wiki/Hasse%27s_theorem_on_elliptic_curves
[Serre Delta]: https://sms.math.nus.edu.sg/smsmedley/Vol-13-1/%E2%88%86%20=%20b2%20-%204ac(Jean-Pierre%20Serre).pdf
[LDF Towards]: https://eprint.iacr.org/2018/485
[Hard Homogeneous Spaces]: https://eprint.iacr.org/2006/291.pdf
[BBF Accumulators]: https://eprint.iacr.org/2018/1188