const User = require('../models/user');

function followersIndex(req, res) {
  User
    .findById(req.params.id)
    .populate('followers')
    .then(user => res.render('followers/index', { user }  ))
    .catch(err => console.log(err));
}

module.exports = {
  index: followersIndex
};
