const User = require('../models/user');
const Image = require('../models/image');

function usersShow(req, res) {
  let _user;
  User
    .findById(req.params.id)
    .then(user => {
      _user = user;
      return Image
        .find({ uploadedBy: user.id }).sort({dateUploaded: -1});
    })
    .then(images => {
      res.render('users/show', { _user, images });
    });

}

function usersEdit(req, res) {
  User
    .findById(req.params.id)
    .then(user => res.render('users/edit', { user }))
    .catch(err => res.status(404).send(err));
}

function usersUpdate(req, res) {
  User
    .findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.redirect(`/user/${user.id}`))
    .catch(err => res.status(500).send(err));
}


module.exports = {
  show: usersShow,
  edit: usersEdit,
  update: usersUpdate
};
