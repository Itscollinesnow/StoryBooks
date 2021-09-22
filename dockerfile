FROM node:alpine

WORKDIR /demoapp

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"] 
