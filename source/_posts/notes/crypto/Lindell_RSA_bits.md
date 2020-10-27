# Yehuda Lindell talks about RSA bits

https://twitter.com/LindellYehuda/status/1298672778611220480

I learnt something new about RSA today, and thought I'd share. I assume if I didn't know it, then maybe some others don't as well. In many cases, we need to generate an RSA key that is EXACTLY 2048 bits.

If it's smaller (2047) then it will be rejected by (some) certificate authorities and won't be FIPS compatible, etc., so you need exactly 2048.

The way to generate 2048-bit RSA keys is to choose two random 1024-bit primes and multiply them. Simple! Well, despite the obvious math to the contrary, this doesn't actually guarantee that the result is 2048 bits. I feel a bit dumb, but that's the reality.

Consider multiplying 8 * 8: each are 4 bits long, but 64 is just 7 bits long. Likewise 11 * 11 = 121 (each 4 bits, but the result is 7 bits). So, you actually need to choose each prime so that the top 2 bits are set to 1. This will guarantee that it's 2048 bits and no less.

OpenSSL works this way; here you can see the function for generating the random numbers (it is called with top = 1). Simple, but I never knew this.

![](https://pbs.twimg.com/media/EgXP1iFWoAcCGPn?format=png&name=900x900)