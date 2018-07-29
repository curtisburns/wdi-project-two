const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}
// log in
function sessionsCreate(req, res) {
  User
    .findOne( {$or: [{email: req.body.login} , {username: req.body.login}]})
    .then(user => {
      console.log(user);
      if (!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Incorrect password');
        res.status(401).render('sessions/new');
      } else {
        req.session.userId = user.id;
        res.redirect('/exhibition');
      }
    });
}
//log out
function sessionsDelete(req, res) {
  req.session.regenerate(() => {
    res.redirect('/');
  });
}

function sessionsShow(req, res) {
  User
    .findById(req.params.sessionId)
    .then(user => res.render('sessions/show', { user }));
}


module.exports = {
  new: sessionsNew, //form
  create: sessionsCreate, //log in
  delete: sessionsDelete, //log out
  show: sessionsShow //profile - this needs to be queried - correct place for profile?
};
