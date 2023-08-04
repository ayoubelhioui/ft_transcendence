FROM node:18

WORKDIR /home/src/frontend
COPY package*.json ./
RUN npm i
COPY . .

COPY ./script.sh /home
RUN chmod +x /home/script.sh

CMD /home/script.sh