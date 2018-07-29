const User = require('../models/user');

function registrationsNew(req, res) {
  res.render('registrations/new');
}

function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then(() => res.redirect('/exhibition'))
    .catch(err => res.status(400).send(err));
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
