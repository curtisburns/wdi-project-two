const User = require('../models/user');

function registrationsNew(req, res) {
  res.render('registrations/new');
}

function registrationsCreate(req, res) {
  req.body.followers = []; //Sets up followers array on register
  req.body.following = []; //Set up following array on register
  User
    .create(req.body)
    .then((user) => {
      req.session.userId = user.id;
      res.redirect('/images')
        .catch(err => res.status(400).send(err));
    });
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
