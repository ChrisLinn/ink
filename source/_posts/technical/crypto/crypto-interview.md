---
title: 搞 MPC 和 ZKP 的基础密码学面试
---

# 搞 MPC 和 ZKP 的基础密码学面试

## 数论

### 代数结构
具有一个及以上运算的非空集合。

### 群 (group)
只有一个运算（二元操作）的一个（有限或无限）集合。

满足:

+ 封闭性：如果 $a,b \in G$，则 $ab \in G$
+ 结合律： 如果 $a,b,c \in G$，则 $(ab)c =a(bc)$
+ 单位元：集合中存在一个元素 $I$，保证 $aI = Ia = a$，对所有的 $a \in G$ 都成立
+ 逆元：对每个集合的元素 $a \in G$，存在对应的 $b = a^{-1}$，保证 $ab = ba = I$

_另外，有一个叫 类群 (class group) 的东西，和 二元二次型 (Binary quadratic form) 以及 虚二次数域 (Imaginary Quadratic Number Fields) 相关，在 1) 零知识证明 (比如 zkSNARK 的 Marlin 协议中用它来构造 Polynomial commitment) 和 2) 累加器 (用于替代 merkle tree，快速同步快速验证) 中很有用，这个到时值得单独拿出来讲讲。_

<!-- 
* [](/notes/crypto/classgroup-1/)
    + https://hackmd.io/@olivierbbb/r10VpNPZU
+ https://www.michaelstraka.com/posts/classgroups/
+ https://github.com/Chia-Network/vdf-competition/blob/master/classgroups.pdf)
 -->

#### 阿贝尔群 (Abelian group) 
满足交换律，故阿贝尔群又叫交换群 (commutative group)。

#### 循环群 (cyclic group)
存在一个元素  $g$ (生成元，generator)，群中所有元素都可以由生成元的幂运算获得。

#### 循环群 vs 阿贝尔群
循环群都是阿贝尔群，不是所有的阿贝尔群都是循环群。

#### 子群
一个群的非空子集，若在同样的运算下也构成一个群，则称之为这个群的子群。

### 环 (ring)
具有两个二元操作（加法和乘法）的一个集合。此处的 加法、乘法与一般所说的加法和乘法不同。

满足:

+ 加法结合律
+ 加法交换律
+ 加法单位元
+ 加法逆元
+ 乘法结合律
+ (乘法关于加法满足) 分配律, 即：
    * a · (b + c) = (a · b) + (a · c)
    * (a + b) · c = (a · c) + (b · c)

环在加法操作下是个阿贝尔群 (交换群)。乘法下是个半群 (只满足 封闭性 和 结合律)。

#### 子环
一个环的非空子集，若在加法和乘法下也构成一个环，则称之为这个环的子环。

例：整数环是有理数域的一个子环，偶数环是整数环的一个子环。

#### 理想 (ideal)
理想是一种特殊的子环。在子环的基础上满足：

+ 如果 $B$ 是 $A$ 的一个理想，那么对于任何 $a \in A, b \in B$，存在 $ab \in B$（左理想），并且 $ba \in B$（右理想）。
    * 注意环中乘法不一定可交换，所以 $ab$ 和 $ba$ 不同。

每个环至少有两个理想，这两个理想也被称为平凡理想:

+ 单个 0 元所生成的环 (因为任何一个元与0元的乘都为0元)
+ 这个环本身

对于整数环，所有偶数组成的子环是一个理想，因为任何整数和偶数的乘积还是一个偶数。

##### 主理想 (prime ideal)
略

#### 商环
略

#### 分划 & 类
略

#### 除法代数
略

### 域 (field)
满足以下性质的一个集合:

+ 加法和乘法的结合律
+ 加法和乘法的交换律
+ 加法和乘法的分配律
+ 加法和乘法的单位元
+ 加法和乘法的逆元

实数是域，整数是环。

#### 有限域 (finite field)
集合中元素有限的域。又称为 伽罗瓦域 (Galois field)。

+ 如果域上不要求乘法的交换律，就是除法代数。
+ 域上存在逆元。（域上支持除法运算。）
+ 环不是域。
    * 矩阵环不支持乘法的交换律。
+ 域中所有非零元素的集合是关于乘法的阿贝尔群。
+ 有限域的乘法群是循环群。
+ 有限域中所有非零元素的集合的每个有限子群都是循环群。

## 椭圆曲线
https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/

两条平行线有没有交点？黎曼几何里面有：交点在无穷远。

椭圆曲线是一系列满足如下方程的点:

