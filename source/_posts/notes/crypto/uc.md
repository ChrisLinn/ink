# UC framework

UC 原文： https://eprint.iacr.org/2000/067.pdf

UC 有什么问题吗，我也不知道，但是 JP Aumasson 一直不喜欢。他觉得 has UC ever been of any practical interest?

+ https://twitter.com/veorq/status/1247871206348460032
    + https://twitter.com/veorq/status/1247872415235026944
    + phrased differently: what are examples of failures that could have been avoided by paying attention to UC theory? I mean non-trivial stuff, not silly things like reusing an AES key as an RSA key
        * lindell 回了他
            - https://twitter.com/veorq/status/1247873349247586306

Silur 觉得 the simplified version (which is basically the original version with a more "real-world" adversary) 是有 practical interest 的，且 it's of practical interest in formal verification。in UC you can assume (and prove) one of your components to be computationally secure and build up.... but the paper kinda assumes you have deterministically compiled "UC-like" parts already (which you dont) and build up a complex source from them? Silur 丢出了一篇论文，http://arxiv.org/abs/1910.08634v2 但又提到 naive。也许指的是 Universally Composable NIZK？
关于 Universally Composable NIZK， Omer 说它 following an internal discussion  on ridiculous yet impressive (if you do not need to use them ) UC constructions 

Omer was directed to http://www0.cs.ucl.ac.uk/staff/J.Groth/NIZKJournal.pdf section 8 to discover that UC NIZK requires :  
- Perfectly hiding commitment scheme with extraction
- Encryption with pseudorandom ciphertexts
- Tag-based simulation-sound trapdoor commitment
- Strong one-time signatures