const dotenv = require('dotenv').config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/gitComModels'), //created model loading here
  bodyParser = require('body-parser');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Github API",
      description: "Github API Information",
      contact: {
        name: "Jackono Fabella"
      },
      servers: ["http://localhost:3030"]
    }
  },
  // ['.routes/*.js']
  apis: ["server.js"]
};

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL); 

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/gitComRoutes'); //importing route
routes(app); //register the route


const server = app.listen(port, function(){
  console.log('Github comments RESTful API server started on: ' + port);
}); 

// Routes
/**
 * @swagger
 * /orgs/{orgname}/comments:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *     - in: path
 *       name: orgname   # Note the name is the same as in the path
 *       required: true
 *       type: string
 *       description: The Github Organization name.
 */

module.exports = server;