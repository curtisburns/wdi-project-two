// require mongoose
const mongoose = require('mongoose');

// set up schema for images
const imageSchema = new mongoose.Schema({
  userUpload: [{type: String, required: true}], // this won't be necessary as the
  //user won't get to choose to add this in.
  imageURL: [{type: String, required: true}],
  dateOrTimeUploaded: [{type: String, required: true}],// this won't be necessary as the
  //user won't get to choose to add this in.
  tags: [{type: String}],
  caption: String,
  likes: Number,
  comments: [{username: String, content: String}],
  bookmarkedBy: [{username: String}]
});

module.exports = mongoose.model('Image', imageSchema);
