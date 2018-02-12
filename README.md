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
1. One of a Node Package Manage tools is installed, e.g: yarn, npm. 
2. Install nodemon globally
    npm install -g nodemon
### Steps
1. Clone the project
2. Build the project
   - npm install
   OR 
   - yarn
3. Add the development configuaration file (./config/config.dev.js, see the example file). This file is ignored for security and should be added manually each time a new project is rebulid. 
4. Run in develop mode. 
   - npm run dev 
5. Build the project
   - npm run build 
6. Deployment (Heroku example, will add later)
