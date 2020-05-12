---
title: E某DSA
---

# E某DSA
整理自 [Crypto In Action](https://github.com/longcpp/CryptoInAction)

ElGamal 签名机制是在椭圆曲线密码学诞生之前提出的, 签名值较大。Schnorr 提出了可以看做是 ElGamal 签名机制变种的 Schonrr 签名机制, 大大缩短签名值的长度。而数字签名算法 DSA 是吸收了 Schnorr 签名设计思想的另一种 ElGamal 签名机制的变种签名机制。基于椭圆曲线的 DSA 方案即为熟知的 ECDSA。

## ECDSA
### 椭圆曲线 secp256k1 与 secp256r1
曲线 secp256k1 的名字来自于密码学标准文档 [SEC2](https://www.secg.org/sec2-v2.pdf) , 其中
+ “sec” 是 “Standards For Efficient Cryptography” 缩写
+ “p” 表示椭圆曲线参数定义在 有限域 $\mathbb{F}_p$ 上
+ “256” 表示该有限域中元素的比特长度为 256
+ “k” 表示这是一条 Koblitz 曲线
    + Koblitz 曲线在密码学文献中通常指代定义在特征为 2 的有限域上 $\mathbb{F}_{2^m}, m \in \mathbb{Z}$ 的椭圆曲线
        + [Gallant, Lamber 和 Vanstone1 在 CRYPTO 2001 的论文](https://www.iacr.org/archive/crypto2001/21390189.pdf) 中泛化了 Koblitz 曲线的含义, 也包括定义在大素数上 $\mathbb{F}_p$ 上具备高效可计算自同态特性的椭圆曲线。
            + 自同态映射可以加速 ECDSA 签名验证过程。
+ “1” 表示这是满足前述条件的第一条 (实际上也是唯一的) 推荐的曲线.


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
    + 交易 ID 的不唯一会导致根据交易 ID 追踪交 易状态时出现安全隐患.
        * 假设追踪的是携带签名值 σ 的交易的 ID, 而上链的交易中包含的 σ ′ (具有不同的交易的 ID), 则在数字货币交易所处理用户的提币操作时, 当一笔提币已经成功时, 根据交易 ID 进行交易状态跟踪的业务逻辑会认为提币操作失败. 倘若还设置了超时重试机制, 会导致交易所资产的损失。
6. 签名值通常采用的 DER 编码由于编码值并不唯一也会造成区块链网络的分裂
7. 不需要提供签名消息的情况下, 任何人可以根据任意签名值伪造对应私钥的签名值
    + Craig Wright (澳本聪) 曾经利用此原理通过伪造 Satoshi Nakamoto 的签名值, 进而宣称自己为中本聪

### ECDSA 签名机制可以根据签名推算出公钥
进而减少交易体积（不需要存公钥）。ETH 中这么干了，BTC 没这么干。

### 为什么说 ECDSA 签名 不是 deterministics 的?
签名算法里面有个 随机数k，每次签出来的名可能不一样

### secp256k1 不如 Curve25519 安全，那为什么比特币还用 secp256k1?
因为那时候 Curve25519 还没出世。

## EdDSA
由上面的 ECDSA 签名机制应用中的安全隐患 说明不够安全， 虽然 自同态映射可以加速 ECDSA 签名验证过程，但也说明不是天然就是快。

EdDSA (Edwards-curve Digital Signature Algorithm) 签名机制是这个研究方向上的成果. 

EdDSA 签名机制是定义在 **Edwards25519 曲线上的变种 Schnorr 签名**, 其设计初衷是在不牺牲安全性的前提下提升签名/验签速度, 并同时解决前述的 ECDSA 在应用方面存在的一些问题。

广泛使用的 EdDSA 签名机制是基于哈希函数 SHA-512 和椭圆曲线 Edwards25519 的 Ed25519 签名机制。

### Curve25519 vs Edwards25519
Curve25519 是 Bernstein7 在 2005 年为了提升 ECDH 密钥交换协议 (Elliptic Curve Diffie-Hellman Key Agreement) 效率而提出的蒙哥马利曲线

在 2005 年的论文中 Curve25519 实际上用来指代 ECDH 密钥交换协议, 然而后来多使用 Curve25519 指代底层的椭圆曲线, 用 X25519 指代基于 Curve25519 的 ECDH 密钥协议

**X25519 直接构建在 Curve25519** 之上, 而 **Ed25519 构建在 Edwards25519** 之上, 并且 Curve25519 和 Twisted-Edwards25519 是双向有理等价的。
这是因为 ECDH 协议和 EdDSA 协议计算过程中重度依赖的点群运算不同, 这是为更好的适配的上层协议而刻意选择的中层的椭圆曲线点的表示的结果。

Curve25519 是基于素数域 $\mathbb{F}_q, q = 2^{255} - 19$ 上的蒙哥马利曲线.

Curve25519 曲线双向有理等价于 (Bira-tional Equivalent) 扭曲爱德华曲线 (Twisted Edwards Curves) Edwards25519. 而这条扭曲爱德华曲线则同构于 (Isomorphic) 爱德华曲线 (Edwards Curves) untwisted-Edwards25519, 提供大约 128 比特的安全强度 (与 secp256k1 和 secp256r1 安全强度一致)。

### 椭圆曲线表示
secp256k1/secp256r1 的 **Short Weierstrass** 形式的椭圆曲线表示: $y^2 = x^3 + ax + b$

**蒙哥马利曲线**: $Y^2 = X^3 + AX^2 + X$

**爱德华曲线**: $x^2 + y^2 = 1  + d x^2 y^2$。

2008 年 Bernstein 等人指出有限域上只有一小部分椭圆曲线能够表示为爱德华曲线, 并进一步提出了更为广义的扭曲爱德华曲线 (Twisted Edwards Curves)。

**扭曲爱德华曲线**: $-X^2 + Y^2 = 1 - d X^2 Y^2$

Short Weierstrass, 蒙哥马利曲线以及爱德华曲线都可以通过符号代换与 **广义 Weierstrass 曲线** $y^2 + a_1 xy + a_3 y = x^3 + a_2 x^2 + a_4 x + a_6$ 相互转换。

X25519 和 Ed25519 的做依赖的点的运算都可以转换成为 Weierstrass 曲线上的点运算, 然而使用特定的曲线形式, 对于高效安全的 X25519 或者 Ed25519 大有裨益. 以 twist-Edwards25519 为例, 其上的点的加法运算是完备的 (Complete)，并且单位元为点 (0, 1)， 简洁优雅。且构造椭圆曲线的加法点群时无需引入一个假想的无穷远点来满足群的条件。相比之下，Short Weierstrass 形式下椭圆曲线点加运算则需进行各种边界条件判断。

**Edwards25519** 是定义在有限域 $\mathbb{F}_q, p = 2^{255} - 19$ 上选用参数 $a = -1, d = \frac{121665}{121666}$ 的扭曲爱德华曲线: $-x^2 + y^2 \equiv 1 - (121665/121666)x^2 y^2 \mod p$

### EdDSA 签名机制的优势:
+ 在多种计算平台上都能达到较高的性能; 
+ 签名过程中不需要唯一的随机数,能够避免随机数引发的安全问题; 
+ 对于侧信道攻击等具有更好的免疫效果; 
+ 公钥和签名值都较小 (Ed25519 公钥为 32 个字节, 签名值为 64 字节); 
+ 计算公式是完备 (Complete), **无需对不相信的点执行点的验证操作**; 
+ EdDSA 能抵抗碰撞, 底层哈希函数的碰撞不会破坏 EdDSA 签名机制 (PureEdDSA). 

### X25519
#### 仅基于 x 坐标

X25519 是在 Curve25519 上的 **仅基于 x 坐标** 的 ECDH 密钥协议。

仅利用椭圆曲线点的 x 坐标构建 ECDH 的想法最初来自于 Victor Miller 在 1985 年发表的奠基性文章 ["Use of elliptic curves in cryptography"](https://link.springer.com/content/pdf/10.1007/3-540-39799-X_31.pdf)

#### 临时公钥点的检查
ECDH 的实际交互过程部署中需要着重考虑对接收到的 **临时公钥点的检查**, 否则 可能导致私钥被盗。(见 [Hankerson, Darrel, Alfred J. Menezes, and Scott Vanstone. ”Guide to elliptic curve cryptography.” Computing Reviews 46, no. 1 (2005): 13] 中 4.3 小节):
+ 收到的点不是无穷远点
    * small subgroup 攻击
        - X25519 实现中已经考虑了 small subgroup 攻击
            + Curve25519 曲线的余因子为 8
                * 将最低 3 比特清零
                * 保证私钥值是 8 的倍数
+ 点的坐标是底层素数域的中的元素并且确实是椭圆曲线方程上的点
    * invalid-curve 攻击

</br>

X25519 (相比其他的 ECDH) 引入了扩域上的椭圆曲线点群使所有的 $x \in \mathbb{F}_p$ 都是合法的公钥，__省去__ 繁重的公钥合法性验证。
</br>

[X25519 中可以不验](https://cr.yp.to/ecdh.html):
+ tendermint 中出问题是因为 Handshake Malleability，忘了校验 消息摘要 并 abort，中间人可以注入低阶临时公钥, 则 X25519 密钥协商得到的值 $g^{xy}$ 会是全零的值 (见上述 将最低 3 比特清零), 导致中间人攻击
- TLS 1.3 和 Noise 协议中做了

#### 常量时间实现
X25519 对 **常量时间** 实现非常友好:
+ 非 constant time 可能泄露私钥信息 (侧信道攻击)
    * 椭圆曲线点群运算的常量时间是非常困难的
        * 而对特定实现添加侧信道防护通常会显著降低代码的执行速度
* [但 X25519 也不是完全防侧信道攻击](https://infoscience.epfl.ch/record/223794/files/32_1.pdf)

## Curve25519/Edwards25519 余因子 (Cofactor) 问题
与 secp256k1/secp256r1 等曲线的私钥可以在某个区间内连续取值 (整数值) 不同, 曲线 Curve25519 上的私钥并 **不是某个区间内的连续取值**, 这是为了规避余因子不为 1 可能引发的安全隐患, 但同时也部分影响了曲线的应用方式, 尤其是当希望在 Ed25519 签名算法上实现 **BIP-32** 时

另外余因子为 8 导致 CryptoNote 协议中构建 RingCT 交易时引入了安全漏洞 (secp256r1/secp256k1 曲线的余因子为 1 故无此隐患) 导致双花。Edwards25519 本用于 EdDSA，被 Monero 挪作他用 (XEdDSA) 。

是否存在方法能够既享用 Curve25519/Edwards25519 的优势, 又能够解放上层密码协议的设计?
+ Mike Hamberg 提出的 **Decaf** 方法 能够在特定条件下从余因子为 **4** 的非素数阶的点群上” 萃取” 出素数阶的点群.
    + 无法直接应用于 Curve25519/Edwards25519 因它们余因子为 8
        * Isis Agora Lovecruft 和 Henry de Valence 提出 **Ristretto** 技术通过扩展 Decaf 技术可以从余因子为 **8** 的非素数阶点群萃取出素数阶点群
            * 作用于 Curve25519 得到的素数阶点群记为 ristretto255

## ECDSA 与 Ed25519 有什么区别与联系?
没有联系，虽然都是椭圆曲线上的。Ed25519 属于 EdDSA，但是 ECDSA 与 EdDSA 也没有关系。ECDSA 是一个又慢又不够安全的过时设计，EdDSA 是一个 更快更安全的现代设计。