$y^2 = x^3 + ax + b,\ 4a^3 + 27b^2 \ne 0$

该方程被称作 椭圆曲线的 Weierstrass 方程。

### 基于椭圆曲线的群定义
在椭圆曲线的基础上，可以定义一个加法群：

+ 所有椭圆曲线上的点就是这个群里的元素
+ 单位元就是 0
+ 点 P 的逆元是点 P 相对 x 坐标的对称点
+ 加法：在椭圆曲线上，和一条直线相交的 3 个点 P, Q 和 R，三点相加满足 P + Q + R = 0。也就是说 椭圆曲线上两点相加的结果还在这条椭圆曲线上。

结合群的定义可以证明刚定义的这个加法群就是阿贝尔群：

+ 封闭性：因为椭圆曲线上的点相加还是椭圆曲线上的点
+ 结合律： P + (Q + R) = (P + Q) + R = 0
+ 单位元：单位元是 0
+ 逆元：一个椭圆曲线上的点 P 的逆元，是相对 x 坐标的对称点
+ 交换律：P + Q = Q + P


### 实数上椭圆曲线的加法计算
计算 $P + Q$ 的方法: 连接 $P$ 和  $Q$ 画一条直线，与椭圆曲线的另一个交点为 $R$，$P + Q$ 的结果就是 $R$ 的逆。（$P + Q + R = 0, P + Q = - R$）

### 标量乘法
简单方法：逐次相乘

快捷方法: 比如计算 $nP, n = 105$

因为 $n = 105_{(10)} = 10010111_{(2)} = 2^7 + 2^4 + 2^2 + 2^1 + 2^0$, 所以可以将 $P$ 反复乘2，按标志位加和。

### 有限域上的椭圆曲线

#### 逆元
扩展欧几里得定理

#### 点加
类比前面

#### 标量乘法
类比前面

#### 循环子群的阶
略

#### 寻找生成元
略

#### 离散对数问题
已知两个在 子群 上的点 $P$ 和 $Q = kP$，求解  $k$ 是非常困难的问题，目前没有多项式时间的求解算法。

<!-- 
## Assumptions
dis-log
    crypto
    distcomp
DDH
SDH
dan boneh 里面也有



## DH
+ Discrete Logarithm Problem
    * Computational Diffie-Hellman Problem
        - g, g^x, g^y -> g^{xy}
    * Decisional Diffie-Hellman Problem
        - g. 给定 g^x, g^y: g^{xy} looks like a random element in G.
        - hard to determine whether g^c = g^{xy}
* probabilistic polynomial time Turing machine
    + 概率多项式时间图灵机

 -->

## Simulation
### proofs based on simulation vs proofs based on games
基于游戏的定义更容易为其编写证明，但基于模拟的定义在获得安全性方面通常更清晰。

哪个更好？取决于实际情况。但模拟能提供组合下的安全性。这些组合定理可让您分析更大的协议，同时将子协议作为理想的功能调用。使问题得到简化。

通用的可组合性及其变体能提供并发组合下的安全性，不仅是同一协议的并发执行（因为在基于游戏的定义中通常也保证了这一点），还包括与其他任意协议的并发执行，而一般基于游戏的定义不能保证这一点。

独立的基于模拟的定义能提供顺序组合下的安全性，所以也很容易通过使用模块化顺序组合定理将协议插入更大的协议来证明大协议的安全性。


## Fiat-Shamir transform
+ the Fiat-Shamir heuristic
    + a technique for taking an interactive proof of knowledge and creating a digital signature based on it.
        + This way, some fact (for example, knowledge of a certain secret number) can be publicly proven without revealing underlying information.
        + For the method to work, the original interactive proof must have the property of being **public-coin**, i.e. verifier's random coins are made public throughout the proof protocol.
    + yields a non-interactive zero-knowledge argument in the random oracle model
        + **only secure in the random oracle model**.
+ **也就是说**
    + The Fiat-Shamir heuristic may also be viewed as converting a public-coin interactive proof of knowledge into a non-interactive proof of knowledgel (in random oracle model).
+ 怎么做
    + The Fiat-Shamir transformation takes an interactive public coin argument and replaces the challenges with the output of a cryptographic hash function.

### Public coin protocol
The verifier must show the prover all the random bits it uses in its computation. The result is that the verifier cannot "hide" anything from the prover, because the prover is powerful enough to simulate everything the verifier does if it knows what random bits it used. 

## [Pairing](/notes/crypto/pairing)
又叫 配对 或 双线性映射

## SNARG
![SNARG](/img/crypto/SNARG.jpg)

