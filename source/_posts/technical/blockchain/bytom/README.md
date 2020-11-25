# Bytom

## 我在比原的工作

+ bytom
    * 可以看看 release notes
        - 实现 set-mining-address & set-coinbase-arbitrary 等挖矿相关功能 
    * PoW 相关完善及优化
        + 优化tensority
            * go 920ms -> go 820ms -> simd 160ms -> cuda 6ms
        + get work 定时更新变为出块即更新，更加及时
    - [x] consume newBlockCh for vault_mode
        + 被马总解决了
    - block_recommit 交易数据及时入块
        + 其实就是用 map
        + ticker 定期生成 NewBlockTemplate，因为 新添交易的话 commitment 会改变，blockheader 也会改变，不用 map 的话，submit work不对应
        + 老 map 要注意 GC
    - 实现 stratumn miner，cpu 版本和 gpu 版本
    - 节点 solo mining 集成显卡挖矿算法
    - 全局交易索引
+ Precogs
    * 负责先知节点计划，进行比原网络中的节点发现和状态统计
    * 涉及 P2P
    * vapor Precogs
        + TODO
            * decide check_height("best best_height" - "confirmations")
            * get blockhash by check_height
+ 中心化钱包
    * api & database schema
    * build tx
        - utxo >21 build fail
        - retire类型交易 utxo 是否忘了处理。应该变成不可用。
    * fee estimate
    * multisign
        - [ ] delete unconfirmed utxo
        - [ ] 调研if txProposalSign.Signatures == "" {是否可以去除
    * all utxos
        - check `utxo.Asset.Asset` in `btm.go`
        - raw sql
        - address str for address
    * 关于null的索引不生效的传说是真的么?
        - 应尽量避免在 where 子句中对字段进行 null 值判断，否则将导致引擎放弃使用索引而进行全表扫描
        - https://www.v2ex.com/t/60437
        - https://dev.mysql.com/doc/refman/5.7/en/is-null-optimization.html
    * TEXT
        - varchar 是可变长字符串,不预先分配存储空间,长度不要超过 5000,如果存储长度大于此值,定义字段类型为 text ,独立出来一张表,用主键来对应,避免影响其它字段索引效率。
        - 定长，累积很占空间
        - utxo use hash for cp? 
        - server-side max exec time
        - https://dev.mysql.com/doc/refman/8.0/en/full-text-adding-collation.html
    * redis
    * MOV DEX
        - Cancel order? what about data_witness?
+ vapor
    * 设计跨链交易
    * 设计federation模块
        * https://github.com/nsqio/nsq
        * etcd raft
        * build
            - 使用 builder template
                + 是否需要区分 vapor 和 bytom？
                + signInst
                    * 我觉得 根本就不需要 signInsts
                    * 那么 数据库里面存什么呢
                    * signs 还是可以存， 但是 inst没必要
                    * 自己 打字，自己-自己聊天, 梳理思路
    + 充值提现手续费闭环
        * 侧链可改造成手续费使用非 btm
        * 充值收取一定 btm，提现时可以用
    * https://btcpayserver.org/
        - https://github.com/btcpayserver
+ TSS
    * https://github.com/Bytom/ofmf/pull/539/files
* KMS
    - 量化委托
    - https://learn.hashicorp.com/vault
    - [Universal Private Key Management for Cryptocurrencies](https://github.com/ChrisLinn/chrislinn.ink/tree/master/assets/Universal+Private+Key+Management+for+Cryptocurrencies-draft23.pdf)
    - 互联网企业安全架构建设
    - github
        + https://github.com/hashicorp/vault
        - https://github.com/bitwarden
        - https://github.com/btcpayserver/BTCPayServer.Vault
        - https://github.com/binance-chain/DexVault
    * audit
        - https://www.quarkslab.com
        - https://www.kudelskisecurity.com
        - https://www.trailofbits.com
        - https://www.x41-dsec.de/
        - http://nccgroup.com/
        - consensys
            + https://diligence.consensys.net/
        - cure53
        - Least Authority
            + https://leastauthority.com/
        - chainsecurity
        - https://abdk.consulting/
    * Notary: A Device for Secure Transaction Approval 
        - http://delivery.acm.org/10.1145/3360000/3359661/p97-athalye.pdf?ip=49.127.13.214&id=3359661&acc=OA&key=4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E959AAFAD2A5E8B5F&__acm__=1573089226_826c06c4ff788d06e38e76c6e969980b
    * DECIM, detect the leakage of private keys for secure messaging
        - There might be a potential approach to combat the backdoor, namely the post-compromise cryptography i.e. the misuse of private keys can be detected and the system may be self-destroyed

<!-- 

## 下版本
+ 应该区分用户提交的业务形态的交易（并在数据库中存一份）和提交的 raw tx。
++ 这么做也有利于展示交易被回滚的情况，以告知用户。不然用户发了一笔交易，发生回滚就突然不见了。
+ utxo 现在是单纯的 10 min lock_until，而 unconfirmed tx 现在又不更新 utxo，应该设置长一点防止 出块超过 10min（现在这种情况在主网上还是很可能出现的）。这样可能导致间隔 10min 的两笔交易用了同样的 utxo，都能submit成功，但最终矿工只打包一个，用户莫名丢失了一笔交易但我们却没能提示。
++ 这块要好好再设计，不能等入块了才解锁，不然如果一直不上链就永远锁住了。应该做成 submit 给 bytomd 就锁住，入块了就设置is_spend，如果一直没入块后面 expired 了才解锁utxo 。做好 utxo 和 balance 的删除/更新。
++ 最好还是加上判断确认数（5～6次）才能进行花费 。
+ 应该区分 未确认交易 导致的 available balance 和 total balance
+ asset 价格 redis  查不到 应该重新拿，而不是查 mysql。asset 价格不放数据库。
+ sql IN 语句是否存在性能问题，是否用 数字型 而非字符串 加快查询
+ api 不应该和 bytomd 交互，应该做一个 channel/callback/mq 给 updater 或者 load balancer，统一和 bytomd 进行交互（即 所有和bytomd 的交互应该是一个统一的出入口）
++ bytomd 目前是单节点 没有 load balancing，应该做上以免 submit tx 造成的 ddos 或别的原因造成的不可用
+++ bytomd load balancing 要注意节点状态不一致的处理，从哪个节点同步数据。拿块可以通过判断最高高度，问题主要是 ws 去哪个节点拿 tx -->

<!-- 
## mining pool

+ MinDiff
+ DiffType
+ GetTargetHex
+ leading zero
+ retarget
+ processShare
    + s.hashrateExpiration, 
    + s.minuteHashrateExpiration
+ shareTimeRing

## Tensority  
### research
+ mulMatrix
    * __blas__
        - openblas
            + parameters tweaking
        - single type blas?
    * simd
        - __golang simd__
            + https://github.com/bjwbell/gensimd
            + https://github.com/mengzhuo/intrinsic
            + https://github.com/yesuu/simd/blob/master/mul_amd64.s
            + https://github.com/rkusa/gm
            + https://github.com/Everlag/goSIMD
            + https://www.google.com/search?q=go+simd&oq=go+simd&aqs=chrome..69i57j0l5.2290j0j7&sourceid=chrome&ie=UTF-8
            + https://www.google.com/search?q=yeppp&oq=yeppp&aqs=chrome..69i57j69i61j0l4.289j0j4&sourceid=chrome&ie=UTF-8
            + https://yushuangqi.com/blog/2016/go-ru-he-shi-yong--simd-zhi-ling.html
                * https://github.com/golang/go/blob/master/src/cmd/internal/obj/x86/asm6.go
            + https://www.cryptologie.net/article/406/simd-instructions-in-go/
            + https://golanglibs.com/top?q=simd
            + https://godoc.org/github.com/slimsag/rand/simd
            + https://github.com/sbinet/vector
            + https://github.com/reiver/go-float64x4
            + https://github.com/pennello/go_swar
            + should able to use int, save time for float64 conversion
        - cpp simd
        - gpu simd
    * opencv
    * cuda
        - https://archive.fosdem.org/2014/schedule/event/hpc_devroom_go/attachments/slides/486/export/events/attachments/hpc_devroom_go/slides/486/FOSDEM14_HPC_devroom_14_GoCUDA.pdf
    * openmp
        - give up
            + weird `go build bytomd`
                * no need to provide `CGO_LDFLAGS="-g -O2 -fopenmp"`
            + goood things
                * go test&build need to provide `CGO_LDFLAGS="-g -O2 -fopenmp"`
    * eigen
    * opencl
+ mat_init
    * simd?
    * gpu simd?
+ 有没有 生成 doc 的文件
+ mining/tensority
+ 搞清楚 BigEdian LittleEdian 的区别

### DONE
+ Time & space opt for dataIdentity[] init in mulMatrix()
+ clean up code & update tensority test
+ confirm all use SHA-3-256 
+ no need for parallelize extSeed, as SHA-3-256 is fast enough
    * .
        ```
        // 67 ms
        cache := calcSeedCache(seed.Bytes())

        // 1.030978394s
        data := mulMatrix(hash.Bytes(), cache)

        // 191.217µs
        hashMatrix(data)

        dataIdentity time:  57.954µs
        result time:  501.596µs
        ui32 time:  3.719813ms
        f64 time:  71.828938ms
        loop tmp time:  845.702µs 
        loop sha3 time:  6.524µs
        1 loop ma time:  240.240435ms
        4 loops ma time:  918.162585ms
        wg 4 loops ma time:  821.528586ms
        ```
+ go vs cpp, single_thread vs multi_thread
    * 矩阵点乘因为 库的问题，cpp 的 openblas 不如  go 的gonum/mat 快 改成多线程并发以后也是  cpp 不如 go 好   cpp多线程反而比cpp单线程更慢了
    * 我的笔记本上
        - go 单线程 gonum\mat: 920ms
        - go 4线程 gonum\mat: 820ms
        - cpp 单线程 openblas: 2.4s
        - cpp 4线程 openblas: 5.3s (理论上cpp 4线程能优化到700ms，我也不知道我为什么写出来这么渣...)
+ cpp -O3
    * ` g++ byte_order.c sha3.c  test_BytomPoW.cpp -I /opt/OpenBLAS/include/ -L/opt/OpenBLAS/lib -lopenblas -lpthread -std=c++11 -pthread -mavx2 -O2`
        - mulMatrix: 2.53 -> 1.65
        - total: 2.98898s -> 2.05s
+ Kui's first cpp slower
    * 12.9 s
+ extend seed in cpp
+ cpp multi-thread slower
    * 2.4s vs 5.3s
+ Kui's second cpp
    * 160ms!
+ 现在做的东西也不知道有没有价值，还是在优化代码,主要是 区块验证/挖矿这块
还没有做 P2P, 也没有接触虚拟机
    * 北京那边发挥很不稳定
    * 2.8s 被优化到 12.9s
    * then 160ms!
        - GPU?
        - 多线程
        - SIMD
+ cpu flag
    * `cat /proc/cpuinfo`
+ toIdentityMatrix
    * 0.189s -> 0.172s
    * 17ms faster
+ SIMD
    * Beijing
        - mul 230ms
        - total 450ms
        - single-thread 365ms
    * combine
        - sThread 167ms
        - sThread total 289ms
        - sThread opt-init16 total 256ms
        - mThread 0.333546s
        - mThread total 0.429112s
+ cgo
    * mul 178ms
    * total 280ms
+ shared lib
    * dl
        - https://www.google.com/search?q=golang+c+shared+lib&oq=golang++c+shared+lib&aqs=chrome..69i57j69i60j0.4787j0j7&sourceid=chrome&ie=UTF-8
        - https://github.com/rainycape/dl
    * plugin
        - https://golang.org/pkg/plugin/
        - https://medium.com/learning-the-go-programming-language/writing-modular-go-programs-with-plugins-ec46381ee1a9
    * https://github.com/golang/go/issues/16805
    * https://www.ardanlabs.com/blog/2013/08/using-c-dynamic-libraries-in-go-programs.html
+ monero
    * Monero verification time
        - https://bitcointalk.org/index.php?topic=583449.0
        - https://www.reddit.com/r/Monero/
        - https://monero.stackexchange.com/
        - https://forum.getmonero.org/
        - https://mattermost.getmonero.org/login
        - https://telegram.me/bitmonero
+ bytes
    * It is analogous to the facilities of the strings package.
    * `func (b *Buffer) Bytes() []byte`
        - Bytes returns a slice of length b.Len() holding the unread portion of the buffer. The slice is valid for use only until the next buffer modification (that is, only until the next call to a method like Read, Write, Reset, or Truncate). The slice aliases the buffer content at least until the next buffer modification, so immediate changes to the slice will affect the result of future reads.
    * [为什么电脑数据一个字节是8位？](https://www.guokr.com/question/542532/)
+ tensor
    * [X]win64 ver
        - define flag
        - no need fPIC
    * [X]win32 ver
+ openmp
    * 4-core on 4-core
        - faster
    * 4-core on 1-core
        - no change
    * 1-core on 1-core
        - no change
    * 1-core on 4-core
        - faster
+ coinbase data
    * Getblocktemplate allow you to define coinbase. You can check btcpool code. In stratum.cc, we define coinbase. See initfromGbt function. gbt stands for getblocktemplate.
    * 看下btc的交易结构及coinbase交易. 没有pre tx所以 就可以利用这个字段来写自定义信息. 比特币是在coinbase交易的输入的脚本里写的.
 -->


## Bytom 架构

### 商业模型
> https://gguoss.github.io/2017/06/28/Bytom-s-data-structure/
> 
> __资产账户__
> ![bytom_asset](https://github.com/ChrisLinn/ink/raw/master/source/_posts/img/bytom/bytom_asset.png)
> 
> + assetid 是全局唯一的资产识别id
> + alias 是资产的别名，可便于记忆，如(gold, silver) 
> + vmversion 是为了软分叉时，做到动态过度。
> + program 是指发布该资产时需要执行的程序
> + initialblockhash 是指该资产是在哪个块高度被登记
> + signer 管理公私钥对，以便用该资产的私钥签名，只有拥有该资产私钥的人才能发布该资产
> + definition 对该资产的解释说明等。

### 软件架构

#### 技术特点
* 区块处理
    - btc
* tx
    - butxo 支持多资产
        + "扩展 utxo，扩展字段不上链，相当于拆表"?"分两类，一类 上链的，一类钱包的"?
    - txin txout 分多 action、做映射
* merkle tree
    - trie (pat)
    - 2 叉，不平衡
    - 保存交易状态
* p2p
    - tendermint reactor模型
    - eth discover
    - eth block sync
* 合约
    - chain

#### BVM
+ 智能合约
    * 合约交易
        - Bytom 默认不支持含 btm 的交易对，只支持 非btm交易对
        - btm 只支持标准(P2SH)交易
        - 但有个 解决方案：将合约交易转为 P2SH 交易

### Cross-Origin Resource Sharing (CORS)

XMLHttpRequest和Fetch API遵循同源策略。 这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求HTTP资源，除非响应报文包含了正确CORS响应头。

跨域资源共享（ CORS ）机制 __允许__ Web 应用服务器进行跨域访问控制，从而使跨域数据传输 __得以安全__ 进行。现代浏览器支持在 API 容器中（例如 XMLHttpRequest 或 Fetch ）使用 CORS，以降低跨域 HTTP 请求所带来的风险。

#### 什么情况下需要 CORS

+ XMLHttpRequest 或 Fetch 发起的跨域 HTTP 请求
+ Web 字体 (CSS 中通过 @font-face 使用跨域字体资源), 因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
+ WebGL 贴图
+ 使用 drawImage 将 Images/video 画面绘制到 canvas
+ 样式表（使用 CSSOM）
