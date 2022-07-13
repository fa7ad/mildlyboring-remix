FROM node:lts-alpine

ARG port=3000
ENV PORT=$port

WORKDIR /app

RUN apk add --no-cache yarn curl git tini

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build
EXPOSE $PORT

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["yarn", "start"]