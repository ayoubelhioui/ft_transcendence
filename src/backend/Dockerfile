FROM node:18

WORKDIR /home/src/backend
COPY package*.json ./
RUN npm i
# RUN npm i @nestjs/websockets
COPY . .

COPY ./script.sh /home

COPY ./assets/* ./uploads
RUN chmod +x /home/script.sh

CMD /home/script.sh
