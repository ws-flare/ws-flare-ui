FROM alpine

RUN apk add nodejs-lts

COPY . .

CMD ["node", "./dist/server.js"]
