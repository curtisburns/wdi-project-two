const User = require('../models/user');

function followingCreate(req, res) {
  //I might just keep track of following, then followers can be checked against
  //every user that has their name in their following.

  // console.log(`this is the current user ${req.params.id}`);
  User
    .findById(req.params.id)
    .then(userLoggedIn => {
      userLoggedIn.following.push(req.body.userToFollow);
      return userLoggedIn.save();
    })
    .then((userLoggedIn) => {
      return User
        .findById(req.body.userToFollow)
        .then(user => {
          user.addToFollowers(userLoggedIn);
          res.redirect(req.headers['referer']);
        }); //back to previous page
    })
    .catch(err => console.log(err));
}

function followingIndex(req, res) {
  User
    .findById(req.params.id)
    .populate('following')
    .then(user => res.render('following/index', { user }  ))
    .catch(err => console.log(err));
}

function followingDelete(req, res) {
//Need to remove from array
  User
    .findById(req.session.userId)
    .then(userLoggedIn => {
      userLoggedIn.following = userLoggedIn.following.filter(userFollowing =>
        userFollowing.toString() !== req.body.userToUnfollow.toString());
      return userLoggedIn.save();
    })
    .then((userLoggedIn) => {
      return User
        .findById(req.body.userToUnfollow)
        .then(user => {
          user.removeFromFollowers(userLoggedIn);
          res.redirect(req.headers['referer']); //back to previous page
        });
    })
    .catch(err => console.log(err));
}


module.exports = {
  create: followingCreate,
  index: followingIndex,
  delete: followingDelete
};
