FROM node

WORKDIR /usr/src/app

COPY package.json ./

ENV DATABASE_URL=mysql://root:mysql@localhost:3002/user-crud

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]