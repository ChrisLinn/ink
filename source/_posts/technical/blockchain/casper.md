# Casper

+ https://github.com/ethereum/research/tree/master/papers
+ https://www.adiasg.me/2020/03/31/casper-ffg-explainer.html
+ https://www.adiasg.me/2020/04/09/casper-ffg-in-eth2-0.html
+ Casper the Friendly Finality Gadget
    * https://arxiv.org/abs/1710.09437
+ Incentives in Ethereum's Hybrid Casper Protocol
    * https://arxiv.org/abs/1903.04205
+ Combining GHOST and Casper
    * https://arxiv.org/abs/2003.03052
+ Another Look at CBC Casper Consensus Protocol
    * https://eprint.iacr.org/2020/362.pdf
+ https://ethresear.ch/t/ethereum-casper-ffg-pos-like-all-pos-consensus-protocols-is-vulnerable-to-bribery-censorship-attacks/6646
+ https://ethresear.ch/t/non-attributable-censorship-attack-on-fraud-proof-based-layer2-protocols/6492
+ https://github.com/zack-bitcoin/amoveo/blob/a807dd26a5af156b8890474df7f709b0ddbe07cf/docs/other_blockchains/ethereum_casper_ffg.md
+ [Peer Review - CBC Casper](https://medium.com/@muneeb/peer-review-cbc-casper-30840a98c89a)
+ [Formal Analysis of the CBC Casper Consensus Algorithm with TLA+](https://blog.trailofbits.com/2019/10/25/formal-analysis-of-the-cbc-casper-consensus-algorithm-with-tla)


## WTF casper

TL;DR: current version is [Combining GHOST and Casper](https://arxiv.org/abs/2003.03052).

It also says "We present "Gasper," a proof-of-stake-based consensus protocol, which is an idealized version of the proposed Ethereum 2.0 beacon chain. The protocol combines Casper FFG, a finality tool, with LMD GHOST, a fork-choice rule. We prove safety, plausible liveness, and probabilistic liveness under different sets of assumptions."

There are 2 main types of Casper, one is CBC (also called TFG), and the other is FFG.

["However, CBC Casper has not been implemented yet"](https://github.com/ethereum/wiki/wiki/Sharding-FAQ#what-about-heterogeneous-sharding)

https://medium.com/taipei-ethereum-meetup/history-and-state-of-ethereums-casper-research-85e8fba26002 is the translation of https://twitter.com/VitalikButerin/status/1029900695925706753 , which states ["In June 2018, we made the fateful decision to scrap 'hybrid Casper FFG as a contract'"](https://twitter.com/VitalikButerin/status/1029905990085357568?s=20)

CBC is pure PoS, and FFG was hybrid (PoW + PoS) originally but now decides to switch to PoS.

CBC and FFG also differ in the fork choice rules. CBC uses LMD (Latest Message-Driven) GHOST, and FFG planned to use hybrid, but now Vitalik prefers [IMD (Immediate message-driven) GHOST](https://ethresear.ch/t/immediate-message-driven-ghost-as-ffg-fork-choice-rule/2561). 
+ [These also prove that hybrid FFG has been deprecated.](https://notes.ethereum.org/@serenity/handbook#Why-not-EIP-1011-Casper-FFG-Contract)
+ https://medium.com/taipei-ethereum-meetup/history-and-state-of-ethereums-casper-research-85e8fba26002 says "在譯文完成時， 以太坊 2.0 採用的是LMD GHOST"
    * also see https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#LMD-GHOST-fork-choice-rule

https://github.com/ethereum/eth2.0-specs#useful-external-resources puts a link to [Combining GHOST and Casper](https://arxiv.org/abs/2003.03052), so from the above, eth2.0 should be using [it](https://arxiv.org/abs/2003.03052).


## References

+ papers
    * Combining GHOST and Casper
        - https://arxiv.org/abs/2003.03052
    * Incentives in Ethereum's Hybrid Casper Protocol
        - https://arxiv.org/abs/1903.04205
        - EIP-1011? seems dead?
            + https://notes.ethereum.org/@djrtwo/rJDrKoBOQ?type=view
            + https://medium.com/@djrtwo/casper-%EF%B8%8F-sharding-28a90077f121
    * Casper the Friendly Finality Gadget
        * https://arxiv.org/abs/1710.09437
+ CBC? = Casper TFG
    * VladZamfir
    * https://github.com/ethereum/wiki/wiki/Sharding-FAQ#what-about-heterogeneous-sharding
    * https://github.com/ethereum/cbc-casper/wiki/FAQ
+ https://ethereum.stackexchange.com/questions/31797/casper-ffg-vs-casper-ghost-cbc
+ Serenity? 
    * https://notes.ethereum.org/@serenity/handbook
    * binance says not sure?(https://www.binance.vision/zh/blockchain/ethereum-casper-explained)
+ Misc
    * https://medium.com/taipei-ethereum-meetup/history-and-state-of-ethereums-casper-research-85e8fba26002
    * https://chubbydeveloper.com/index.php/2019/01/27/ethereum-proof-of-stake-casper-ffg-vs-casper-cbc/