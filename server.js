const dotenv = require('dotenv').config();

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/gitComModels'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/gitComRoutes'); //importing route
routes(app); //register the route


const server = app.listen(port, function(){
  console.log('Github comments RESTful API server started on: ' + port);
}); 

module.exports = server;