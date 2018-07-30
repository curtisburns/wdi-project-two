const User = require('../models/user');
const Image = require('../models/image');

function usersShow(req, res) {
  User
    .findById(req.params.userId)
    .then(user => {
      Image
        .find()
        .then(image => {
          res.render('users/show', { user, image });
        });
    });
}

module.exports = {
  show: usersShow
};
