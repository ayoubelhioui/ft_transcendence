FROM node:18

RUN apt update -y
RUN apt install postgresql-client -y

WORKDIR /home/src/backend
COPY ./code/package*.json ./
RUN npm i

COPY ./code/. ./
COPY ./script.sh /home
COPY ./assets/. ./uploads/

RUN chmod +x /home/script.sh
CMD /home/script.sh
