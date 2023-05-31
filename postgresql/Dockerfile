FROM debian

RUN apt update -y \
    && apt upgrade -y 

RUN apt install lsb-release -y \
    && apt install wget -y \
    && apt install gnupg2 -y

RUN  sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' \
    && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && apt update

RUN apt install postgresql-15 -y \
    && apt install vim -y


COPY ./tools/run_postgresql.sh /home
RUN chmod +x /home/run_postgresql.sh

USER postgres

COPY ./config/postgresql.conf /etc/postgresql/15/main/
COPY ./config/pg_hba.conf /etc/postgresql/15/main/

CMD /home/run_postgresql.sh
