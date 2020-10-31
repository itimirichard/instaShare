FROM node:alpine

WORKDIR "/app"

COPY package*.json ./

RUN npm install

COPY . .

RUN cd client && npm install && cd ..

CMD ["npm", "run", "dev"]