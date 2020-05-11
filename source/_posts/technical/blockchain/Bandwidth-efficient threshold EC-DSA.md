# Bandwidth-efficient threshold EC-DSA

replacing the gg18 range proof with a class-group based one

Range proofs are not required anymore. 

They basically take the new assumptions (low order assumption and strong root)  and do some magics to GG18

???
    before
        the range proof was required
            because the order is known
                which allowed me to construct negative balance notes?
                    Unlike Provisions/Bulletproofs, the range proofs in threshold ECDSA don't have to do with negative balances (you're just producing a signature; there's no notion of a balance).
                        They're there because there's a mismatch between the ECDSA modulus and the Paillier modulus, and you don't want someone to be able to overflow the modulus and learn information about someone else's secret
    now
        GUO
            cannot construct negative balance notes?


replace one construction with a class group based construction
significant communication gain by reducing number of rounds  
