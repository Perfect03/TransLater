FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml

RUN npm i pnpm -g

RUN pnpm i

COPY . .

COPY ./dist ./dist

CMD ["pnpm", "start:dev"]