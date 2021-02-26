FROM node:12

ARG DB=DBCONNECTIONSTRING

ENV DB_CONNECTION_STRING=${DB}

WORKDIR /app

COPY package*.json .

RUN npm install --prod

COPY . .

CMD [ "npm", "start" ]