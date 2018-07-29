const User = require('../models/user');

function registrationsNew(req, res) {
  res.render('registrations/new');
}

function registrationsCreate(req, res) {
  req.body.followers = 0; //Sets followers to zero on register
  User
    .create(req.body)
    .then((user) => {
      req.session.userId = user.id;
      res.redirect('/exhibition')
        .catch(err => res.status(400).send(err));
    });
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
