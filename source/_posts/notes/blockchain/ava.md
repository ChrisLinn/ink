# Avalanche

+ [Scalable and Probabilistic Leaderless BFT Consensus through Metastability](https://arxiv.org/abs/1906.08936)
+ https://www.cs.cornell.edu/~tedyin/
    * https://tedyin.com/archive/snow-bft-demo/
+ https://www.ccvalue.cn/article/44052.html
+ http://www.jeepxie.net/article/67426.html
+ https://zhuanlan.zhihu.com/p/41668961
+ https://blog.csdn.net/TurkeyCock/article/details/82428552


## Evolution
+ Slush 雪泥
    * 灵感来源于 Gossip 协议
    * 多次重复随机抽样投票
        * 状态简单（simple state）、小样本（small sample）、重复抽样（repeated sampling）、通信成本低（log n）
    * Non-byzantine
+ Snowflake 雪花
    * counter (reputation)
+ Snowball 雪球
    * 更持久的可信度标志 confidence (conviction?)
+ Avalanche 雪崩
    * 动态的 append-only 的 DAG 结构来记录所有的交易

## Metastable
__TODO:__