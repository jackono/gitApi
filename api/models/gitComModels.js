'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CommentSchema = new Schema({
  orgname: {
    type: String,
    required: 'Kindly enter orgname'
  },
  comment: {
    type: String,
    required: 'Kindly enter a comment'
  },
  isDeleted: {
      type: Number,
      default: 0
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comments', CommentSchema);