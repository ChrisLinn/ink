# MimbleWimble Origin

MimbleWimble 协议起源. 

翻译自 https://github.com/mimblewimble/docs/wiki/MimbleWimble-Origin.


> MIMBLEWIMBLE
> 
> Tom Elvis Jedusor
> 
> 19 July, 2016


## Introduction 介绍

Bitcoin is the first widely used financial system for which all the necessary data to validate the system status can be cryptographically verified by anyone. However, it accomplishes this feat by storing all transactions in a public database called "the blockchain" and someone who genuinely wishes to check this state must download the whole thing and basically replay each transaction, check each one as they go. Meanwhile, most of these transactions have not affected the actual final state (they create outputs that are destroyed a transaction later).

比特币是第一个被广泛使用的，所有必要的验证系统状态的数据可以由任何人加密验证的金融系统。但是，它通过将所有交易存储在称为“区块链”的公共数据库来实现这一特性，想要检查状态的人必须下载整个“区块链”并基本上重播、检查每个交易。同时，大多数交易都没有影响实际最终状态（它们只是创建了可被将来的交易用掉的输出）。

At the time of this writing, there were nearly 150 million transactions committed in the blockchain, which must be replayed to produce a set of only 4 million unspent outputs.

在写这篇文章的时候，区块链上已有约 一亿五千万笔交易发生，产生了 约 4百万笔 未花费输出。

It would be better if an auditor needed only to check data on the outputs themselves, but this is impossible because they are valid if and only if the output is at the end of a chain of previous outputs, each signs the next. In other words, the whole blockchain must be validated to confirm the final state.

如果审计员只需要检查输出数据本身就好了，但这是不可能的，因为当且仅当输出位于先前输出链的末尾时，它们才有效，每个输出都标记下一个输出。 换句话说，必须验证整个区块链以确认最终状态。

Add to this that these transactions are cryptographically atomic, it is clear what outputs go into every transaction and what emerges. The "transaction graph" resulting reveals a lot of information and is subjected to analysis by many companies whose business model is to monitor and control the lower classes. This makes it very non-private and even dangerous for people to use.

除此之外，这些事务是密码学上原子性的。每个交易的输出是什么以及出现了什么是很清楚的。 产生的“交易图”显示了大量信息，并且受到许多公司的分析，这些公司的商业模式是监控和控制下层阶级。 这使得它非常公开，甚至对使用者来说也很危险。

Some solutions to this have been proposed. Greg Maxwell discovered to encrypt the amounts, so that the graph of the transaction is faceless but still allow validation that the sums are correct [1]. Dr Maxwell also produced CoinJoin, a system for Bitcoin users to combine interactively transactions, confusing the transaction graph. Nicolas van Saberhagen has developed a system to blind the transaction entries, goes much further to cloud the transaction graph (as well as not needed the user interaction) [3]. Later, Shen Noether combined the two approaches to obtain "confidential transactions" of Maxwell AND the darkening of van Saberhagen [4].

对此，一些解决办法被提出。Greg Maxwell 发现如果加密了金额，交易的图可以达到匿名效果，但金额是否正确[1]仍然可以被验证。Maxwell 博士还制造了 CoinJoin ，一个比特币用户可以交互地组合交易的系统，来混淆交易图。Nicolas van Saberhagen 已经开发了一个系统来掩盖交易条目，并进一步对交易图进行了遮敝（也不需要用户交互）。后来，Shen Noether 结合了两种方法来达成 Maxwell 的“机密交易”和 van Saberhagen 的遮敝[4]。

These solutions are very good and would make Bitcoin very safe to use. But the problem of too much data is made even worse. Confidential transactions require multi-kilobyte proofs on every output, and van Saberhagen signatures require every output to be stored for ever, since it is not possible to tell when they are truly spent.

这些解决方案非常好，可以使比特币的使用。但数据太多的问题变得更为严重了。机密交易需要在每个输出上有多个KB的证明，而 van Saberhagen 签名要求永远存储每个输出，因为不可能知道它们何时真正被使用。

Dr. Maxwell's CoinJoin has the problem of needing interactivity. Dr. Yuan Horas Mouton fixed this by making transactions freely mergeable [5], but he needed to use pairing-based cryptography, which is potentially slower and more difficult to trust. He called this "one-way aggregate signatures" (OWAS).

