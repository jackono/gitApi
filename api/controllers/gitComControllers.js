'use strict';

const e = require('express');
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


exports.user_details = function(req, res) {

  var users = [];
  var options = {
    host: 'api.github.com',
    path: '/orgs/' + req.params.orgname + '/members',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
  };
  var request = https.request(options, function(response) {
 
    var body = ''; 
    var sortedFollowers = ''
    
    
    response.on("data", function (chunk) {
        body += chunk.toString('utf8');
    });
    
    response.on("end", async function(err){
        
        if (response.statusCode != 200)
           res.send(err);
        var members = JSON.parse(body);
        // process.nextTick(function next(){

        members.forEach(function(list_user) {
        // for(var list_user of members){
          options.path = '/users/' + list_user.login;
          // return new Promise((resolve, reject) => {
          var request = https.request(options, function(response){
            var body = ''; 
         
            response.on("data", function(chunk){
                body += chunk.toString('utf8');
            });
            response.on("end", function(err){
              if (err)
                res.send(err);
              var user = JSON.parse(body);
              var git_user = {
                "login": list_user.login,
                "avatar_url": list_user.avatar_url,
                "num_followers": user.followers,
                "num_following": user.following
              };
              // console.log(git_user);
              users.push(git_user);
              // sortedFollowers = users.sort((low, high) => high.num_followers - low.num_followers);
              // console.log(users);
              });
            });
          
          // const url = 'https://api.github.com/users/' + list_user.login;

          // const getData = async url => {
          // try {
          //   const response = await fetch(url);
          //   const user = await response.json();
          //   git_user = {
          //     login: list_user.login,
          //     avatar_url: list_user.avatar_url,
          //     num_followers: user.followers,
          //     num_following: user.following
          //   };
          //   users.push(git_user);
          // } catch (error) {
          //     console.log(error);
          //   }
          //   console.log(users);
          // };

          // getData(url);
          // users.push(git_user);
          // console.log(users);
          // process.nextTick(next);
          // console.log(users);
          request.end();
        });
        // }
        await timeout(2000);
        // sortedFollowers = Object.keys(users).map(function (key){
        //   return users[key];
        // }).sort((low, high) => high.num_followers < low.num_followers);
        sortedFollowers = users.sort((low, high) => high.num_followers - low.num_followers);
        console.log(sortedFollowers);
        res.json(sortedFollowers);
        // console.log(JSON.parse(body));
        });
    });
    // console.log(users);
    request.end();
    // res.json(users);
    
};


exports.delete_all_comments = function(req, res) {
  Task.updateMany({orgname: req.params.orgname}, {isDeleted : 1}, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: req.params.orgname + '\'s comment/s successfully deleted' });
  });
};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}