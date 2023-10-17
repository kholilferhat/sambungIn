FROM node:latest

WORKDIR /www/service-user

ENV MONGO_CONNECT=mongodb+srv://kholilferhat:Inmemoriam1@individual-project.cfkptk4.mongodb.net/

COPY package*.json /www/service-user

RUN npm install

RUN npm install -g nodemon

COPY ./ ./

CMD [ "npm" , "start" ]