# Ongradient REST API Server

## Setup dev environment

1. Setup default dev configuration and install libraries.

```
cp .env.config .env
npm i
```

2. Run local MongoDB server. Admin login and password are taken from _.env_ file as `MONGO_DB_ADMIN` and `MONGO_DB_ADMIN_PWD`. The database name for the project is stored in `DB_NAME`.

```
docker-compose up ongradient-mongo-db
```

3. Connect to the database and setup permissions for the application superuser. According to the _.env_ config:

```
docker exec -it ongradient-mongo-db bash

mongo -u admin

use admin

db.createUser(
  {
    user: "teacher",
    pwd: "teacherPassword",
    roles: [
       { role: "readWrite", db: "ongradient" }
    ]
  }
)
```

Try to use Compass to connect to the database or use

```
docker exec -it ongradient-mongo-db bash

mongo -u teacher
```

to check that it is possible to connect with appropriate credentials.

4. Run API Service

```
docker-compose up ongradient-api-server
```

```
npm run start:dev
```

Starts the server in development using `nodemon` and `ts-node` to do cold reloading.

```
npm run build
```

Builds the api-server at build folder, cleaning the folder first.

```
npm run start
```

Starts the api-server in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

Use links

https://khalilstemmler.com/blogs/typescript/node-starter-project/

https://github.com/afteracademy/nodejs-backend-architecture-typescript
