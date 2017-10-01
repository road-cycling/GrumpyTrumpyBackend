var mongoose = require('mongoose');

var emailSchema = new mongoose.Schema({
  email: String,
  hash: String,
});


module.exports = mongoose.model('email', emailSchema);
