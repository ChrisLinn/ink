# Rollup

+ https://ethfans.org/posts/optimistic-rollups-for-the-rest-of-us
+ https://ethfans.org/posts/the-why-s-of-optimistic-rollup
+ https://ethresear.ch/t/mass-migration-to-prevent-user-lockin-in-rollup/7701
+ https://ethresear.ch/t/rollups-on-a-data-sharded-ethereum-2-linking-the-data-availability-with-the-execution/8237

---

+ plasma
    * 数据不可用 + **不附加证明 (but 欺诈证明 later)**。
    * 需许可。退出机制。
+ zk-rollup
    * **数据可用（压缩）**+ 附加证明。
+ optimistic rollup
    * **数据可用（压缩）+ 不附加证明 (but 欺诈证明 later)**。
    * 不需许可。
    * optimistic rollup 和 plasma 都需要保证金 & 挑战期。那么提现就会比较久。解决办法是客户端自行验证，那么就可以立即接受。

