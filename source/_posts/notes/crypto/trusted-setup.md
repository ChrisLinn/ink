# Trusted Setup

## modulus

modular exponentiation when the modulus is secret shared

1. [Multiparty Generation of an RSA Modulus](https://eprint.iacr.org/2020/370.pdf)
2. [Diogenes: Lightweight Scalable RSA Modulus Generation with a Dishonest Majority](https://eprint.iacr.org/2020/374.pdf)
    + Multiparty RSA modulus generation that scales to thousands of parties and tolerate dishonest majority.
        * the best kind of security (n-1 active security with identifiable abort)
    + VDF alliance uses this
        * https://github.com/ligeroinc/LigeroRSA
        * https://notes.ethereum.org/@JustinDrake/HJhHGOljB
        * https://twitter.com/drakefjustin/status/1245803422894428163

see: [rsa-modulus-kzen-chat](./rsa-modulus-kzen-chat/messages.html)

## ZKP proving/verifying keys

+ https://github.com/appliedzkp/semaphore-phase2-setup/
+ https://hackmd.io/oja21FipQ5KhQcXeyuQWFQ

At least one ceremony participant must securely discard the toxic waste produced during the process in order for the final result to be trustworthy and secure.
