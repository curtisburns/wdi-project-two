// require mongoose and set up
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // set up promises for mongoose
mongoose.connect('mongodb://localhost/aurubella');

// build db

const Image = require('../models/image');

Image.collection.drop();

Image
  .create([
    {
      userUpload: 'curtis1234',
      imageURL: 'imageplaceholder.png',
      dateOrTimeUploaded: 'tbc', //will change this eventually e.g '2 minutes ago' needs to be current date
      tags: [
        'baroque', 'power', 'gold'
      ],
      caption: 'Artist: blah blah 1786',
      likes: 0,
      comments: [],
      bookmarkedBy: []
    },{
      userUpload: 'andy1234',
      imageURL: 'imageplaceholder.png',
      dateOrTimeUploaded: 'tbc', //will change this eventually e.g '2 minutes ago' needs to be current date
      tags: [
        'renaissance'
      ],
      caption: 'Artist: blah blah',
      likes: 12,
      comments: [],
      bookmarkedBy: []
    },{
      userUpload: 'bob1234',
      imageURL: 'imageplaceholder.png',
      dateOrTimeUploaded: 'tbc', //will change this eventually e.g '2 minutes ago' needs to be current date
      tags: [
        'neoclassical', 'impactful'
      ],
      caption: 'Artist: blah',
      likes: 2,
      comments: [],
      bookmarkedBy: []
    }
  ])
  .then(images => console.log(`Created ${images.length} images`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
