FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
# COPY pnpm-lock.yaml ./

# RUN npm i pnpm -g

RUN npm i

COPY . .

COPY ./dist ./dist

CMD ["npm", "start:dev"]