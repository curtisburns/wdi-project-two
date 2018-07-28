//require mongoose
const mongoose = require('mongoose');

// setup schema for user
const userSchema = new mongoose.Schema({
  username: [{type: String, required: true}],
  email: [{type: String, required: true}],
  password: [{type: String, required: true}]
});
// will add a function that adds the key 'followers' that keeps references.

module.exports = mongoose.model('User', userSchema);
