#!/bin/bash

echo "Start Script...."
PATH="$PATH:/usr/lib/postgresql/15/bin"

service postgresql start
psql -c "ALTER USER postgres PASSWORD '$POSTGRESQL_PASS';"
psql -c "CREATE DATABASE $DB_NAME1;"
psql -c "CREATE DATABASE $DB_NAME2;"
service postgresql stop

postgres -D /etc/postgresql/15/main 
# tail -f