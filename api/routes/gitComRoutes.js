'use strict';
module.exports = function(app) {
  var gitCom = require('../controllers/gitComControllers.js');

  // todoList Routes
  app.route('/orgs/:orgname/comments')
    .get(gitCom.list_all_comments)
    .post(gitCom.post_a_comment)
    .delete(gitCom.delete_all_comments);


  app.route('/orgs/:orgname/members')
    .get(gitCom.user_details)
};