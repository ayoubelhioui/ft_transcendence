#!/bin/bash

PG_CONN="postgresql://$PG_USER:$PG_PASSWORD@$PG_HOST:$PG_PORT/$PG_DATABASE"

while  ! pg_isready -q -d "$PG_CONN" ; do
    echo "-> $PG_CONN"
    echo "Waiting for PostgreSQL to start..."
    sleep 1
done

echo "PostgreSQL is ready!"

cd /home/src/backend

npm run start

#tail -f
