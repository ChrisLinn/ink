# (Ideal) Class Group, 类群

<!-- 

+ https://www.michaelstraka.com/posts/classgroups/
+ https://hackmd.io/@olivierbbb/r10VpNPZU
+ https://github.com/Chia-Network/vdf-competition/blob/master/classgroups.pdf
+ https://crypto.stanford.edu/pbc/notes/
+ https://blog.goodaudience.com/deep-dive-on-rsa-accumulators-230bc84144d9

 -->

## class group 作用

（__虚二次数域__, Imaginary Quadratic Number Fields 的）__类群__ 在区块链和零知识证明里是常用工具。

+ 用累加器来替代 merkle tree。可用于高效存储查找删除元素，节省区块体积。
+ 对 __Proof of exponantiation__, __Polynomial commitment__ (zkSNARK Marlin 协议中有使用), __VDF__, __Encryption scheme__ 也有用。

## 为什么代数论会和密码学有关？

在密码学应用中，__类群__ 可被用作 __未知阶的群__ (groups of unknown order, __GUO__)。[且不需要 trusted setup。](https://twitter.com/zmanian/status/1050784271852539904)

__GUO__ 在构建 __VDF__ 和 __Cryptographic Accumulators__ (密码学累加器) 时，也有被作为替代考虑方案。
也可以作为 __polynomial commitment schemes__ 的 target groups.

__RSA 群__ (RSA groups) ![](http://latex.codecogs.com/gif.latex?(\Bbb{Z}/N\Bbb{Z})^\times) 
提供了 __GUOs__ 的一个替代家族。

+ ![](http://latex.codecogs.com/gif.latex?N=pq)，是两个大素数的乘积。
+ 计算它们的 __order__ 等同于对 ![](http://latex.codecogs.com/gif.latex?N=pq) 分解质因数，但这很难。


然而，生成 RSA 模数 (moduli) ![](http://latex.codecogs.com/gif.latex?N=pq) 要么需要一个可信方,要么就要进行一个复杂的MPC协议。

+ 需要可信方的原因是: 要生成两个大素数 ![](http://latex.codecogs.com/gif.latex?p) , ![](http://latex.codecogs.com/gif.latex?q), 它们的乘积 ![](http://latex.codecogs.com/gif.latex?N=pq), 并且还要相信这个可信方会删除 ![](http://latex.codecogs.com/gif.latex?p) 和 ![](http://latex.codecogs.com/gif.latex?q).

生成 __类群__ ![](http://latex.codecogs.com/gif.latex?\mathcal{Cl}(d)) 则 [只需要](https://mathoverflow.net/questions/16098/complexity-of-testing-integer-square-freeness) generating large negative square free public integers $d$. Taking $d=-p$ for a large prime $p$ is a viable option.

+ 这里指的是 __虚二次数域__ ![](http://latex.codecogs.com/gif.latex?K=\Bbb{Q}(\sqrt{d}), d<0) 的 __类群__


## class group 精髓

1