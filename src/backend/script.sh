envBackendPath=/home/src/backend/src/.env
echo SERVER_HOST=$SERVER_HOST > $envBackendPath
echo SERVER_PORT=$SERVER_PORT >> $envBackendPath
echo DB_HOST=$DB_HOST >> $envBackendPath
echo DB_PORT=$DB_PORT >> $envBackendPath
echo DB_USERNMAE=$DB_USERNMAE >> $envBackendPath
echo DB_PASSWORD=$DB_PASSWORD >> $envBackendPath
echo DB_DATABASE=$DB_DATABASE >> $envBackendPath
echo CLIENT_ID=$CLIENT_ID >> $envBackendPath
echo TOKEN_SECRET=$TOKEN_SECRET >> $envBackendPath
echo CLIENT_SECRET=$CLIENT_SECRET >> $envBackendPath
echo CALLBACK_URL=$CALLBACK_URL >> $envBackendPath

sleep 30
until PGPASSWORD="ayoub" pg_isready -h localhost -p 5432 -U postgres &>/dev/null; do
  echo "Waiting for PostgreSQL to start..."
  sleep 2
done

echo "PostgreSQL is now ready!"

cd /home/src/backend

npm run start

# tail -f