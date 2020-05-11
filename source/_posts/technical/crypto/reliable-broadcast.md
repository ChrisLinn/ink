# Reliable Broadcast

+ Gossip protocols dont really give us reliable broadcast
+ reliable broadcast
    * fully synchronous protocols doesn't scale to many nodes
        * the numbers of a gossip protocol are not that bad
    * from a number of nodes, coordinating clocks for epochs and communication rounds becomes a larger overhead than actual communication
        - RAFT ...
        - you cannot solve this issue trivially in an async manner (FLP theorem)
        - fully reliable broadcast either needs a fully sync topology, or that the nodes are aware of the topology (which also don't scale in blockchain)
- the best practice for this right now is to use an epidemic-style propagation
    - give 1-2 percent of reliability up and go async to get around FLP
        - https://www.cs.cornell.edu/Info/Projects/Spinglass/public_pdfs/SWIM.pdf
            - they provided a model to approximate consistency based on some variables like node numbers, latency, packet loss etc
            - and you can see that a good epidemic-style model (which we mostly copy from actual virology studies like the current covid case)
            - (in special cases and restrictions) within 4 secs you can propagate a message to hundreds of millions of nodes 