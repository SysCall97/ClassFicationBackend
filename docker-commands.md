## create docker netword
docker network create classfication-network

## run mongoDb
docker run -d \
-p27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--net classfication-network \
--name mongoDb \
mongo

## run mongo-express
docker run -d \
-p8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_PORT=27017 \
--net classfication-network \
-e ME_CONFIG_MONGODB_SERVER=mongoDb \
--name mongo-express \
mongo-express:0.54

## alternative
Instead of running the above command you can run this following(as there is a yaml file written):
docker-compose -f mongo.yaml up

## start mongoDb container
docker start mongoDb

## start mongo-express container
docker start mongo-express