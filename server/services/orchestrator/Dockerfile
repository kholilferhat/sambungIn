FROM node:latest

WORKDIR /www/service-orchestrator

COPY package*.json /www/service-orchestrator/

RUN npm install

RUN npm install -g nodemon

COPY ./ ./

CMD [ "nodemon" , "app.js" ]