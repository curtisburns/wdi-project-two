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
  username: 'curtisburns',
  email: 'email@email.com',
  password: 'pass',
  confirmPassword: 'pass',
  followers: [],
  following: [],
  imagesPosted: ['string', 'string'],
  status: 'processPassword'
}, {
  profilePicture: 'https://i.imgur.com/NnSDtag.png',
  username: 'Roberto Ferri',
  email: 'email1@email.com',
  password: 'pass',
  confirmPassword: 'pass',
  followers: [],
  following: [],
  imagesPosted: ['string', 'string'],
  status: 'processPassword'
}, {
  profilePicture: 'https://i.imgur.com/92sbiGq.png',
  username: 'kit king',
  email: 'email2@email.com',
  password: 'pass',
  confirmPassword: 'pass',
  followers: [],
  following: [],
  imagesPosted: ['string', 'string'],
  status: 'processPassword'
}, {
  profilePicture: 'https://i.imgur.com/Bz92h5R.png',
  username: 'christianblanxer',
  email: 'email2@email.com',
  password: 'pass',
  confirmPassword: 'pass',
  followers: [],
  following: [],
  imagesPosted: ['string', 'string'],
  status: 'processPassword'
}
];



User
  .create(users)
  .then(users => {
    console.log(`Created ${users.length} users.`);
    return Image
      .create([
        {
          uploadedBy: users[0].id,
          imageURL: 'https://i.imgur.com/dqRBSck.png',
          dateUploaded: '',
          tags: [
            'deep', 'colourful', 'digitalart'
          ],
          caption: '"And then the universe was" - Procreate 2014',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        },{
          uploadedBy: users[1].id,
          imageURL: 'https://i.imgur.com/PJHo29R.png',
          dateUploaded: '',
          tags: [
            'newcontemporyart', 'newmasters', 'italianpainter'
          ],
          caption: 'VITRIOL olio su tela 100 x 70 cm 2015',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        },{
          uploadedBy: users[1].id,
          imageURL: 'https://i.imgur.com/dDeQWws.png',
          dateUploaded: 'Aug 01, 18, 12:37:13 PM',
          tags: [
            'newcontemporyart', 'newmasters', 'italianpainter'
          ],
          caption: 'SONNO DI RUGIADA sarà esposto in anteprima alla mostra "CONFESSIONI" 5 Maggio - 30 Giugno 2018 - a cura di Simona Gatto by Crazy March Gallery - via Roma 16 - Sutri VT',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        },{
          uploadedBy: users[1].id,
          imageURL: 'https://i.imgur.com/uDcXLSG.png',
          dateUploaded: '',
          tags: [
            'newcontemporaryart', 'newmasters', 'italianpainter'
          ],
          caption: 'SONNO DI RUGIADA" oil on canvas 100 x 120 cm',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        },{
          uploadedBy: users[2].id,
          imageURL: 'https://i.imgur.com/CtcbXxe.png',
          dateUploaded: '',
          tags: [
            'selfportrait', 'mondayfeels'
          ],
          caption: '',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        },{
          uploadedBy: users[2].id,
          imageURL: 'https://i.imgur.com/sfbMwZq.png',
          dateUploaded: '',
          tags: [
            'painting'
          ],
          caption: 'Oil on linen riveted to aluminum. Really having fun exploring the versatility of oil painting as a medium.',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        },{
          uploadedBy: users[3].id,
          imageURL: 'https://i.imgur.com/g21c026.png',
          dateUploaded: '',
          tags: [
            'graffiti', 'wallart', 'mural', 'streetart', 'portugal'
          ],
          caption: '“Ojos que no ven”',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        },{
          uploadedBy: users[3].id,
          imageURL: 'https://i.imgur.com/kGej8Fh.png',
          dateUploaded: '',
          tags: [
            'painting'
          ],
          caption: '“Thought clouds”. Oil on canvas | 24 x 33 cm.',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        },{
          uploadedBy: users[3].id,
          imageURL: 'https://i.imgur.com/taHxH0O.png',
          dateUploaded: '',
          tags: [
            'painting'
          ],
          caption: '“Las huellas de las personas que caminaron juntas, nunca se borran”. (Proverbio Africano). Oil on paper | 50 x 50 cm | 2013. Original pic by David Tipling',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        },{
          uploadedBy: users[3].id,
          imageURL: 'https://i.imgur.com/kn0E8NZ.png',
          dateUploaded: '',
          tags: [
            'oilpainting', 'old', 'contemporaryart', 'colourful', 'creative'
          ],
          caption: '“Yann”. 150 x 150 cm | Oil on canvas | 2009.',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        },{
          uploadedBy: users[3].id,
          imageURL: 'https://i.imgur.com/ioAiGby.png',
          dateUploaded: '',
          tags: [
            'courage', 'mural', 'graffiti', 'sprayart', 'streetart'
          ],
          caption: 'Stop Nuclear. Barcelona 2011.',
          likes: [],
          comments: [],
          bookmarkedBy: [],
          newlyPosted: true
        }
      ]);
  })
  .then(images => console.log(`Created ${images.length} images`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
