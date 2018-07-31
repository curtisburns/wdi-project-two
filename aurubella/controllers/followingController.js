const User = require('../models/user');

function followingCreate(req, res) {
  //I might just keep track of following, then followers can be checked against
  //every user that has their name in their following.
  const userBeingViewed = req.params.userId.toString();
  console.log(req.params.userId);
  User
    .findById(req.session.userId)
    .then(user => {
      user.following.push(userBeingViewed);
      console.log(userBeingViewed);
      return user.save(); //can I update the followers as well?
    })
    .then(user => {
      const lastFollowedIndex = user.following.length-1;
      //req.params.userId is changing to currentUser here. Why. Changed to target
      //last index in array
      console.log(userBeingViewed);
      res.redirect(`/user/${user.following[lastFollowedIndex]}`);
      console.log(user.following.includes(userBeingViewed));
    })
    .catch(err => console.log(err));
}

function followingIndex(req, res) {
//Needs to be a page showing all followers
}

function followingDelete(req, res, next) {
//Need to remove from array
  let userToUnfollow;
  User
    .findById(req.params.userId)
    .then(user => {
      user.following = user.following.filter(userFollowing =>
        userFollowing.id !== req.params.followingId);
      console.log(req.params.followingId + 'and' + user.following);
      return user.save();
    })
    .then(userFollowing => res.redirect(`/user/${userFollowing}/following`))
    .catch(next);
}

module.exports = {
  create: followingCreate,
  index: followingIndex,
  delete: followingDelete
};
