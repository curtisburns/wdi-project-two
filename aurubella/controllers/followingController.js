const User = require('../models/user');

function followingCreate(req, res) {
  //I might just keep track of following, then followers can be checked against
  //every user that has their name in their following.

  // console.log(req.params.userId);
  User
    .findById(req.params.id)
    .then(loggedInUser => {
      console.log('loggedInUser before update ->', loggedInUser);
      loggedInUser.following.push(req.body.userToFollow);
      console.log('loggedInUser after update ->', loggedInUser);
      return loggedInUser.save(); //can I update the followers as well?
    })
    .then(() => {
      console.log('this is the req header' + req.headers['referer']);
      res.redirect(req.headers['referer']);
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
// //Need to remove from array
//   const userBeingViewed = req.params.userId;
//   User
//     .findById(req.session.userId)
//     .then(user => {
//       user.following = user.following.filter(userFollowing =>
//         userFollowing.id !== req.params.followingId);
//       return user.save();
//     })
//     .then(user => {
//       const currentUser = user.id;
//       User
//         .findById(userBeingViewed)
//         .then(user => user.removeFromFollowers(currentUser))
//         .then(user => res.redirect(`/user/${user.id}`));
//     })
//     .catch(err => console.log(err));
}

module.exports = {
  create: followingCreate,
  index: followingIndex,
  delete: followingDelete
};
