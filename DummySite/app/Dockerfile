FROM node:16

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV="production"

ENTRYPOINT ["node", "./build/index.js"]