麦克斯韦博士的 CoinJoin 存在需要互动性的问题。Yuan Horas Mouton 博士通过使交易可以自由合并来解决这一问题[5]，但他需要使用基于配对的密码术，这可能更慢，更难信任。他称之为“单向聚合签名”（OWAS）。

OWAS had the good idea to combine the transactions in blocks. Imagine that we can combine across blocks (perhaps with some glue data) so that when the outputs are created and destroyed, it is the same as if they never existed. Then, to validate the entire chain, users only need to know when money is entered into the system (new money in each block as in Bitcoin or Monero or peg-ins for sidechains [6]) and final unspent outputs, the rest can be removed and forgotten. Then we can have Confidential Transactions to hide the amounts and OWAS to blur the transaction graph, and use LESS space than Bitcoin to allow users to fully verify the blockchain. And also imagine that we must not pairing-based cryptography or new hypotheses, just regular discrete logarithms signatures like Bitcoin. Here is what I propose.

单向聚合签名将事务组合成块的主意很好。假设我们可以跨块组合（可能与一些粘合数据结合），这样当创建和销毁输出时，就好像它们从未存在过一样。然后，为了验证整个链，用户只需要知道货币什么时候进入系统（每个区块的新货币，如比特币或Monero或侧链的锚定货币[6]）和最终未使用的输出，其余的信息就都可以删除和忘记。然后我们可以进行保密交易来隐藏金额和 单向聚合签名来模糊交易图，并使用比比特币更少的空间来允许用户完全验证区块链。并且想象一下，我们没有配对的加密或新的假设，只是常规的离散对数签名，如比特币。这是我的建议。

I call my creation Mimblewimble because it is used to prevent the blockchain from talking about all user's information [7].

我将我的发明称为 mimblewimble，因为它用于不让区块链谈及每一个用户的信息[7]。

## Confidential Transactions and OWAS 保密交易和单向聚合签名

The first thing we need to do is remove Bitcoin Script. This is sad, but it is too powerful so it is impossible to merge transactions using general scripts. We will demonstrate that confidential transactions of Dr. Maxwell are enough (after some small modification) to authorize spending of outputs and also allows to make combined transactions without interaction. This is in fact identical to OWAS, and allows relaying nodes take some transaction fee or the recipient to change the transaction fees. These additional things Bitcoin can not do, we get for free. 

我们要做的第一件事就是移除比特币脚本。这令人悲伤，但它太强大了，强大到不可能使用常规脚本合并交易。我们将证明，Maxwell 博士的机密交易（经过一些小修改）足以授权花费输出，并允许在没有交互的情况下进行组合交易。这实际上与单向聚合签名相同，并且允许中继节点收取一些交易费用，或者允许收款人更改交易费用。这些额外的事情比特币做不到，我们却能自由做到。

We start by reminding the reader how confidential transactions work. First, the amounts are coded by the following equation:

我们首先提醒读者保密交易是如何工作的。首先，用以下公式对金额进行编码：

```
C = r * G + v * H
```

where C is a Pedersen commitment, G and H are fixed nothing-up-my-sleeve elliptic curve group generators, v is the amount, and r is a secret random blinding key.

其中 C 是一个 Pedersen 承诺，G 和 H 是固定的、公开的、无心机的没有椭圆曲线群生成器，v 是数量，r 是一个秘密的随机盲密钥。

Attached to this output is a rangeproof which proves that v is in [0, 2^64], so that user cannot exploit the blinding to produce overflow attacks, etc.

附加在这个输出上的是一个 RangeProof ，它证明 v 在 [0，2^64]中，因此用户不能利用盲化来产生溢出攻击等。

To validate a transaction, the verifer will add commitments for all outputs, plus f*H (f here is the transaction fee which is given explicitly) and subtracts all input commitments. The result must be 0, which proves that no amount was created or destroyed overall.

为了验证交易，验证人将加上所有的输出承诺，加上 `f * H` (这里的 f 是显示给出的交易费)，并减去所有的输入承诺。这个结果肯定为零，证明整体数量上没有新增或者销毁。

