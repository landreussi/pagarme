FROM node:10.4.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm i --silent
RUN npm run build
RUN rm -rf tests
RUN rm -rf api
RUN mv dist api -f

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/npm", "start"]