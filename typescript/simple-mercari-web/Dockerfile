# install dependencies and build
FROM node:16-alpine as builder

WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci

COPY public public
COPY src src
RUN npm run build

# 実行環境
FROM node:16-alpine

WORKDIR /app
COPY --from=builder /app/build ./build
RUN npm install -g serve && npm cache clean --force

RUN addgroup -S mercari && adduser -S trainee -G mercari
USER trainee

CMD ["serve", "-s", "build", "-l", "3000"]
