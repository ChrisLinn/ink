# TSS

## social recovery
+ https://bitrocks.me/secret-social-recovery
    * https://ethereum-magicians.org/t/social-recovery-using-address-book-merkle-proofs/3790

## scalable

+ https://webpages.uncc.edu/yonwang/papers/reviewTSS.pdf
    * https://wiki.mpcalliance.org/
+ [white-city](https://github.com/KZen-networks/white-city)
+ [Towards Scalable Threshold Cryptosystems](https://www.computer.org/csdl/proceedings-article/sp/2020/349700b242/1i0rIwLapqM)
    * The main innovation as I see it, is III.B. The work improves over KZG proofs in the case of multipoint evaluation by breaking the polynomial to a binary evaluation tree and use this tree to commit to the polynomial and prove evaluation in multiple points. The tree is binary and therefore instead of asymptotic O(nt) for threshold t they get O(n log t) which for large t makes a difference. 
    - It looks like using roots of unity is another trick but I am not sure if it is complementary or what’s  new about it.
    - I think that our-work on white-city fits nicely to this TSS and DKG protocols: https://github.com/KZen-networks/white-city/blob/master/White-City-Report/white_city.pdf . This is because we are handling the communication layer using BFT-SMR, assuming there is a TSS/DKG protocol. They are dealing with the protocol, assuming a supportive communication layer. Quoting from the paper: "Our DKG and VSS evaluations do not account for network delays. This is an important limitation. Our focus was on the computational bottlenecks of these protocols. Nonetheless, scaling and evaluating the broadcast channel of VSS and DKG protocols is necessary, interesting future work. In particular, ideas from scalable consensus protocols [4] could be used for this"
    - There is also the issue of trusted setup. I think it gets a new meaning here because if you assume your system is using threshold of 1million parties, it means that having adversary that controls 200 parties (as in largest trusted setup done so far lets say) is something that might happen with large probability.
+ GG18
    * https://eprint.iacr.org/2019/114.pdf
+ Bandwidth-efficient threshold EC-DSA
    * https://eprint.iacr.org/2020/084
+ Hierarchical Threshold Secret Sharing
    * https://www.openu.ac.il/lists/mediaserver_documents/personalsites/tamirtassa/hss_conf.pdf
+ non-interactive threshold ECDSA protocol
    * preprocessing stage before the signed message is known
        * [UC Non-Interactive, Proactive, Threshold ECDSA](https://eprint.iacr.org/2020/492)
* Damgard's 
- Canetti's, 
- https://eprint.iacr.org/2020/498.pdf


Initial analysis on the two new threshold ECDSA papers that came out last week: (1) Fast Threshold ECDSA with Honest Majority (https://eprint.iacr.org/2020/501.pdf) and (2) UC Non-Interactive, Proactive, Threshold ECDSA (https://eprint.iacr.org/2020/492.pdf)

- Both papers are proving security in the UC framework. This is actually not a first for threshold ECDSA (and not a second).  
- (1) works in the honest majority setting (like 3 out of 7, 4 out of 9 and so on). 
- (1) works best in the pre-processing model (non interactive) MPC with abort. 
- (1) nevertheless there is also a full online version and fairness can be enabled (because of honest majority it’s possible). 
- (1) UC security. They built a dedicated ideal functionality, so practically there is no need for security assumptions at all.  This is the best security so far for threshold ECDSA
- (1) I recommend reading the proofs in the appendix. The protocol is extremely simple and the paper describes the proofs like in a text book, really great for studying how proof works. 
- (1) To conclude: the simplest protocol so far, also the fastest, caveat - honest majority. 
- (2) wow
- (2) In its essence, after you peel off 50 pages, there is a nice idea on how to improve GG signing by adding ZKP basically on everything (this is called GMW compiling ). 
- (2) now back to the 50 pages. As you know Cannetti is the inventor of UC. One of the most famous UC ideal functionality is of a digital signature, which looks nothing like digital signature but models precisely what digital signature should be. In this paper Cannetti et al. are providing a threshold variant of this F_sig and build a protocol that UC-realize this functionality. This is brilliant.
- (2) is also non-interactive 
- (2) also provides a built in (yet expensive) way to rotate the secret shares. 
- (2) I would argue that the distance of making this protocol accountable is not far at all
- (2) The downside: heavy computation is required. Heavier than GG.
- (2) Security assumptions is like GG (Pailller, RSA, ECDSA), however, the proof in completely different and on top of being UC which means the threshold ECDSA will work in a large system, GG security proof was not tight (same way as Lindell 2P ECDSA)
    +     - How is the tightness comparison?
        + If you want to read more about tightness considerations in threshold ecdsa - I suggest to read first https://eprint.iacr.org/2019/503.pdf which main contribution is a proof with tightness as opposed to Lindell 2P-ECDSA.

Nik Mak, [06.05.20 03:08]
I just want two specify that although (2) is more expensive than G&G (about twice as expensive) it's also less than half the rounds in the interactive variant.

Nik Mak, [06.05.20 03:10]
And latency is arguably the most time consuming resource, for many application

Omer, [06.05.20 03:10]
I completely agree.

udi, [06.05.20 03:13]
Thanks for a very nice summary 😇

Anish Mohammed, [06.05.20 03:17]
[In reply to Omer]
thanks very much, its a great summary

PaulCSP@ Cryptospherium.com, [06.05.20 03:24]
[In reply to Omer]
Are these two  applicable to real world usage? For (1) and (2)
Q: for (1) Are there honesty between criminals as thief,hackers that exploded the assumption that Honesty will prevail? Ex: they can gather 5/7 signatures by forced, etc so how to overcome that?
Q for (2) : how can security be robust when it is to slow and costly that usability will be obsolete by that time?
Is it possible to provide some good use case please?

Thank you for excellent summary :)

Omer, [06.05.20 04:12]
[In reply to PaulCSP@ Cryptospherium.com]
For (1) the threshold assumption for honest majority says that at least n/2+1 parties are honest. 
For (2) it is known  that threshold ecdsa can work for real world use cases like key management for the blockchain. In fact , the mentioned protocol is actually an improvement over existing ones

udi, [06.05.20 04:19]
[In reply to PaulCSP@ Cryptospherium.com]
You can see the approximated running time of (2) in the appendix (naive implementation: (1 sec signing, 3 sec refresh etc). it's very reasonable times for a cryptocurrency wallet under regular usage, though maybe not high-frequency signing

PaulCSP@ Cryptospherium.com, [06.05.20 04:25]
Thank you sirs
