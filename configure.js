const readline = require('readline');
const fs = require('fs');
let etherjs = require("ethers")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let deploymentMnemonics = ""
let flashlayerEndpoint = ""
let flashlayerChainID = 0
let dfStartTime;
let dfEndTime;
let explorerPrefix;

rl.question('Please crypto mnemonics (Deployer account): ', (mnemonics) => {
    deploymentMnemonics = mnemonics;

    rl.question('Please enter a Flash Layer endpoint: ', (endpoint) => {
        if(!isValidURL(endpoint)){
            console.log("Invalid input, please enter a valid endpoint.");
            rl.close();
            process.exit(1);
        }
        flashlayerEndpoint = endpoint;
        
        rl.question('Enter Flash Layer chain ID: ', (chainID) => {
            if(isNaN(chainID)){
                console.log("Invalid input, please enter an integer.");
                rl.close();
                process.exit(1);
            }
            flashlayerChainID = chainID;

            rl.question('Enter explorer prefix eg. https://flashlayer-1-explorer.altlayer.io/address : ', (explorerPrefix) => {
                if(!isValidURL(endpoint)){
                    console.log("Invalid input, please enter a valid url.");
                    rl.close();
                    process.exit(1);
                }
                explorerPrefix = explorerPrefix;

                rl.question('Enter Dark Forest round start time (YYYY-MM-DD HH:mm:ss TZ): ', (startTime) => {
                    time = new Date(startTime)
                    if (isNaN(time.getTime())){
                        console.log("Invalid start time, please enter a valid date and time.");
                        rl.close();
                        process.exit(1);
                    }

                    dfStartTime = time;

                    rl.question('Enter Dark Forest round end time (YYYY-MM-DD HH:mm:ss TZ): ', (endTime) => {
                        time = new Date(endTime)
                        if (isNaN(time.getTime())){
                            console.log("Invalid end time, please enter a valid date and time.");
                            rl.close();
                            process.exit(1);
                        }
                        dfEndTime = time;

                        rl.close();

                        fs.writeFile('eth/.env', createETHEnv(mnemonics, endpoint, chainID, dfStartTime, dfEndTime), (err) => {
                            if (err) return console.log(err);
                            console.log('eth/.env created!!');
                        });
        
                        fs.writeFile('client/.env', createClientEnv(endpoint, explorerPrefix, dfStartTime, dfEndTime), (err) => {
                            if (err) return console.log(err);
                            console.log('client/.env created!!');
                        });
                    });
                });
            });
        });   
    });
});

function createETHEnv(mnemonics, endpoint, chainID, dfStartTime, dfEndTime){
    var ethENV = "DEPLOYER_MNEMONIC=" + mnemonics+"\n";
    ethENV += "FLASHLAYER_URL=" + endpoint + "\n";
    ethENV += "FLASHLAYER_CHAIN_ID=" + chainID + "\n";
    ethENV += "ALT_FAUCET_PRIV_KEY=" + "\n";
    ethENV += "AL_SERVER_PORT=" + "\n";
    ethENV += "ROUND_START_TIMESTAMP=" + dfStartTime + "\n";
    ethENV += "ROUND_END_TIMESTAMP=" + dfEndTime + "\n";
    return ethENV;
}

function createClientEnv(endpoint, explorerPrefix, dfStartTime, dfEndTime){
    var clientENV = "NODE_ENV=production\n";
    clientENV += "DEFAULT_RPC=" + endpoint + "\n";
    clientENV += "AL_SERVER_URL=\n";
    clientENV += "EXPLORER_ADDR_PREFIX=" + explorerPrefix +"\n";
    clientENV += "ROUND_START_TIMESTAMP=" + dfStartTime + "\n";
    clientENV += "ROUND_END_TIMESTAMP=" + dfEndTime + "\n";
    return clientENV;
}

function isValidURL(url) {
    // Regular expression to match valid URL
    var re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
}

