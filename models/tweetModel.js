var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
  tweet: String,
  date: Date,
  id: Number,
  probability: Number,
  label: String,
  rating: Number
});

module.exports = mongoose.model('Tweet', tweetSchema);
