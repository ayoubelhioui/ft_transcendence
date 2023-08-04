envFrontendndPath=/home/src/frontend/.env
echo VITE_HOST=$VITE_HOST > $envFrontendndPath
echo VITE_SERVER_PORT=$VITE_SERVER_PORT >> $envFrontendndPath
echo VITE_APP_PORT=$VITE_APP_PORT >> $envFrontendndPath
echo VITE_API="$VITE_API" >> $envFrontendndPath

npm run dev

# tail -f
