// require mongoose and set up
const {DB_URI} = require('../config/environment'); //test deconstructing with
//one variable - works.
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // set up promises for mongoose
mongoose.connect(DB_URI);

// build db

const Image = require('../models/image');
const User = require('../models/user');

Image.collection.drop();
User.collection.drop();


const users = [{
  profilePicture: 'https://imgur.com/dudZjsL.jpg',
  username: 'me',
  email: 'email@email.com',
  password: 'pass',
  confirmPassword: 'pass',
  followers: [],
  following: [],
  imagesPosted: ['string', 'string'],
  status: null
}, {
  profilePicture: 'https://imgur.com/dudZjsL.jpg',
  username: 'meagain',
  email: 'email1@email.com',
  password: 'pass',
  confirmPassword: 'pass',
  followers: [],
  following: [],
  imagesPosted: ['string', 'string'],
  status: null
}, {
  profilePicture: 'https://imgur.com/dudZjsL.jpg',
  username: 'alsome',
  email: 'email2@email.com',
  password: 'pass',
  confirmPassword: 'pass',
  followers: [],
  following: [],
  imagesPosted: ['string', 'string'],
  status: null
}];



User
  .create(users)
  .then(users => {
    return Image
      .create([
        {
          uploadedBy: users[0].id,
          imageURL: 'imageplaceholder.png',
          dateUploaded: 'Aug 01, 18, 12:37PM', //will change this eventually e.g '2 minutes ago' needs to be current date
          tags: [
            'baroque', 'power', 'gold'
          ],
          caption: 'Artist: blah blah 1786',
          likes: [],
          comments: [],
          bookmarkedBy: []
        },{
          uploadedBy: users[1].id,
          imageURL: 'imageplaceholder.png',
          dateUploaded: 'Aug 01, 18, 12:37PM', //will change this eventually e.g '2 minutes ago' needs to be current date
          tags: [
            'renaissance'
          ],
          caption: 'Artist: blah blah',
          likes: [],
          comments: [],
          bookmarkedBy: []
        },{
          uploadedBy: users[2].id,
          imageURL: 'imageplaceholder.png',
          dateUploaded: 'Aug 01, 18, 12:37PM', //will change this eventually e.g '2 minutes ago' needs to be current date
          tags: [
            'neoclassical', 'impactful'
          ],
          caption: 'Artist: blah',
          likes: [],
          comments: [],
          bookmarkedBy: []
        }
      ]);
  })
  .then(images => console.log(`Created ${images.length} images`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());