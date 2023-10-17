FROM node:latest

WORKDIR /www/service-app

ENV NODE_ENV=production
ENV DATABASE_URL=postgres://joyfiomy:6_Q7vjUekr19Gf15aKUsD_TKcp9HkL5B@rosie.db.elephantsql.com/joyfiomy

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY ./ ./

CMD [ "nodemon" , "app.js" ]