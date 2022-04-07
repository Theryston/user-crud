<div style="text-align: center">
<img src="https://user-images.githubusercontent.com/72868196/162207745-79a23a8f-5b90-461e-8acb-3b636bac8709.png"/>
</div>

# About

Make user management without worrying about api or backend, with this api you can create, delete and update users from a mysql database.

[Postman collection](https://www.postman.com/Theryston/workspace/open-source/collection/15581030-298aa917-978c-41cc-97fb-3c2b09380dcc?action=share&creator=15581030)

# Get started

Learn here how to install, install dependencies, and run the api on your local machine.

## Cloning repository

Open your terminal in the folder where you want to start the api, after that type the following command in your terminal:

```sh
git clone https://github.com/Theryston/user-crud.git
```

## Start in development

for development purposes you can run the project from the following steps:

1. install dependencies. Run the command:

```sh
yarn
```

2. Database. Run the command:

```sh
yarn database # start database
yarn prisma migrate dev # run database migrations
```

3. You need to create a file by name `.env` in root project directory, and add the following content:

```txt
DATABASE_URL=mysql://root:mysql@localhost:3002/user-crud
```

4. running development server:

```sh
yarn start:dev
```

after this steps your server will be started in [http://localhost:3000](http://localhost:3000) and you can see and test all routes in [postman collection](https://www.postman.com/Theryston/workspace/open-source/collection/15581030-298aa917-978c-41cc-97fb-3c2b09380dcc?action=share&creator=15581030)

# Footer

thanks for read!
