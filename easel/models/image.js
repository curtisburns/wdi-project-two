// require mongoose
const mongoose = require('mongoose');

// set up schema for images
const imageSchema = new mongoose.Schema({
  uploadedBy: {type: mongoose.Schema.ObjectId, ref: 'User'}, // this won't be necessary as the
  //user won't get to choose to add this in.
  imageURL: {type: String, required: true},
  dateUploaded: {type: String},// this won't be necessary as the
  //user won't get to choose to add this in.
  tags: [{type: String}],
  caption: String,
  likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  comments: [{username: String, content: String}],
  bookmarkedBy: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

imageSchema.index({'$**': 'text'});


module.exports = mongoose.model('Image', imageSchema);
