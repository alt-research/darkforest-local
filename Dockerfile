FROM node:16


WORKDIR app
COPY . ./

RUN npm install -g yarn
RUN yarn install
RUN ./scripts/ci_build_deploy.sh

EXPOSE 3011

CMD ["yarn", "start:api"]
