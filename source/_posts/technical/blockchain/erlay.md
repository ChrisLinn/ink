# Erlay

> Bandwidth-Efficient Transaction Relay in Bitcoin

读了 blockstream 的关于节省转发交易带宽的新论文 Bandwidth-Efficient Transaction Relay in Bitcoin

__总结__

bitcoin 目前的方式是，节点 a 收到一个交易后会广播 txid 给（之前没把这 txid 发给 a 的）peers。
但这种方式效率不高，因为往往peers已经在不久之前从别的节点处收到了这个 txid。
论文中显示，这种方式造成了 40% 带宽的浪费。

erlay 协议通过把 转发 分成 fanout & reconciliation 两步。来减少这种冗余通信造成的浪费。

__fanout__:

只会将新交易通知给最多 8 个peers。

__reconciliation__:

节点会定期向外拨 peers 请求新交易的 short txids 梗概(sketch)。Sketches 使用 libminisketch 库创建，使用错误纠正码有效节省带宽。从一个 peer 收到梗概后，节点自身也会生成 梗概，进行对比取差集。(cpu密集型操作，但最差情况也不会超过 1ms) 然后向该 peer 请求自身没有的 tx。接着再向下一个节点重复上述步骤。每个新节点每秒一次。

论文中 网络带宽的分析采用了2种网络环境进行测试:

1. 有 60,000 节点的模拟网络，这与目前 bitcoin 网络在个数和使用规模上相近   
2. 分布在不同国家数据中心的100 节点的真实网络

数据显示，Erlay 减少了 84% 带宽使用。虽然需要多花  80% (2.6 seconds) 的时长来把交易广播到全网。但比起平均10min 的区块确认时间，这个开销很值得。

论文还讨论了 erlay 对 privacy 带来的好处。
目前比特币节点为了防止 spy nodes 通过交易是哪个节点发出的时间相关性猜测交易是哪个节点创建的，会稍微延迟交易的转发。
论文中探讨了peers中存在 5% ～ 60% spy nodes时的模拟情况。
对于 spy nodes 都是接受连入的 public nodes的情况，Erlay 的耗时表现的都比原来协议好。
对于 spy nodes 是只连接 honest node 但不接受别人连入 的  private nodes的情况，erlay 时好时坏，但最坏也坏不过 10%，并且这种情况很难发生。

如果把广播给交易的peer数从8增加到32，现有协议带宽使用增加 300%，erlay 只增加 32%。
 fannout 通知 8个节点，reconciliation 会在所有 32个节点之间都进行。4倍的连接数提升使得像使用 LN 协议这种时间敏感的交易能更快的被传给矿工。

论文中还对如何优化 sketches、reconciliation 失败时如何 fallback 进行了分析讨论。