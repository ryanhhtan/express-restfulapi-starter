# express-restfulapi-starter 

## Summary
This a starter for creating RESTful API backend application with an example of basic CRUD for the resource of posting.
Features include:
- Basic setup with Nodejs, Express, MongoDB/Mongoose.
- ES6 support with Babel.
- Webpack bundle
- Development support, e.g: Nodemon, source-map, prod/dev configuration separation, etc. 

## Usage
### Prerequisite
- One of a Node Package Manage tools is installed, e.g: yarn, npm. 
- Install nodemon globally
    npm install -g nodemon
### Steps
#### Clone the project
```
git clone https://github.com/ryanhhtan/express-restfulapi-starter.git
```
#### Build the project
```
npm install
```
OR
```
yarn
```
#### Set up MongoDB
The example uses [mlab](https://mlab.com/) as the database server.
#### Add the development configuration file 
Add the file ./config/config.dev.js to the project (See the example file). This file is ignored for security reason and should be added manually each time a new project is rebulid. 
#### Run in develop mode.
```
npm run dev 
```
#### Build the project
```
npm run build 
```
#### Deployment (Heroku) 
This example uses Heroku as the deployment environment. To deployment steps:
- Install Heroku CLI 
- Login with Heroku CLI: 
```
heroku login
```
- Create an app:
```
heroku apps:create [app name]
```
- Push the repo to heroku: 
```
git push heroku
``` 
A better solution is to hook the app deployment in Heroku with a github branch so that Heroku will automatically deploy the newly committed app. 
