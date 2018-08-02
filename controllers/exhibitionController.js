const Image = require('../models/image');

function exhibitionsIndex(req, res) {
  Image
    .find( {$or: [{
      uploadedBy: res.locals.loggedInUser.following
    } , {
      uploadedBy: req.session.userId
    }]}).sort({dateUploaded: -1})
    .then(images =>
      res.render('exhibitions/index', { images })
    );
}

module.exports = {
  index: exhibitionsIndex
};
