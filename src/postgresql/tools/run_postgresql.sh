#!/bin/bash

PATH="$PATH:/usr/lib/postgresql/15/bin"

service postgresql start
psql -c "ALTER USER postgres PASSWORD '$PG_PASSWORD';"
psql -c "CREATE DATABASE $PG_DATABASE;"
service postgresql stop


postgres -D /etc/postgresql/15/main