### ZKP 中为什么用了 Pairing？
如果只用 指数 和 取模来进行同态加密，只能支持一个加密的值和一个未加密的值相乘。引入了 Pairing 之后就可以实现加密值相乘。

## Paillier cryptosystem
Paillier 是一种原生支持加法同态的非对称加密体系。能同时支持 语义安全 (semantically secure) 和 加法同态 (additively homomorphic)；RSA 只能取其一。

* probabilistic public-key encryption
    * 概率公钥加密系统
+ Assumption:
    * The problem of computing n-th residue classes is believed to be computationally difficult. The decisional composite residuosity assumption is the intractability hypothesis upon which this cryptosystem is based.
    + 基于复合剩余类的困难问题
- partial homomorphic encryption scheme
    - 加法和数乘同态

## Semantic Security
> Any probabilistic, polynomial-time algorithm (PPTA) that is given the ciphertext of a certain message $m$ (taken from any distribution of messages), and the message's length, cannot determine any partial information on the message with probability non-negligibly higher than all other PPTA's that only have access to the message length (and not the ciphertext).

见到密文也不能获得更多信息。

和 香农 的 **perfect secrecy** 同义：
+ Perfect Secrecy
    + the ciphertext reveals no information at all about the plaintext
+ Semantic Security
    + implies that any information cannot be feasibly extracted

**indistinguishability** 则是一个 更简单易用的、等价的 notation。

## 应用题

### MPC communicarion channel
现有一个 MPC 协议，如果我不想被人窃听，该怎么办？

__答：__ 端到端加密

如果我要证明消息的完整性怎么办？

__答：__ 消息摘要

如果我要证明消息确实是我发的，且没有被篡改，我也不能抵赖说我没有发过呢？

__答：__ 数字签名

现在别人不能伪造消息了，如何防止别人重放呢？

__答：__ 加 nonce


### Sharding & Randomness Beacon
Sharding 协议中决定将节点分配至哪个 shard 时可能使用 Randomness Beacon，为什么 Randomness Beacon 需要满足:

+ unbias
    * 无法操纵自己加入哪个shard，否则就可以运行多个节点加入同一个shard，然后51。
+ unpredictable
    * 无法预测分配至哪个shard，否则就可以等到轮到那个shard时再加入，并提前和也加入那个shard的人串谋。

### ZKP proving time

给区块链设计 ZKP 协议时需要考虑验证的时间成本取舍，指的是什么？只讨论时间成本，不讨论空间和是否交互式等等。

__答：__ 不同算法中在 SNARK 和 虚拟机中 所需的验证时间不一样。比如 SHA256 是 EVM < SNARK，Pedersen Commitment 是 SNARK < EVM。

also see: https://ethresear.ch/t/gas-and-circuit-constraint-benchmarks-of-binary-and-quinary-incremental-merkle-trees-using-the-poseidon-hash-function/

## 密码学工程安全性

1. 下面这个检查密码是否相等的代码有什么问题？

```c
int
memcmp(const void *s1, const void *s2, size_t n)
{
    if (n != 0) {
        const unsigned char *p1 = s1, *p2 = s2;

        do {
            if (*p1++ != *p2++)
                return (*--p1 - *--p2);
        } while (--n != 0);
    }
    return (0);
}
```

__答：__ 非 constant-time：可通过执行的时间来推测有多少位相同，侧信道攻击。

2. 下面这个 RSA 快速幂取余算法的代码有什么问题？

```c
int PowerMod(int a, int b, int c)
{
    int ans = 1;
    a = a % c;
    while(b>0) {
        if(b % 2 == 1)
            ans = (ans * a) % c;
        b = b/2;
        a = (a * a) % c;
    }
    return ans;
}
```

__答：__ 非 constant-time：当b为奇数时会多执行下面的指令，执行的时间不一样，可被侧信道攻击。

3. 下面这个解密代码有什么问题？

```go
func main() {
    secret := getSecret()
    plainText := decrypt(cipherText, secret)
    fmt.Println(plainText)
}
```

__答：__ 密码使用完后一直放在内存中不主动清除。

在大多数操作系统上，一个进程所拥有的内存可以被另一个进程重用而不会被清除，比如因为第一个进程终止了或将内存退还给系统了。如果内存中包含秘密密钥，则这些密钥可被第二个进程访问到。在多用户系统上，这可以嗅探其他用户的密钥；即使在单用户系统中，也可能带来隐患。

像 Java、GoLang 这种带 GC 的就会比较尴尬，无法可靠地清除内存。