We note that to create such a transaction, the user must know the sum of all the values of r for commitments entries. Therefore, the r-values (and their sums) act as secret keys. If we can make the r output values known only to the recipient, then we have an authentication system! Unfortunately, if we keep the rule that commits all add to 0, this is impossible, because the sender knows the sum of all _his_ r values, and therefore knows the receipient's r values sum to the negative of that. So instead, we allow the transaction to sum to a nonzero value k*G, and require a signature of an empty string with this as key, to prove its amount component is zero.

我们注意到，要创建这样一个交易，用户必须知道所有输入输出承诺 r 的值的总和。因此，r 值（及其和）充当密钥的作用。如果我们可以使输出的 r 值仅为收款方所知，那么我们就有了一个身份验证系统！不幸的是，如果我们要保证输入输出加和为 0，这将不可能实现，因为发送者知道 _他_ 所有的 r 值之和，因此一取反就知道接收者的 r 值之和。因此，我们允许交易的输入输出金额加和为一个非零值 `k * G` ，并且需要一个以这个为密钥的对空字符串的签名，以证明它的金额部分是零。

We let transactions have as many k*G values as they want, each with a signature, and sum them during verification.

我们使交易可以拥有任意多的 `k * G` 值，每个值都有一个签名，并在验证过程中对其求和。

To create transactions sender and recipient do following ritual:

要创建交易，发送者和接收者执行以下操作：

1.
Sender and recipient agree on amount to be sent. Call this b. 

发送方和接收方约定发送的金额。假设为 b。

2.
Sender creates transaction with all inputs and change output(s), and gives recipient the total blinding factor (r-value of change minus r-values of inputs) along with this transaction. So the commitments sum to r*G - b*H.

发送方创建具有所有输入的交易，更改输出，并将总盲因子（更改的 r 值减去输入的 r 值）与此交易一起提供给接收方。因此，承诺总额为 `r * G - b * H` 。

3.
Recipient chooses random r-values for his outputs, and values that sum to b minus fee, and adds these to transaction (including range proof). Now the commitments sum to k*G - fee*H for some k that only recipient knows.

接受者为其输出选择随机的 r 值，以及一些值（且他们的总和 b 减去手续费），并将这些值添加到交易中（包括范围证明）。现在，承诺总额为 `K * G - fee * H`，K 只有接受方知道。

4.
Recipient attaches signature with k to the transaction, and the explicit fee. It has done.

接受方在交易中附加用 k 进行的签名，显式地给出交易手续费。搞定。

Now, creating transactions in this manner supports OWAS already. To show this, suppose we have two transactions that have a surplus k1*G and k2*G, and the attached signatures with these. Then you can combine the lists of inputs and outputs of the two transactions, with both k1*G and k2*G to the mix, and voilá! is again a valid transaction. From the combination, it is impossible to say which outputs or inputs are from which original transaction.

现在，以这种方式创建的交易已经支持单向聚合签名了。为了证明这一点，假设我们有两个分别有盈余 `k1*G` 和 `k2*G` 的交易，以及他们附带的签名。然后，您可以将这两个交易的输入和输出列表与 `k1*G` 和 `k2*G` 组合在一起，然后，哇，仍然会是有效的交易。从这个组合中无法看出哪些输出或输入来自哪个原来的交易。

Because of this, we change our block format from Bitcoin to this information:

因此，我们将区块的格式从比特币版改为：

1.
Explicit amounts for new money (block subsidy or sidechain peg-ins) with whatever else data this needs. For a sidechain peg-in maybe it references a Bitcoin transaction that commits to a specific excess k*G value?

新资金的明确数额（区块奖励或侧链锚定）与有需要的其他任何数据。对于侧链锚定来说，比如可能它引用了一个具有特定的超额 `k*G` 值的比特币交易？

2.
Inputs of all transactions

所有交易的输入

3.
Outputs of all transactions

所有交易的输出

4.
Excess k*G values for all transactions

所有交易的超额 `k*G` 值

Each of these are grouped together because it do not matter what the transaction boundaries are originally. In addition, Lists 2 3 and 4 should be required to be coded in alphabetical order, since it is quick to check and prevents the block creator of leaking any information about the original transactions.

每一个都被分组在一起，因为最初交易区分是什么并不重要。此外，2, 3 和 4 应按字母顺序进行编码，因为它可以快速检查并防止出块者泄漏有关原始交易的任何信息。

