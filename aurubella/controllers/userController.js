const User = require('../models/user');
const Image = require('../models/image');

function usersShow(req, res) {
  let _user;
  User
    .findById(req.params.userId)
    .then(user => {
      _user = user;
      return Image
        .find({ uploadedBy: user.id });
    })
    .then(images => {
      res.render('users/show', { _user, images });
    });

}
function usersEdit(req, res) {

}

function usersUpdate(req, res) {

}

function usersDelete(req, res) {

}

module.exports = {
  show: usersShow,
  edit: usersEdit,
  update: usersUpdate,
  delete: usersDelete // Option to edit username
};
