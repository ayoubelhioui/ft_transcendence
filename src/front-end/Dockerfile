FROM node:18

RUN apt update -y

WORKDIR /home/src/frontend
COPY ./code/package*.json ./
RUN npm i
RUN npm i -g vite

COPY ./code/. ./
COPY ./script.sh /home

RUN chmod +x /home/script.sh
CMD /home/script.sh