# Feedback App in Express 
# code: feedback-app-express

## Preface
This repository is the code repo of web application for Feedback app in Node Express.
This sample uses [Express](https://expressjs.com) as web application framework, [Sequelize]([https://gorm.io/](https://sequelize.org))
This sample application provides only several functions as Web APIs

## Technologies/Stack
1. Node v12.22.12
3. Postgre

## Install
Perform the following steps:
1. Download and install [Visual Studio Code(VS Code)](https://code.visualstudio.com/).
3. Download and install [npm](https://www.npmjs.com/).

## Init DB
Since this application on default store data on a postgres db, perform the following steps:
1. Download and install docker. (https://www.docker.com/)
2. Download and intsall docker-compose (https://docs.docker.com/compose/install/)
3. Run "sudo docker-compose up -d"
4. Run "sudo docker ps" to check if contianer's up and running.
5. P.S define your enviroment variables correctly, template is available in ".env.sample"

## Run backend service
perform the following steps:
1. node server.js

## Test API Routes
perform the following steps:
1. download postman (https://www.postman.com)
2. import postman collection from /postman/ folder in repo
