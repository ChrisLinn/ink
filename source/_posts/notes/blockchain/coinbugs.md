---
title: Coinbugs - 区块链代码实现中的常见漏洞
---

# Coinbugs - 区块链代码实现中的常见漏洞

由 [Whitepaper - Coinbugs: Enumerating Common Blockchain Implementation-Level Vulnerabilities](https://research.nccgroup.com/2020/03/26/whitepaper-coinbugs-enumerating-common-blockchain-implementation-level-vulnerabilities/) 翻译总结而来。

## 网络分割
网络分割有可能导致 **双花**。因为当网络重新统一时，其中一个网络的交易会被回滚，如果黑客能设法不让交易转发到原链就有可能实现双花。所以网络分割有可能是 **最重要** 的一种攻击向量。

### 不同客户端实现造成的网络分割
#### 原因
不同客户端实现有可能对区块验证的判断逻辑不同，进而导致网络分割。

本质上是客户端的 equivalence **同等性** 问题。

</br>

事实上，对一个协议的实现，实际上是对一个协议的一门方言 dialect 的实现

+ [Towards a formal theory of computer insecurity: a languagetheoretic approach](https://www.youtube.com/watch?v=AqZNebWoqnc)
+ Postel's law: "Be liberal in what you accept and conservative in what you send"

</br>

而且 Pieter Wuille 解释过，[实际的 consensus rules 事实上是不可知的](https://bitcoin.stackexchange.com/questions/54878/why-is-it-so-hard-for-alt-clients-to-implement-bitcoin-core-consensus-rules) (尤其是对于区块验证这种 context/state-dependent 的事情)。比如:

+ Uncompressed, compressed, hybrid public keys
    * bitcoin 原本的版本只支持 uncompressed。但事实上 当时普遍使用 openssl 进行验证，已经可以支持 compressed。
+ The BDB lock limit
    * [之前的设置当遇到一个有很多 inputs 的交易时会不够](https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki)。
    * 不过后来升级到 levelDB 就不需要考虑这个了。
+ 等等

</br>

__所以实现 同等性 很难。__

#### 例子

+ *geth* vs *Parity* state update 不同, [当 out-of-gas exception 时是否能成功 revert empty account deletions](https://blog.ethereum.org/2016/11/25/security-alert-11242016-consensus-bug-geth-v1-4-19-v1-5-2/)
+ 处理有问题的 `SIGHASH_SINGLE` 交易时, *bitcoin-ruby* 的实现是对的，但关键是 *bitcoin-core* 本身的实现是错的。(一些 edge case 可能一开始考虑不到)

个人觉得，就算是软分叉也会有这些问题。

#### 反思
文档作为 spec 其实是不够的，实际如何 implement 才最有可信力。

比如说 bitcoin 的代码才是最准确的文档。

如何尽量避免这类问题? 只能手把手比对源码, 设计 input tests, 甚至 cross-implementation fuzzing。

### 运行环境差异造成的网络分割
就算只有一种客户端实现, 运行环境不同也可能导致执行结果不同。(架构 32-bit vs 64-bit, 操作系统, 时间/地区设置, 配置...)。另外依赖的系统库版本也有可能不同（甚至没有固定住版本、开启了自动升级）。

#### 例子
比如说 bitcoin OpenSSL's ECDSA signature handling 就导致过两次共识问题:
<!-- % see last section? -->
+ [OpenSSL 1.0.0p / 1.0.1k incompatible, causes blockchain rejection](https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2015-January/007097.html)
    + ASN.1 是一个 序列化 抽象对象的标准，编码的标准包括 BER (Basic Encoding Rules), DER (Distinguised Encoding Rules), PER (Packed Encoding Rules) 等等。BER 编码结果不固定，DER 编码结果则固定。
    * OpenSSL 验证 ECDSA 签名的函数 `ecdsa_verify` 本来既接受 BER 又接受 DER，但从 [这个 commit](https://github.com/openssl/openssl/commit/85cfc188c06bd046420ae70dd6e302f9efe022a) 以后就只接受 DER 编码签名。（这是为了防止 [CVE-2014-8275](https://nvd.nist.gov/vuln/detail/CVE-2014-8275)，即防止 利用 BER 编码绕过黑名单。）
    * 问题是，如果一些节点升级了 OpenSSL 而另一些节点没有升级的话，就会导致网络分割：如果挖到了一个 BER-有效 但 DER-无效 的签名签的区块，升级之前的节点会认为该区块有效，升级之后的节点会拒绝掉这个区块。
+ [Disclosure: consensus bug indirectly solved by BIP66](https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2015-July/009697.html)
    + 第二次的事件虽然不是由于 OpenSSL 版本不同导致，但因为 ASN.1 BER 编码标准真的很复杂，而 OpenSSL 的 BER parser 在不同的平台 (Windows/Linux/MacOS and 32-bit/64-bit) 上会行为不一致，导致精心构造的 ECDSA 签名在不同的平台上有可能验证结果不一样，进而导致区块链分叉。

#### 反思
编写一个区块链客户端应该尽量避免受执行环境影响。

如何尽量避免这类问题?

+ 确保客户端使用固定版本的外部软件；
+ 正确处理32位和64位平台差异；
+ 正确处理对操作系统的系统调用的依赖；
+ 避免不同的区域设置对共识层代码的影响；
+ ...

### 区块 hash 投毒造成的网络分割
客户端处理区块时会在存储中查找之前见过的区块哈希，看这个区块是否也在之前见过。如果已经见过就认为这个区块之前被处理过，并丢弃这个区块。这是用来防止 p2p 网络（广播）造成的一个区块被处理多次的一种优化。

很重要的一点是，如果一个区块被校验认为无效并拒绝，它的 hash 也会被标记为已处理。那么如果一个恶意节点成功地在不改变区块 hash 的情况下使一个有效区块变得无效，那么这个区块 hash 到底对应的是那个有效的区块还是那个无效的区块就不可知了。

一个节点，不需要挖矿，可以监听网络中新挖出的区块并尝试快速地广播它的相同 hash 的但无效的变体来利用这个漏洞。这会导致其他先接收到这个无效区块的节点会拒绝掉后面真正有效的区块，而其他先接收到有效区块的节点则会正确地接受这个区块，导致网络分割。

上述分析讲述的是针对区块 hash 而言，对于交易 hash 也是同样的道理。

### 意外或未成熟的分叉导致的网络分割
新 PR 有可能改变 validation rule，或者改变了但自己不知道。

+ [bitcoin-cash-disclosure-04252018](https://github.com/mit-dci/cash-disclosure/blob/master/bitcoin-cash-disclosure-04252018.txt)
+ [BIP 50](https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki)

需要检查 client 做了什么可能会影响 consensus rules，以及底层调用库的升级有没有可能会影响 consensus rules。

</br>

如果真的升级，升级方式包括:
- Flagday cutover activation (User Activated Soft Fork, UASF)
- Miner signaled activation (Miner Activated Soft Fork, MASF)
    + BIP 34, BIP 9
- combined
    + BIP 8

也要保证 
+ Pre-activation legacy rules consistency
+ Post-activation updated rules consistency
    + 如 [ABC Bug Explained](https://old.reddit.com/r/btc/comments/bp1xj3/abc_bug_explained/) 提到 bitcoin cash 新引入 op_code 但忘了考虑 mempool

#### 反思
如何尽量避免这类问题?

仔细对比 旧结构、旧函数 有没有在 新代码 中被使用，或 新代码 有没有影响 旧的规则。

### Netsplit via branch confusion
#### 原因
处理临时分叉链时数据混了
#### 例子
+ [Security alert [Implementation of BLOCKHASH instruction in C++ and Go clients can potentially cause consensus issue – Fixed. Please update.]](https://blog.ethereum.org/2015/10/22/security-alert-implementation-of-blockhash-instruction-in-c-and-go-clients-can-potentially-cause-consensus-issue-fixed-please-update/)
+ [Where can I learn more about BIP30; namely the exploit and the background discussion?](https://bitcoin.stackexchange.com/questions/5903/where-can-i-learn-more-about-bip30-namely-the-exploit-and-the-background-discus/5905)

## 不正确的时间戳验证
+ 如果特意设为区块时间戳的 lower bound，在其将要过期的那一瞬间，可能被一些节点接受，但过一会才收到的别的节点会不接受，就会导致网络分割
    * 另外一个很有意思的攻击是，如果正好取了 maximal possible value 那就可以导致后续区块无法被添加
+ [Time Warp attack](https://bitcointalk.org/index.php?topic=43692.msg521772#msg521772)
+ [Time Jacking attack](http://culubas.blogspot.com/2011/05/timejacking-bitcoin_802.html)

## 整型数溢出漏洞
略

## Merkle 树实现漏洞
WIP

## 区块或交易处理时导致的存储资源耗尽
+ [狂发孤儿块](https://bitcointalk.org/index.php?topic=23266.0)
    * solved in [bbde1e99c89392](https://github.com/bitcoin/bitcoin/commit/bbde1e99c89392)
+ 狂挖上古区块的分叉
+ [July 2015 flood attack](https://en.bitcoin.it/wiki/July_2015_flood_attack)
+ [CVE-2012-3789](https://en.bitcoin.it/wiki/CVE-2012-3789)

## 区块或交易处理时导致的 CPU 资源耗尽
+ [CVE-2012-3789](https://en.bitcoin.it/wiki/CVE-2012-3789#Patching_vulnerability_2)
+ [CVE-2010-5138](https://en.bitcoin.it/wiki/Common_Vulnerabilities_and_Exposures#CVE-2010-5138)
    * [New Bitcoin vulnerability: A transaction that takes at least 3 minutes to verify](https://bitcointalk.org/?topic=140078)
+ [New quadratic delays in Bitcoin scripts](https://bitslog.com/2017/04/17/new-quadratic-delays-in-bitcoin-scripts/#comment-13027)
+ [A Bitcoin transaction that takes 5 hours to verify](https://bitslog.com/2017/01/08/a-bitcoin-transaction-that-takes-5-hours-to-verify/)
+ [Denial of Service via Algorithmic Complexity Attacks](https://www.cs.auckland.ac.nz/~mcw/Teaching/refs/misc/denial-of-service.pdf) 中也有很多例子

## P2P 网络贷款耗尽/spam
+ [CVE-2013-4627](https://www.cvedetails.com/cve/CVE-2013-4627/)
    * [Buggy CVE-2013-4627 patch, open new vectors of attack](https://bitcointalk.org/index.php?topic=258770.0;prev_next=prev)

### Mitigations
+ 反序列化时丢弃垃圾数据
+ 消息大小限制
+ 消息在 relay 之前应该先反序列化加序列化再发送出去