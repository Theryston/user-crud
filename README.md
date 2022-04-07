# About

Make user management without worrying about api or backend, with this api you can create, delete and update users from a mysql database.

[Postman collection](https://www.postman.com/Theryston/workspace/open-source/collection/15581030-298aa917-978c-41cc-97fb-3c2b09380dcc?action=share&creator=15581030)

# Get started

Learn here how to install, install dependencies, and run the api on your local machine.

## Cloning repository

Open your terminal in the folder where you want to start the api, after that type the following command in your terminal:

```sh
git clone https://github.com/Theryston/user-crud.git # clone repository
cd user-crud # change directory to project page
```

## Start in development

for development purposes you can run the project from the following steps:

1. install dependencies. Run the command:

```sh
yarn
```

2. You need to create a file by name `.env` in root project directory, and add the following content:

```txt
DATABASE_URL=mysql://root:mysql@localhost:3002/user-crud
```

if you want you can run the following command to create the file from the command line:

```sh
echo DATABASE_URL=mysql://root:mysql@localhost:3002/user-crud > .env
```

3. Database. Run the command:

```sh
yarn database # start database
yarn prisma generate # generate prisma client
yarn prisma migrate dev # run database migrations
```

4. running development server:

```sh
yarn start:dev
```

after this steps your server will be started in [http://localhost:3000](http://localhost:3000) and you can see all routes in [postman collection](https://www.postman.com/Theryston/workspace/open-source/collection/15581030-298aa917-978c-41cc-97fb-3c2b09380dcc?action=share&creator=15581030)

# Footer

thanks for read!
