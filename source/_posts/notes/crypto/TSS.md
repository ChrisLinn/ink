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
    * GG security proof was not tight (same way as Lindell 2P ECDSA)
        * How is the tightness comparison?
            * If you want to read more about tightness considerations in threshold ecdsa - I suggest to read first https://eprint.iacr.org/2019/503.pdf which main contribution is a proof with tightness as opposed to Lindell 2P-ECDSA.
+ Bandwidth-efficient threshold EC-DSA
    * https://eprint.iacr.org/2020/084
+ Hierarchical Threshold Secret Sharing
    * https://www.openu.ac.il/lists/mediaserver_documents/personalsites/tamirtassa/hss_conf.pdf


## non-interactive
preprocessing stage before the signed message is known

### 2020/501 vs 2020/492
see "2020_501 vs 2020_492"

### 2020/498 vs GG20
see "gg20_2"
