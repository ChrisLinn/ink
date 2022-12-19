# 我在 scroll 做的一些工作

+ 打通 trace
+ 修复一些死锁
+ 一些构建流程的优化
+ 架构设计
    * go-roller？
    * scroll-roller ws？
    * l2geth 负载均衡
        - 共识机制
        - erigon
        - https://blog.nodereal.io/en/our-best-practices-in-hosting-a-bsc-validator/
            + storage
                * 及时 write checkpoint
                    - TrieTimeout
                * 及时 snapshot
                    - storage latency
            + 内网
                * NAT
                * disabled the Peer Discovery
                * unlock wallets and sign blocks
                * disable RPC
+ 