Note that the outputs are now identified by their hash, and not by their position in a transaction that could easily change. Therefore, it should be banned to have two unspent outputs are equal at the same time, to avoid confusion.

注意，输出现在是通过散列来标识的，而不是通过它们在一个(容易被更改的)交易中的位置来标识的。因此，应该禁止两个未消耗的输出同时相等，以避免产生困惑。


## Merging Transactions Across Blocks 跨块合并交易


Now, we have used Dr. Maxwell's Confidential Transactions to create a noninteractive version of Dr. Maxwell's CoinJoin, but we have not seen the last of marvelous Dr. Maxwell! We need another idea, transaction cut-through, he described in [8]. Again, we create a noninteractive version of this, and to show how it is used with several blocks.

现在，我们已经使用麦克斯韦博士的机密交易创建了麦克斯韦博士的 CoinJoin 无需交互版本，但我们还没有将神奇的麦克斯韦博士探究完全！他在[8]中描述道：“我们需要另一个想法，即交易突破。”同样，我们创建了交易突破的无需交互版本，并展示了它如何与几个块一起使用。

We can imagine now each block as one large transaction. To validate it, we add all the output commitments together, then subtracts all input commitments, k*G values, and all explicit input amounts times H. We find that we could combine transactions from two blocks, as we combined transactions to form a single block, and the result is again a valid transaction. Except now, some output commitments have an input commitment exactly equal to it, where the first block's output was spent in the second block. We could remove both commitments and still have a valid transaction. In fact, there is not even need to check the rangeproof of the deleted output.

我们现在可以将每个块想象为一个大型交易。为了验证它，我们将所有输出承诺加在一起，然后减去所有输入承诺、减去所有 `k*G` 值和减去所有显式输入金额乘以 `H` 的值 。我们发现我们可以将两个块的交易组合起来，因为我们如果将交易组合成一个块，结果仍然是一个有效的事务。除了，现在，有些输出承诺与它的输入承诺完全相同，其中第一个块的输出用在了第二个块中。我们可以把这两项承诺取消，但仍然得到一个有效的交易。实际上，甚至不需要检查已删除输出的 RangeProof。

The extension of this idea all the way from the genesis block to the latest block, we see that EVERY nonexplicit input is deleted along with its referenced output. What remains are only the unspent outputs, explicit input amounts and every k*G value. And this whole mess can be validated as if it were one transaction: add all unspent commitments output, subtract the values k*G, validate explicit input amounts (if there is anything to validate) then subtract them times H. If the sum is 0, the entire chain is good.

从创世区块一直扩展到最新的块，我们看到每一个非显式的输入以及它引用的输出都被删除。剩下的只是未花费的输出、显式输入量和每个 `k*G` 值。整一大坨东西可以像只有一笔交易一样被验证：把所有未花费的输出承诺加到一起，减去 `k*G` 值，验证显式输入量（如果有什么要验证的话），然后减去它们乘以 H 的值。如果总和为 0，整条链就没问题。

What is this mean? When a user starts up and downloads the chain he needs the following data from each block:

这意味着什么？当用户启动并下载区块链时，他需要来自每个块的以下数据：

1.
Explicit amounts for new money (block subsidy or sidechain peg-ins) with whatever else data this needs.

明确的新资金数额（出块奖励或侧链锚定）与其他需要的任何数据。

2.
Unspent outputs of all transactions, along with a merkle proof that each output appeared in the original block.

所有交易的未花费输出，以及每个输出在原始区块中的 Merkle 证明。

3.
Excess k*G values for all transactions.

所有交易的超额 `k*G` 值。

Bitcoin today there are about 423000 blocks, totaling 80GB or so of data on the hard drive to validate everything. These data are about 150 million transactions and 5 million unspent nonconfidential outputs. Estimate how much space the number of transactions take on a Mimblewimble chain. Each unspent output is around 3Kb for rangeproof and Merkle proof. Each transaction also adds about 100 bytes: a k*G value and a signature. The block headers and explicit amounts are negligible. Add this together and get 30Gb -- with a confidential transaction and obscured transaction graph!

