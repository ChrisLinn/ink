# DApps

# satoshi dice

# fair pocker

# LAPP

+ code
    * https://github.com/bcongdon/awesome-lightning-network
    * https://github.com/ElementsProject/woocommerce-gateway-lightning
    * https://github.com/ElementsProject/wordpress-lightning-publisher
    * https://github.com/ElementsProject/filebazaar
    * https://github.com/ElementsProject/paypercall
    * https://github.com/ElementsProject/lightning-jukebox
    * https://github.com/ElementsProject/nanotip
    * https://github.com/ElementsProject/ifpaytt
+ knowledge
    * https://segmentfault.com/a/1190000016454672
    * https://medium.com/cryptocow/lightning-vs-raiden-1-can-watchtowers-and-monitoring-services-scale-f3b59906114b
    * https://s1.rylink.com/info_detail/239
    * instamyna
        ```
        //to verify -> copy your values and set seedObject as below:
        var seedObject = {
          serverSeed: "1d26867264f68d6d1f503582dd6903ee", clientSeed: "42a00c71f192f75fca40fbf83b0cf8d3"};

        verifyServerSeedvsHash(seedObject);

        for(var i=1; i < 100; i++) {
          calcSeed(seedObject.serverSeed, seedObject.clientSeed, i);
        }

        function verifyServerSeedvsHash(seedObject) {
          var server_seed = seedObject.serverSeed;
            let hash = crypto.createHash('SHA256');
              hash.update(server_seed);
              var server_seed_hashed = hash.digest().toString('hex');
              console.log("server_seed: ", server_seed, "\nserver_seed_hashed: ", server_seed_hashed);
        }

        function calcSeed(server_seed, client_seed, nonce) {

              //var nonce = 1;
              var newclientseed = client_seed + "-" + nonce;
              //console.log("calcSeed newclientseed: ", newclientseed);

              let hmac = crypto.createHmac('SHA512', server_seed);
              hmac.update(newclientseed);
              let buf = hmac.digest();
              var finalOutput = buf.readUInt32BE() / Math.pow(2, 32) * 100;
              var winorlose = "lose";
              if(finalOutput < 45) {
                winorlose = "win";
              } 
              console.log("Bet Result: ",nonce, finalOutput, winorlose);
              return finalOutput;

        }
        ```
