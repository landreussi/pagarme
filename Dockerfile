FROM node:10.4.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm i --silent --only=prod

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/npm", "start"]