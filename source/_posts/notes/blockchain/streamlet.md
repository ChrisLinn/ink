---
title: Streamlet
---

# Streamlet

Consensus protocols, in cryptocurrency systems, can be called as blockchain protocols. They were commonly referred to as "State Machine Replication" or "Byzantine Fault Tolerance" protocols.

Nakamoto consensus works in a permissionless environment. But as shown in [Algorand: The efficient and democratic ledger](https://arxiv.org/abs/1607.01341), [Snow white: Robustly reconfigurable consensus and applications to provably secure proofs of stake](https://eprint.iacr.org/2016/919) and [Ouroboros: A provably secure proof-of-stake blockchain protocol](https://eprint.iacr.org/2016/889), PoS systems rely instead on "permissioned" consensus (needs PKI) as a core building block.

Byzantine Agreement or Byzantine Broadcast is a single-shot consensus instances abstraction.

## single-shot vs direct construction
Direct construction is easier to optimize. (Paxos, PBFT and their variants.)

## Assume synchrony
> It is well-known that in a partially synchronous network, as long as players have clocks with bounded drift, it is possible to employ a simple clock synchronization procedure to establish a synchronized clock. In this work, for simplicity, we assume synchronized clocks.

__TODO:__ Does [Cynthia Dwork, Nancy Lynch, and Larry Stockmeyer. Consensus in the presence of partial synchrony] justify this? (But at least they prove "no partially synchronous protocol can tolerate n/3 or more corruptions")


## Reference

+ [Streamlet: A Simple Textbook Blockchain Protocol](https://decentralizedthoughts.github.io/2020-05-14-streamlet/)
+ [Streamlet: Textbook Streamlined Blockchains](https://eprint.iacr.org/2020/088)
+ [Streamlined Blockchains: A Simple and Elegant Approach](https://eprint.iacr.org/2020/087)
+ [PiLi: An Extremely Simple Synchronous Blockchain](https://eprint.iacr.org/2018/980)
+ [Pala: A simple partially synchronous blockchain](https://eprint.iacr.org/2018/981)
    * https://github.com/thundercore/pala