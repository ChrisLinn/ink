# Rollup

+ https://ethfans.org/posts/optimistic-rollups-for-the-rest-of-us
+ https://ethfans.org/posts/the-why-s-of-optimistic-rollup
+ https://ethresear.ch/t/mass-migration-to-prevent-user-lockin-in-rollup/7701
+ https://ethresear.ch/t/rollups-on-a-data-sharded-ethereum-2-linking-the-data-availability-with-the-execution/8237

--

zk-rollup

+ https://ethresear.ch/t/on-chain-scaling-to-potentially-500-tx-sec-through-mass-tx-validation/3477
+ https://ethresear.ch/t/roll-up-roll-back-snark-side-chain-17000-tps/3675
+ https://vitalik.ca/general/2021/01/05/rollup.html
+ https://blog.kyber.network/research-trade-offs-in-rollup-solutions-a1084d2b444
+ https://www.fluidex.io/en/blog/zkrollup-intro1/

---

+ plasma
    * 数据不可用 + **不附加证明 (but 欺诈证明 later)**。
    * 需许可。退出机制。
+ optimistic rollup
    * **数据可用（压缩）+ 不附加证明 (but 欺诈证明 later)**。
    * 不需许可。
    * optimistic rollup 和 plasma 都需要保证金 & 挑战期。那么提现就会比较久。解决办法是客户端自行验证，那么就可以立即接受。
    * 越安全就越不安全：如果一直不作恶，那么就没什么人有动力验证
    * __TODO:__ 性价比问题
+ Validium
    * 不可用 + 附加证明。
+ volition
    * __TODO:__
+ zk-rollup
    * **数据可用（压缩）**+ 附加证明。

---

Taken from: [Evaluating Ethereum L2 Scaling Solutions: A Comparison Framework](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)

![rollup](https://miro.medium.com/max/700/1*OKGnYwqV8IEFrZe-NRwaIQ.png)
![rollup](https://github.com/ChrisLinn/ink/raw/master/source/_posts/img/crypto/rollup.png)
