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


#### 阿贝尔群 (Abelian group) 
满足交换律，故阿贝尔群又叫交换群 (commutative group)。

#### 循环群 (cyclic group)
存在一个元素  $g$ (生成元，generator)，群中所有元素都可以由生成元的幂运算获得。

#### 循环群 vs 阿贝尔群
循环群都是阿贝尔群，不是所有的阿贝尔群都是循环群。

#### 子群
一个群的非空子集，若在同样的运算下也构成一个群，则称之为这个群的子群。

### 环 (ring)
具有两个二元操作（加法和乘法）的一个集合。

满足:

+ 加法结合律
+ 加法交换律
+ 加法单位元
+ 加法逆元
+ 乘法结合律
+ 分配率

环在加法操作下是个阿贝尔群。

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

### secp256k1 不如 Curve25519 安全，那为什么比特币还用 secp256k1?
因为那时候 Curve25519 还没出世。

### 椭圆曲线 secp256k1 与 secp256r1

曲线 secp256k1 的名字来自于密码学标准文档 [SEC2](https://www.secg.org/sec2-v2.pdf) , 其中 “sec” 是 “Standards For Efficient Cryptography” 缩写, “p” 表示椭圆曲线参数定义在 有限域 $\mathbb{F}_p$ 上, “256” 表示该有限域中元素的比特长度为 256, “k” 表示这是一条 Koblitz 曲线, 而 “1” 表示这是满足前述条件的第一条 (实际上也是唯一的) 推荐的曲线.

Koblitz 曲线在密码学文献中通常指代定义在特征为 2 的有限域上 $\mathbb{F}_{2^m}, m \in \mathbb{Z}$ 的椭圆曲线, [Gallant, Lamber 和 Vanstone1 在 CRYPTO 2001 的论文](https://www.iacr.org/archive/crypto2001/21390189.pdf) 中泛化了 Koblitz 曲线的含义, 也包括定义在大素数上 $\mathbb{F}_p$ 上具备高效可计算自同态特性的椭圆曲线。

自同态映射可以加速 ECDSA 签名验证过程。

### ECDSA 签名机制应用中的安全隐患
1. 如果 k 值泄露, 则任何知道该随机数值的人可以使用该随机数产生签名值恢复私钥
2. 用相同私钥和 k 对两个消息进行签名, 则任何人都可以通过两个签名值恢复出私钥
    + 由于安全的随机数发生器实现的困难性与程序员正确使用随机数的困难性, 业界由随机产生 k 逐渐切换为利用 [RFC 6979](https://tools.ietf.org/html/rfc6979) 中推荐的方式
    + RFC 6979 中通过利用待签名消息 m 和私钥 d 等信息给出了一种确定性派生 k 的方式
3. 两个用户使用相同的 k 分别对不同的消息进行签名, 则任一方可推算出对方的私钥
    + 由于安全的随机数发生器实现的困难性与程序员正确使用随机数的困难性, 业界由随机产生 k 逐渐切换为利用 [RFC 6979](https://tools.ietf.org/html/rfc6979) 中推荐的方式
    + RFC 6979 中通过利用待签名消息 m 和私钥 d 等信息给出了一种确定性派生 k 的方式
4. 相同私钥和 k 同时用于 ECDSA 签名和 Schnorr 签名时, 任何人都能够恢复出私钥
5. ECDSA 签名值的可锻造性
    + 交易 ID 的不唯一会导致根据交易 ID 追踪交 易状态时出现安全隐患. 假设追踪的是携带签名值 σ 的交易的 ID, 而上链的交易中包含的 σ ′ (具有不同的交易的 ID), 则在数字货币交易所处理用户的提币操作时, 当一笔提币已经成功时, 根据交易 ID 进行交易状态跟踪的业务逻辑会认为提币操作失败. 倘若还设置了超时重试机制, 会导致交易所资产的损失。
6. 签名值通常采用的 DER 编码由于编码值并不唯一也会造成区块链网络的分裂
7. 不需要提供签名消息的情况下, 任何人可以根据任意签名值伪造对应私钥的签名值
    + Craig Wright (澳本聪) 曾经利用此原理通过伪造 Satoshi Nakamoto 的签名值, 进而宣称自己为中本聪

### ECDSA 签名机制可以根据签名推算出公钥
进而减少交易体积（不需要存公钥）。ETH 中这么干了，BTC 没这么干。

### 为什么说 ECDSA 签名 不是 deterministics 的?
签名算法里面有个 随机数k，每次签出来的名可能不一样

### EdDSA
由上面的 ECDSA 签名机制应用中的安全隐患 说明不够安全， 虽然 自同态映射可以加速 ECDSA 签名验证过程，但也说明不是天然就是快。

EdDSA (Edwards-curve Digital Signature Algorithm) 签名机制是这个研究方向上的成果. EdDSA 签名机制是定义在 Edwards25519 曲线上的变种 Schnorr 签名, 其设计初衷是在不牺牲安全性的前提下提升签名/验签速度, 并同时解决前述的 ECDSA 在应用方面存在的一些问题。

广泛使用的 EdDSA 签名机制是基于哈希函数 SHA-512 和椭圆曲线 Edwards25519 的 Ed25519 签名机制。 扭曲爱德华曲线 Edwards25519 双向有理等价于蒙哥马利曲线 Curve25519, 提供大约 128 比特的安全强度 (与 secp256k1 和 secp256r1 安全强度一致)。

Curve25519 是 Bernstein7 在 2005 年为了提升 ECDH 密钥交换协议 (Elliptic Curve Diffie-Hellman Key Agreement) 效率而提出的蒙哥马利曲线

在 2005 年的论文中 Curve25519 实际上用来指代 ECDH 密钥交换协议, 然而后来多使用 Curve25519 指代底层的椭圆曲线, 用 X25519 指代基于 Curve25519 的 ECDH 密钥协议

Curve25519 是基于素数域 $\mathbb{F}_q, q = 2^{255} - 19$ 上的蒙哥马利曲线.
Curve25519 曲线双向有理等价于 (Bira-tional Equivalent) 扭曲爱德华曲线 (Twisted Edwards Curves) Edwards25519. 而这条扭曲爱德华曲线则同构于 (Isomorphic) 爱德华曲线 (Edwards Curves) untwisted-Edwards25519。

**X25519 直接构建在 Curve25519** 之上, 而 **Ed25519 构建在 Edwards25519** 之上, 并且 Curve25519 和 Twisted-Edwards25519 是双向有理等价的。 这是因为 ECDH 协议和 EdDSA 协议计算过程中重度依赖的点群运算不同, 这是为更好的适配的上层协议而刻意选择的中层的椭圆曲线点的表示的结果。

#### 蒙哥马利曲线与爱德华曲线
secp256k1/secp256r1 的 Short Weierstrass 形式的椭圆曲线表示: $y^2 = x^3 + ax + b$

蒙哥马利曲线: $Y^2 = X^3 + AX^2 + X$

爱德华曲线: $x^2 + y^2 = 1  + d x^2 y^2$。
2008 年 Bernstein 等人指出有限域上只有一小部分椭圆曲线能够表示为爱德华曲线, 并进一步提出了更为广义的扭曲爱德华曲线 (Twisted Edwards Curves)。

扭曲爱德华曲线: $-X^2 + Y^2 = 1 - d X^2 Y^2$

Short Weierstrass, 蒙哥马利曲线以及爱德华曲线都可以通过符号代换与广义 Weierstrass 曲线 $y^2 + a_1 xy + a_3 y = x^3 + a_2 x^2 + a_4 x + a_6$ 相互转换。

X25519 和 Ed25519 的做依赖的点的运算都可以转换成为 Weierstrass 曲线上的点运算, 然而使用特定的曲线形式, 对于高效安全的 X25519 或者 Ed25519 大有裨益. 以 twist-Edwards25519 为例, 其上的点的加法运算是完备的 (Complete)，并且单位元为点 (0, 1)， 简洁优雅。且构造椭圆曲线的加法点群时无需引入一个假想的无穷远点来满足群的条件。相比之下，Short Weierstrass 形式下椭圆曲线点加运算则需进行各种边界条件判断。

Edwards25519 是定义在有限域 $\mathbb{F}_q, p = 2^{255} - 19$ 上选用参数 $a = -1, d = \frac{121665}{121666}$ 的扭曲爱德华曲线: $-x^2 + y^2 \equiv 1 - (121665/121666)x^2 y^2 \mod p$

EdDSA 签名机制的优势:

+ 在多种计算平台上都能达到较高的性能; 
+ 签名过程中不需要唯一的随机数,能够避免随机数引发的安全问题; 
+ 对于侧信道攻击等具有更好的免疫效果; 
+ 公钥和签名值都较小 (Ed25519 公钥为 32 个字节, 签名值为 64 字节); 
+ 计算公式是完备 (Complete), **无需对不相信的点执行点的验证操作**; 
+ EdDSA 能抵抗碰撞, 底层哈希函数的碰撞不会破坏 EdDSA 签名机制 (PureEdDSA). 

#### X25519
X25519 是在 Curve25519 上的 **仅基于 x 坐标** 的 ECDH 密钥协议。

__TODO:__ ECDH 的实际部署中需要着重考虑的是对接收到的消息的检查. 

### ECDSA 与 Ed25519 有什么区别与联系?
没有联系，虽然都是椭圆曲线上的。Ed25519 属于 EdDSA，但是 ECDSA 与 EdDSA 也没有关系。ECDSA 是一个又慢又不够安全的过时设计，EdDSA 是一个 更快更安全的现代设计。

## Bitcoin 钱包体系
TODO:

https://github.com/longcpp/CryptoInAction/blob/master/bitcoin-hd-wallet/191210-bitcoin-wallet.pdf

## Simulation
### proofs based on simulation vs proofs based on games
基于游戏的定义更容易为其编写证明，但基于模拟的定义在获得安全性方面通常更清晰。

哪个更好？取决于实际情况。但模拟能提供组合下的安全性。这些组合定理可让您分析更大的协议，同时将子协议作为理想的功能调用。使问题得到简化。

通用的可组合性及其变体能提供并发组合下的安全性，不仅是同一协议的并发执行（因为在基于游戏的定义中通常也保证了这一点），还包括与其他任意协议的并发执行，而一般基于游戏的定义不能保证这一点。

独立的基于模拟的定义能提供顺序组合下的安全性，所以也很容易通过使用模块化顺序组合定理将协议插入更大的协议来证明大协议的安全性。

## Pairing
又叫 配对 或 双线性映射

### ZKP 中为什么用了 Pairing？
如果只用 指数 和 取模来进行同态加密，只能支持一个加密的值和一个未加密的值相乘。引入了 Pairing 之后就可以实现加密值相乘。


## Paillier
Paillier 是一种原生支持加法同态的非对称加密体系。能同时支持 语义安全 (semantically secure) 和 加法同态 (additively homomorphic)；RSA 只能取其一。

semantically secure: 见到密文也不能获得更多信息。
Any probabilistic, polynomial-time algorithm (PPTA) that is given the ciphertext of a certain message {\displaystyle m}m (taken from any distribution of messages), and the message's length, cannot determine any partial information on the message with probability non-negligibly higher than all other PPTA's that only have access to the message length (and not the ciphertext).
This concept is the computational complexity analogue to Shannon's concept of **perfect secrecy**. Perfect secrecy means that the ciphertext reveals no information at all about the plaintext, whereas semantic security implies that any information.
Then it turns out that there is a simpler notion - indistinguishability - that is equivalent to semantic security. This notion is easier to work with, so everyone uses that one, to the extent that semantic security is often identified with indistinguishability.



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