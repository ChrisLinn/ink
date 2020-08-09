# Broadcast Encryption

Broadcast Encryption (BE) is a classical problem on how to broadcast an encrypted message such that only a qualified subset S of receivers will be able to decrypt it. Trivially, a sender can encrypt the same message on S different keys but this will not be efficient in number of keys and size of message. 
This problem received a lot of attention over the past 30 years (see map below). The first to define it were Fiat-Naor in 93 : http://www.wisdom.weizmann.ac.il/~naor/PAPERS/broad_abs.html where they offered the notion of resiliency  against k colluding parties outside of S. 
A related problem is Traitor Tracing. 
Another interesting property of BE is Recipient-Privacy (RP) where the BE do not reveal any information about S (cc: @vbuterin, stealth addresses). Boneh-Zhandry were the first to introduce BE with RP that is efficient: https://eprint.iacr.org/2013/642.pdf . This paper is using  indistinguishability obfuscation (iO) to construct BE. iO is a powerful tool and BZ13 provides some beautiful circuits using iO.


a SOTA and practical construction:
https://link.springer.com/chapter/10.1007%2F3-540-45708-9_4

implementations of BE:
a lot, mostly industrial like DVD DRM or tv broadcasts. dunno any open-source one.

there was a cool defcon talk about sidechanneling BE keys from TV boxes
