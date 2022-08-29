# AltLayer Deployment Guide

Before running a community round on AltLayer, prepare and commit the following file:

- `eth/darkforest.<network>.toml` is configured based on template [`eth/darkforest.toml`](https://github.com/alt-research/darkforest-eth/blob/master/darkforest.toml), especially on `TOKEN_MINT_END_TIMESTAMP`, `WORLD_RADIUS_MIN`, `TIME_FACTOR_HUNDREDTHS`.

- `eth/api/config/<network>.json` is configured similar to [`eth/api/config/localhost.json`](https://github.com/alt-research/darkforest-eth/blob/master/api/config/localhost.json).

- Update [`client/embedded_plugins/Leader-Board.js`](https://github.com/alt-research/darkforest-client/blob/master/embedded_plugins/Leader-Board.js) that `AL_SERVER_URL` (around L#17) has a valid value for the deployed DF server endpoint.

- Update [`packages/constants/src/index.ts`](https://github.com/alt-research/darkforest-packages/blob/master/constants/src/index.ts) the `BLOCK_EXPLORER_URL` to point to our own block explorer.

- Update [`client/src/Frontend/Panes/OnboardingPane.tsx`](https://github.com/alt-research/darkforest-client/blob/master/src/Frontend/Panes/OnboardingPane.tsx) the `explorerAddressLink` to point to our own block explorer at around L#52.

- Update the game landing page information [`client/src/Frontend/Pages/LandingPage.tsx`](https://github.com/alt-research/darkforest-client/blob/master/src/Frontend/Pages/LandingPage.tsx)

At deployment, check the CI generate the following:

- `eth/.env.<network>` is configured based on template [`eth/.env.example`](https://github.com/alt-research/darkforest-eth/blob/master/.env.example). `network` is the hardhat network name.
