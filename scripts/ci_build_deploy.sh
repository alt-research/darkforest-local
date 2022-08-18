#!/bin/bash

function whitelist_address() {
	while read address; do
		yarn workspace eth hardhat:prod whitelist:register --address "${address}"
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

yarn deploy:prod:contracts
#yarn deploy:prod-whitelist:contracts && whitelist_address

yarn workspace client build

