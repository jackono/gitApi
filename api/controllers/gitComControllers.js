'use strict';

var https = require('https');
const fetch = require("node-fetch");
var mongoose = require('mongoose'),
  Task = mongoose.model('Comments');

exports.list_all_comments = function(req, res) {
  Task.find({orgname: req.params.orgname, isDeleted: 0}, '_id comment Created_date', function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.post_a_comment = function(req, res) {
  var params = req.body;
  params.orgname = req.params.orgname;

  var new_task = new Task(params);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.user_details = (req, res) => {

  var users = [];
  var options = {
    host: 'api.github.com',
    path: '/orgs/' + req.params.orgname + '/members',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
  };
  var request = https.request(options, (response) =>{
 
    var body = ''; 
    
    
    response.on("data", (chunk) => {
        body += chunk.toString('utf8');
    });
    
    response.on("end", function(err){
        
        if (response.statusCode != 200)
           res.send(err);
        var members = JSON.parse(body);
        // members.forEach(function(list_user) {
        for(var list_user of members){
          var options = {
            host: 'api.github.com',
            path: '/users/' + list_user.login,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
          };
          // var request = https.request(options, function(response){
          //   var body = ''; 
         
          //   response.on("data", function(chunk){
          //       body += chunk.toString('utf8');
          //   });
          //   response.on("end", function(err){
          //     if (err)
          //       res.send(err);
          //     var user = JSON.parse(body);
          //     var git_user = {
          //       login: list_user.login,
          //       avatar_url: list_user.avatar_url,
          //       num_followers: user.followers,
          //       num_following: user.following
          //     };
          //     // console.log(git_user);
          //     users.push(git_user);
          //     console.log(users);
          //     });
          //   });
          
          const url = 'https://api.github.com/users/' + list_user.login;

          const getData = async url => {
          try {
            const response = await fetch(url);
            const user = await response.json();
            var git_user = {
              login: list_user.login,
              avatar_url: list_user.avatar_url,
              num_followers: user.followers,
              num_following: user.following
            };
            users.push(git_user);
            console.log(users);
          } catch (error) {
              console.log(error);
            }
          };

          getData(url);
          // console.log(users);
          // request.end();
          }
        console.log(users);
        // res.json(users);
        // console.log(JSON.parse(body));
        });
    });

    request.end();
    res.json(users);
    
};


exports.delete_all_comments = function(req, res) {
  Task.updateMany({orgname: req.params.orgname}, {isDeleted : 1}, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: req.params.orgname + '\'s comment/s successfully deleted' });
  });
};

