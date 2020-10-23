'use strict';

const dotenv = require('dotenv').config();
var async = require("async");
const e = require('express');
var https = require('https');
const fetch = require("node-fetch");
var mongoose = require('mongoose'),
  Task = mongoose.model('Comments');

exports.list_all_comments = function(req, res) {
  Task.find({orgname: req.params.orgname, isDeleted: 0}, '_id comment dateUpdated', function(err, task) {
    if (err)
      res.send(err);
    if (task.length < 1)
      res.status(404).json({"error": "Organization not in database"});
    else
      res.json(task);
  });
};


exports.post_a_comment = function(req, res) {
  var gitRes = req.body;
  gitRes.orgname = req.params.orgname;

  const url = process.env.GITHUB_API_ORG + gitRes.orgname;

    const getData = async url => {
      try {
        const response = await fetch(url);
        const user = await response.json();

        if(response.status != 200){
          res.status(response.status).json({
            "message": "Organization Not Found in Github",
            "documentation_url": "https://docs.github.com/rest/reference/orgs#get-an-organization"
          });
        }
        else{
          var new_task = new Task(gitRes);
          new_task.save(function(err, task) {
            if (err)
              res.send(err);
            res.json(task);
          });
        }
        } catch (error) {
            console.log(error);
          }
    };
    getData(url);
};

exports.user_details = async function(req, res) {


  const url = process.env.GITHUB_API_ORG + req.params.orgname + '/members';
  const getData = async url => {
    try {
      const response = await fetch(url);
      const members = await response.json();

      if(response.status != 200){
        res.status(response.status).send(members);
      }
      else{
        async.mapLimit(members, 5, async function(list_user) {
           
          const url = process.env.GITHUB_API_USER + list_user.login;
  
          const response = await fetch(url);
          const user = await response.json();
          var git_user = {
            login: list_user.login,
            avatar_url: list_user.avatar_url,
            num_followers: user.followers,
            num_following: user.following
          };
          return git_user

          }, (err, results) => {
              if (err) throw err
                res.send(results.sort((low, high) => high.num_followers - low.num_followers));
          });
      }
    } catch (error) {
        console.log(error);
      }
    };       
getData(url);
};

exports.delete_all_comments = function(req, res) {
  Task.find({orgname: req.params.orgname, isDeleted: 0}, '_id comment dateUpdated', function(err, task) {
    if (err)
      res.send(err);
    if (task.length < 1)
      res.status(404).json({"error": "Organization not in database"});
    else{
      Task.updateMany({orgname: req.params.orgname}, {isDeleted : 1, dateUpdated: Date.now()}, function(err, task) {
        if (err)
          res.send(err);
        res.json({ status: 'success', message: req.params.orgname + '\'s comment/s successfully deleted' });
      });
    }
  });
};