FROM node:14-alpine
MAINTAINER Olha Kostiv

RUN apk add bash

RUN mkdir /app
WORKDIR /app

COPY ./package.json /app

RUN npm install --production

COPY . /app/

CMD ["npm", "run", "start"]