比特币今天大约有 423000 区块，总共有 80GB 左右的硬盘数据要验证。这些数据约为 1.5 亿笔交易和 500 万未花费的非机密输出出。（下面我们来）估计这么多交易在 Mimblewimble 链上占用的空间。每一个未花费的输出需要约 3Kb 用于 rangeproof 和 Merkle proof。每个交易还需要再加上约 100 字节：一个 `k*G` 值和一个签名。区块头和显式金额占用的空间可以忽略不计。这些加起来有30GB——一个保密的交易和模糊的交易图！

## Questions and Intuition 问题和直觉

Here are some questions that since these weeks, dreams asked me and I woke up sweating. But in fact it is OK.

这几个星期以来，我在梦中被问题惊醒，满头大汗。但事实上不是什么问题。


__Q.__

If you delete the transaction outputs, user cannot verify the rangeproof and maybe a negative amount is created.

如果删除交易输出，则用户无法验证 rangeproof ，可能会创建负数金额（的交易）。

__A.__

This is OK. For the entire transaction to validate all negative amounts must have been destroyed. User have SPV security only that no illegal inflation happened in the past, but the user knows that _at this time_ no inflation occurred.

不是什么问题。对于整个要验证的交易，所有负数金额肯定已经被销毁。用户只有在过去没有发生非法通货膨胀的情况下才能拥有简单支付验证 (SPV) 安全，但用户知道到目前为止还没有发生过通货膨胀。


__Q.__

If you delete the inputs, double spending can happen.

如果删除输入，可能会导致双花。

__A.__

In fact, this means: maybe someone claims that some unspent output was spent in the old days. But this is impossible, otherwise the sum of the combined transaction could not be zero.

事实上，这意味着：也许有人声称一些未花费的输出已经在过去被花费掉了。但这是不可能的，否则合并交易的金额总和无法为零。

An exception is that if the outputs are amount zero, it is possible to make two that are negatives of each other, and the pair can be revived without anything breaks. So to prevent consensus problems, outputs 0-amount should be banned. Just add H at each output, now they all amount to at least 1.

一个例外是，如果输出金额为零，则存在可能性生成金额互为相反数的两个输出，并且这个输出对可以在没有任何破坏的情况下被恢复。因此，为了防止共识问题，应禁止 0 金额输出。只需在每个输出上加 `H` 就可以了，那么它们都至少等于1。


## Future Research 未来研究的方向

Here are some questions I can not answer at the time of this writing.

在写作这篇文章的时候，有几个问题我尚不能回答:

1.
What script support is possible? We would need to translate script operations into some sort of discrete logarithm information.

都支持什么样的脚本？ 我们需要将脚本操作翻译成某种离散对数信息.

2.
We require user to check all `k*G` values, when in fact all that is needed is that their sum is of the form `k*G`. Instead of using signatures is there another proof of discrete logarithm that could be combined?

目前用户需要检查所有的 `k*G` 值，但事实上只需要保证这些值的和也是 `k*G` 的形式就可以了。除了使用签名之外，有没有别的离散对数证明能进行结合呢？

3.
There is a denial-of-service option when a user downloads the chain, the peer can give gigabytes of data and list the wrong unspent outputs. The user will see that the result do not add up to 0, but cannot tell where the problem is.

用户下载区块链数据的时候，存在DoS的可能性。节点可以发送 GB 级的数据并列出错误的 UTXO， 用户会发现结果加起来不等于0，却不知道问题出在哪里。

For now maybe the user should just download the blockchain from a Torrent or something where the data is shared between many users and is reasonably likely to be correct.

目前，用户可能只需从 BT 种子或者在一个许多用户共享数据的地方下载区块链，并且（数据）应该是正确的。

## 参考链接
1. https://people.xiph.org/~greg/confidential_values.txt
2. https://bitcointalk.org/index.php?topic=279249.0
3. https://cryptonote.org/whitepaper.pdf
4. https://eprint.iacr.org/2015/1098.pdf
5. https://download.wpsoftware.net/bitcoin/wizardry/horasyuanmouton-owas.pdf
6. http://blockstream.com/sidechains.pdf
7. http://fr.harrypotter.wikia.com/wiki/Sortilège_de_Langue_de_Plomb
8. https://bitcointalk.org/index.php?topic=281848.0