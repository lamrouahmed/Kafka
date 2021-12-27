### The Rdfkafka module is written in c++, execute the following commands to install the c++ build-tools


npm install --global windows-build-tools

npm config set msvs_version 2017  


### Install the project dependencies

cd /kafka

npm install

cd ./client

npm install

**Execute Docker-compose** ./start-kafka.sh

**Create a Kafka Topic** ./create-topic.sh

**Launch the Producer** UV_THREADPOOL_SIZE=128 node ./producer/index.js

**Launch the Consumer** UV_THREADPOOL_SIZE=128 node ./consumer/index.js

**Launch react app** cd /client => npm start

**Open the app in the browser** localhost:3000

**Open the stats app the browser** localhost:3000/stats
