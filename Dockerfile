FROM node:16

COPY . .

WORKDIR /app

RUN yarn
RUN yarn build

EXPOSE 3000

CMD yarn start
