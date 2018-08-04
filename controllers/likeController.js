const Image = require('../models/image');
const User = require('../models/user');

function likesCreate(req, res) {

  Image
    .findById(req.params.imageId)
    .then(imageBeingLiked => {
      imageBeingLiked.newlyPosted = false;
      imageBeingLiked.likes.push(req.session.userId);
      console.log('this is an image being liked' + imageBeingLiked);
      return imageBeingLiked.save();
    })
    .then((imageBeingLiked) => {
      return User
        .findById(req.session.userId)
        .then(user => {
          user.addToLikes(imageBeingLiked);
          res.redirect(req.headers['referer']);
        }); //back to previous page
    })
    .catch(err => console.log(err));
}

function likesIndex(req, res) {
  Image
    .findById(req.params.imageId)
    .populate('likes')
    .then(image => {
      res.render('likes/index', { image });
    })
    .catch(err => console.log(err));
}

function likesDelete(req, res) {
//Need to remove from array
  Image
    .findById(req.params.imageId)
    .then(imageBeingUnliked => {
      imageBeingUnliked.newlyPosted = false;
      imageBeingUnliked.likes = imageBeingUnliked.likes.filter(likers =>
        likers.toString() !== req.session.userId.toString());
      return imageBeingUnliked.save();
    })
    .then((imageBeingUnliked) => {
      return User
        .findById(req.session.userId)
        .then(user => {
          user.removeFromLikes(imageBeingUnliked);
          res.redirect(req.headers['referer']); //back to previous page
        });
    })
    .catch(err => console.log(err));
}


module.exports = {
  create: likesCreate,
  index: likesIndex,
  delete: likesDelete
};
