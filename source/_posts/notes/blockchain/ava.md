# Avalanche

+ [Scalable and Probabilistic Leaderless BFT Consensus through Metastability](https://arxiv.org/abs/1906.08936)
+ https://www.cs.cornell.edu/~tedyin/
    * https://tedyin.com/archive/snow-bft-demo/
+ Perlin
+ https://zhuanlan.zhihu.com/p/40110917
+ https://zhuanlan.zhihu.com/p/41668961
+ https://blog.csdn.net/TurkeyCock/article/details/82428552


## Evolution
+ Slush 雪泥
    * 灵感来源于 Gossip 协议
    * 多次重复随机抽样投票
        * 状态简单（simple state）、小样本（small sample）、重复抽样（repeated sampling）、通信成本低
    * Non-byzantine
+ Snowflake 雪花
    * 对颜色有个 counter (reputation) 记录别人
        - 颜色翻转会重置
+ Snowball 雪球
    * 对颜色更持久的可信度标志 confidence (conviction?)
+ Avalanche 雪崩
    * 动态的 append-only 的 DAG 结构来记录所有的交易
    * 将 重复查询 和 多个计数器，进行和 DAG 结合、用 DAG 改造

## Metastable
__TODO:__

传递“信任阈值”来达成共识

## Misc
话说回来觉得这个采访不错 [对话 Ted：关于 Avalanche 的二三事](https://www.chainnews.com/articles/024038258160.htm):

* 窃窃私语、泛化、随机去问通过反馈刷新认知、反复、确信、压倒性优势
+ Metastable 是 probabilistic 的
    * 但 既然可以接受 Nakamoto Consensu，那又怕什么呢
+ 共识和准入机制其实没有关系
    + PoW 正好都有
    + PoS 其实本来强调的是准入部分，不一定要把 共识做掉
- TPS(带宽) vs lantency
    + 单位时间内 vs 单位交易