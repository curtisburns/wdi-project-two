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
  comments: [{profilePicture: String, username: String, content: String}],
  bookmarkedBy: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  newlyPosted: Boolean
});

imageSchema.index({'$**': 'text'});

imageSchema.virtual('timeAgo')
  .get(function(){
    const currentdate = new Date;
    const currentInMillis = currentdate.getTime();
    const timeDiff = currentInMillis - this.dateUploaded;
    const seconds = Math.floor(timeDiff/1000);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    const months = Math.floor(days/30);
    const years = Math.floor(months/12);
    let pluralise = '';
    let timeMeasure;
    let suffix;
    if (years >=1) {
      timeMeasure = years;
      suffix = 'year';
    } else if (months >=1) {
      timeMeasure = months;
      suffix = 'month';
    } else if (days >=1) {
      timeMeasure = days;
      suffix = 'day';
    } else if (hours >=1) {
      timeMeasure = hours;
      suffix = 'hour';
    } else if (minutes >=1) {
      timeMeasure = minutes;
      suffix = 'minute';
    } else if (seconds >=1) {
      timeMeasure = seconds;
      suffix = 'second';
    }
    if (timeMeasure > 1) {
      pluralise = 's';
    }
    if(timeMeasure >= 1) {
      return `${timeMeasure} ${suffix}${pluralise} ago`;
    } else {
      return 'Just now';
    }
  });


imageSchema.pre('save', function(next){
  if(this.newlyPosted) {
    const date = new Date;
    this.dateUploaded = date.getTime();
  }
  next();
});


module.exports = mongoose.model('Image', imageSchema);
