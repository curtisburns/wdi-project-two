//require mongoose
const mongoose = require('mongoose');

//set up encyption for passwords
const bcrypt = require('bcrypt');

// setup schema for user
const userSchema = new mongoose.Schema({
  profilePicture: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  imagesPosted: [{type: String}],
  imagesLiked: [{type: mongoose.Schema.ObjectId, ref: 'Image'}],
  status: String
});





// create a method on which we can call to check if log in password is correct
userSchema.methods.validatePassword = function(password) {
  // console.log(password, this.password);
  return bcrypt.compareSync(password, this.password);
};

// sets up a virtual key to store password to check
userSchema.virtual('confirmPassword') //defines property that doesn't get
// // persisted to mongodb
  .set(function(confirmPassword) {
    this.passwordCheck = confirmPassword; //sets another property (why?)
  });
// invalidates if passwords for confirmation on register don't match
userSchema.pre('validate', function(next) {
  // console.log(this.passwordCheck === this.password, this.passwordCheck, this.password);
  if (this.passwordCheck !== this.password && this.status === 'processPassword') {
    //checks if passwordConfirm is actually required
    // this should only be done on register or password change.
    this.invalidate('confirmPassword', 'does not match!');
  }
  next();
});
////////////////////////////////////////////

// encrypts password
userSchema.pre('save', function() {
  // console.log(this);
  if (this.status === 'processPassword') { //checks if encryption is actually required
    // this should only be done on register or password change.
    this.password = bcrypt.hashSync(this.password, 8);
    this.status = null;
    // console.log(this);
  }
});

userSchema.methods.addToFollowers = function(loggedInUser) {
  this.followers.push(loggedInUser);
  console.log('this is this in the addToFollowers ->', this);
  return this.save();
};

userSchema.methods.removeFromFollowers = function(loggedInUser) {
  this.followers = this.followers.filter(user => user.toString() !== loggedInUser.id.toString());
  return this.save();
};

userSchema.methods.addToLikes = function(imageBeingLiked) {
  this.imagesLiked.push(imageBeingLiked);
  return this.save();
};

userSchema.methods.removeFromLikes = function(imageBeingUnliked) {
  this.imagesLiked = this.imagesLiked.filter(image => image.toString() !== imageBeingUnliked.id.toString());
  return this.save();
};


module.exports = mongoose.model('User', userSchema);
