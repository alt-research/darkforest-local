#!/bin/bash

#function whitelist_address() {
#	while read address; do
#		yarn workspace eth hardhat:prod whitelist:register --address "${address}"
#	done <"scripts/addresses.txt"
#}

function whitelist_address() {
        i=0
        ADDRESS=""
        while read address; do
                i=$((i+1))
		if [ $i == 1 ]; then
			ADDRESS="${address}"
		else
                	ADDRESS+=",${address}"
		fi
                if [ $i == 50 ]; then
			yarn workspace eth hardhat:prod whitelist:register --address "$ADDRESS"
                        ADDRESS=""
                        i=0
			sleep 120
			echo "================================================================================"
                fi
        done <"scripts/addresses.txt"
}

darkforest_local_hash=$(git rev-parse HEAD)
darkforest_circuits_hash=$(git rev-parse HEAD:circuits)
darkforest_client_hash=$(git rev-parse HEAD:client)
darkforest_eth_hash=$(git rev-parse HEAD:eth)
darkforest_packages_hash=$(git rev-parse HEAD:packages)

echo "   darkforest-local hash: $darkforest_local_hash"
echo "darkforest-circuits hash: $darkforest_circuits_hash"
echo "  darkforest-client hash: $darkforest_client_hash"
echo "     darkforest-eth hash: $darkforest_eth_hash"
echo "darkforest-packages hash: $darkforest_packages_hash"


echo "DEPLOYER_MNEMONIC=$DEPLOYER_MNEMONIC" > eth/.env
echo "AL_SERVER_PORT=$AL_SERVER_PORT" >> eth/.env
echo "ROUND_START_TIMESTAMP=$ROUND_START_TIMESTAMP" >> eth/.env
echo "ROUND_END_TIMESTAMP=$ROUND_END_TIMESTAMP" >> eth/.env

echo "NODE_ENV=$NODE_ENV" > client/.env
echo "DEFAULT_RPC=$DEFAULT_RPC" >> client/.env
echo "AL_SERVER_URL=$AL_SERVER_URL" >> client/.env
echo "EXPLORER_ADDR_PREFIX=$EXPLORER_ADDR_PREFIX" >> client/.env
echo "ROUND_START_TIMESTAMP=$ROUND_START_TIMESTAMP" >> client/.env
echo "ROUND_END_TIMESTAMP=$ROUND_END_TIMESTAMP" >> client/.env


#yarn deploy:prod:contracts
yarn deploy:prod-whitelist:contracts && whitelist_address

yarn workspace client build

