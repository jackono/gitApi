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
      }
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
 * /orgs/{org-name}/comments:
 *  post:
 *    description: Use to allow the user to persist comments against a given organization
 *    responses:
 *      '200':
 *        description: All comments have been saved in MongoDB
 *      '404':
 *        description: Organization does not exist in Github
 *    parameters:
 *     - in: path
 *       name: org-name
 *       required: true
 *       type: string
 *       description: The Github Organization name
 *     - in: body
 *       name: body
 *       description: Comment to Github Org
 *       schema:
 *        type: object
 *        required:
 *            - comment
 *        properties:
 *            comment:
 *              type: string
 *        example: {
 *          comment: Looking to hire SE Asia's top dev talent!
 *        }
 */
 
 /**
 * @swagger
 * /orgs/{org-name}/comments:
 *  get:
 *    description: Use to return an array of all the comments that have been registered against the organization
 *    responses:
 *      '200':
 *        description: All comments associated with the organization have been retrieved
 *      '404':
 *        description: Organization does not exist in MongoDB
 *    parameters:
 *     - in: path
 *       name: org-name   # Note the name is the same as in the path
 *       required: true
 *       type: string
 *       description: The Github Organization name
 */
 
 /**
 * @swagger
 * /orgs/{org-name}/comments:
 *  delete:
 *    description: Use to soft delete all comments associated with a particular organization
 *    responses:
 *      '200':
 *        description: All comments associated with the organization have been deleted
 *      '404':
 *        description: Organization does not exist in MongoDB / Organization comments soft deleted
 *    parameters:
 *     - in: path
 *       name: org-name   # Note the name is the same as in the path
 *       required: true
 *       type: string
 *       description: The Github Organization name
 */
 
  /**
 * @swagger
 * /orgs/{org-name}/members:
 *  get:
 *    description: Use to return an array of member of an organization
 *    responses:
 *      '200':
 *        description: All members of an organization have been retrieved
 *      '404':
 *        description: Organization does not exist in Github
 *    parameters:
 *     - in: path
 *       name: org-name   # Note the name is the same as in the path
 *       required: true
 *       type: string
 *       description: The Github Organization name
 */
 
module.exports = server;
