# Distributed Computing


## Curriculum

+ [Foundations of Distributed Consensus and Blockchains](https://www.distributedconsensus.net/) by Elaine Shi
+ https://github.com/SebastianElvis/sharding-bib
+ https://github.com/ChrisLinn/ink/tree/master/source/_posts/assets/IntroductionToReliableAndSecur_Book_2011.pdf
+ http://read.pudn.com/downloads95/ebook/386159/Distributed.Algorithms.pdf
+ MIT
    * https://learning-modules.mit.edu/materials/index.html?uuid=/course/6/fa15/6.852#materials
        - 6.852
        - Distributed Algorithms
        - https://github.com/ChrisLinn/ink/blob/master/source/_posts/assets/Distributed_Algorithms_MIT_6.852.pdf
            - https://labs.xjtudlc.com/labs/wldmt1/books/Distributed%20and%20parallel%20algorithms/
    * http://nil.lcs.mit.edu/6.S974/
        - 6.S974
        - Decentralized Applications
        - 偏理论
    * https://pdos.csail.mit.edu/6.824/
        * 6.824
        - distributed system
        - https://github.com/chaozh/MIT-6.824
        - https://github.com/feixiao/Distributed-Systems
        - https://github.com/alinush/6.824-lecture-notes
+ ethz
    * https://disco.ethz.ch/courses/ss04/distcomp/
    * https://disco.ethz.ch/courses/ss03/distcomp/
    * https://disco.ethz.ch/courses/podc/
    * https://disco.ethz.ch/courses/distsys/
    * [Lecture Notes on Principles of Distributed Computing](https://disco.ethz.ch/courses/podc_allstars/lecture/podc.pdf) by Roger Wattenhofer
+ princeton
    * https://www.cs.princeton.edu/courses/archive/fall18/cos418/schedule.html
+ CMU
    * https://www.cs.cmu.edu/~dga/15-712/F14
+ EPFL
    * https://dcl.epfl.ch/site/education/ca_2019
        - Concurrent Algorithms
    * https://dcl.epfl.ch/site/education/da
        - Distributed Algorithms
+ Yale
    * [Notes on Theory of Distributed Systems](http://www.cs.yale.edu/homes/aspnes/classes/465/notes.pdf) by James Aspnes
        * Distributed Computing
    + [Notes on Randomized Algorithms](https://www.cs.yale.edu/homes/aspnes/classes/469/notes.pdf) by James Aspnes
- Duke
    + https://sites.duke.edu/compsci590_04_f2019/schedule/
        * Consensus Protocols in Distributed Computing and Blockchains
+ UIUC
    * CS598CAL (Consensus Algorithms)
        - https://sites.google.com/view/cs598cal
        - https://drive.google.com/drive/u/0/folders/1Vo3UPK4lamunGVtV9boVQbkteaiFLPaY
- MPI-SWS
    + http://courses.mpi-sws.org/ds-ws16/schedule.html
        * Distributed Systems
+ talent-plan
+ https://github.com/aphyr/distsys-class
- https://github.com/asatarin/testing-distributed-systems

## PBFT

最近看 consensus 的 心得分享一下

[PBFT 中 assume 了 weak synchrony](https://www.usenix.org/legacy/events/osdi99/full_papers/castro/castro_html/node3.html#SECTION00030000000000000000):
>it must rely on synchrony to provide liveness

HoneyBadgerBFT 提出了改进，说 PBFT 的 liveness assumption 不 practical
>guarantees liveness without making any timing assumptions

HoneyBadgerBFT 用的是 erasure-coded broadcast
small client-load 时可以考虑使用 bracha broadcast 来代替，throughput 更大，lantency 更低

bracha broadcast 相关(虽然 citation 不如 PBFT 多，但是很多知名论文都引用了它)：

+ ethz 课件：https://disco.ethz.ch/courses/ss04/distcomp/lecture/chapter9.pdf
+ 论文: https://dl.acm.org/citation.cfm?id=806743


bracha 存在的问题是 scalability: 对于 transactions of size B

+ bracha 的通信复杂度是 `O(n^2*B)`
+ 而 HoneyBadgerBFT 的是 `O(n*B)`
+ BEAT 这个还没看，做到了 `O(B)`
    * BEAT 这篇论文发到了 ACM CCS 上: https://dl.acm.org/citation.cfm?id=3243812

还有一个很有意思的是 beat 中谈到, pbft 的 view-change 实现很难, 且 async 做起来其实比 sync 容易, 很多论文都选择了不实现 view-change

[Tendermint 也是对viewchange进行了 bracha 改造](http://drops.dagstuhl.de/opus/volltexte/2017/8016/pdf/LIPIcs-DISC-2017-1.pdf)
但是好像 tendermint 现在已经不用 PBFT 了（待考证）

## SMR
+ https://en.wikipedia.org/wiki/State_machine_replication
+ https://www.cs.cornell.edu/fbs/publications/SMSurvey.pdf
+ http://www.di.fc.ul.pt/~bessani/publications/tutorial-smr.pdf
+ https://www.inf.usi.ch/faculty/pedone/Paper/2011/2011DSN.pdf
+ https://segmentfault.com/a/1190000004033730
+ On the Optimality of Optimistic Responsiveness
    * https://eprint.iacr.org/2020/458.pdf
    * Synchronous Byzantine SMR obtaining optimal resilience and optimal best-case latency with optimistic responsiveness
        - 话说回来 sync 还有篇这个
            + [Practical Synchronous Byzantine Consensus](https://www.cs.umd.edu/~kartik/papers/10_syncsmr.pdf)
* Replicated state machines without replicated execution
    + https://eprint.iacr.org/2020/195.pdf


## Raft

+ https://draveness.me/etcd-introduction
+ https://zhuanlan.zhihu.com/p/49792009
+ https://jiajunhuang.com/articles/2018_11_20-etcd_source_code_analysis_raftexample.md.html
+ https://jiajunhuang.com/articles/2018_11_22-etcd_source_code_analysis_raft.md.html
+ https://blog.csdn.net/xxb249/article/details/80787501
+ https://zhuanlan.zhihu.com/p/43282243
+ https://reading.developerlearning.cn/reading/32-2019-03-02-etcd-raft/
+ https://jin-yang.github.io/post/golang-raft-etcd-sourcode-details.html
+ https://www.jianshu.com/p/ae462a2d49a8
+ https://studygolang.com/articles/14731
+ http://blog.betacat.io/post/raft-implementation-in-etcd/


### Misc
+ Knowledge and common knowledge in a Byzantine environment: Crash failures
    * https://www.sciencedirect.com/science/article/pii/0890540190900149
+ Principles of Eventual Consistency
    + https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/final-printversion-10-5-14.pdf
+ 'Eventual' is earlier than 'immediate', D Dolev - ‎1982
+ Families of consensus algorithms, Amotz Bar-Noy, Danny Dolev - 1988
