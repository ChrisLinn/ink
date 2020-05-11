# 跨链

侧链，跨链 有两篇文章值得一看:

+ v 神的 [Chain Interoperability](https://www.r3.com/reports/chain-interoperability/)，介绍了 多种跨链方式，包括 1. trusted 委托人 2.多签 federation 和 3. hash locking
+ blockstream 的 [Enabling Blockchain Innovations with Pegged Sidechains](https://blockstream.com/sidechains.pdf)

## 概述
采用 blockstream ElementsProject/Liquid 中 federation 联邦多签发起跨链交易的方式。

federation 收集/监听打入联邦多签地址的交易，然后发起跨链操作。

ElementsProject/Liquid 中还会对 转入侧链交易 进行主链 spv 验证，以确保 该交易 已在主链上真实发生。

同时为了防止回滚（故障或者作弊），可以配置 federation 等待多少次确认之后 才把 主链资产转入侧链/侧链资产转回主链。

侧链如果没人维护、运行，又或者需要硬分叉升级，federation 清算并将资产转回主链。

## utxo 的处理
发起侧链交易，等于在侧脸上凭空新建了 资产，凭空创建了 uxto 进行花费。

为了防止 federation 沟通出现问题，将同一笔跨链交易多次发起，造成 replay 导致 资产增发可被多重花费，需要依据主链 outputID 进行去重。

utxo 原本的意思是 unspent transaction output，未花费输出。一笔交易创建的 输入，未花费会被保存起来，花费了就要删掉。

但这里为了对主链对应的 output 进行去重，需要标记 使用过的 主链 outputID， 如果进行了花费就保存下来，这样当下次再进行花费时，一查已经花费过了，就知道尝试多次发起了跨链转移，这个主链对应的 output 已经花费过了不可再花费。

为了达到这个效果，需要 在 1.交易打包时 2.区块验证(processBlock)中查看是否有 output 多次被花费。

实现方式：

1. 当尝试附加一个区块时，即批量处理交易时，（打包区块时可看作批量处理交易，同理的）读取数据库中是否已经存在该主链对应 output ，并 遍历交易中 spending output，都一起 读在内存中。如果 output 已经被花费，说明 1. 数据库中已经花费过 或 2. 数据库中没有这个记录，但前面的交易中已经花费了这个 output 或 3. 前面的交易中没有花费过，但是同一笔交易中存在重复的 spending output   这些情况都需要进行拒绝，抛弃这笔交易。遍历完交易，统计完信息之后，进行数据库落盘，已经成功花费的要记录下来，防止下次再次花费。
__对比__：spending 主网对应output时，如果历史记录中不存在，说明可以安全新建并花费，然后在数据库中保存这个花费。原来的 普通 utxo 如果历史记录中不存在，则说明尝试花了一笔本来不存在的钱，需要拒绝；花费完需要从数据库中删除。

2. 回滚时操作正好相反，将 spending output 标记为 未花费，最终 数据库中落盘时将所有的 未花费主链对应 output 进行删除。
__对比__：原来的 普通 utxo 如果被标记为 未花费，数据库中落盘时会被存进数据库。

同时我们还要注意将这类replay 的交易从交易池中删除，因为这些交易已被判断为无效，无法入块，不删除就会一直拥塞在 交易池中。

## fedpegscript
即 federation 的多签脚本。一般还会写入 创世区块，作为侧链的共识。

虽然 发起跨链交易 有点像 在侧链上发行了资产，但这里的脚本 却不应该是 issuance program，而应该是 federation 的脚本，然后由 federation 对其进行签名。

除了在构建交易时 填写 federation 的脚本，在虚拟机验证时 也要检验交易中的脚本 是不是 federation 的脚本。否则 攻击者可以构建一个交易 替换掉 脚本，自行进行签名－－这样能过虚拟机，而又因为转入侧链交易是新建了 spending output 并进行花费，这样就凭空给自己印了钱。

当然其实也可以通过spv检测主链交易来避免这个问题。
