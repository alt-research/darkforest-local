# AltLayer Deployment Guide

Before running a community round on AltLayer, prepare and commit the following file:

1. `eth/darkforest.<network>.toml` is configured based on template [`eth/darkforest.toml`](https://github.com/alt-research/darkforest-eth/blob/master/darkforest.toml), especially on `TOKEN_MINT_END_TIMESTAMP`, `WORLD_RADIUS_MIN`, `TIME_FACTOR_HUNDREDTHS`.

2. Create in [**eth** directory](https://github.com/alt-research/darkforest-eth) an `.env` following [`.env.example` example](https://github.com/alt-research/darkforest-eth/blob/master/.env.example).

3. Create in [**client** directory](https://github.com/alt-research/darkforest-client) an `.env` following [`.env.example` example](https://github.com/alt-research/darkforest-client/blob/master/.env.example).

4. Update [`packages/constants/src/index.ts`](https://github.com/alt-research/darkforest-packages/blob/master/constants/src/index.ts) the `BLOCK_EXPLORER_URL` to point to our own block explorer.

5. Update the game landing page information and text at [`client/src/Frontend/Pages/LandingPage.tsx`](https://github.com/alt-research/darkforest-client/blob/master/src/Frontend/Pages/LandingPage.tsx)
