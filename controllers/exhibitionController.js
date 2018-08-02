const Image = require('../models/image');

function exhibitionsIndex(req, res) {
  Image
    .find({uploadedBy: res.locals.loggedInUser.following}).sort({dateUploaded: -1})
    .then(images =>
      res.render('exhibitions/index', { images })
    );
}

module.exports = {
  index: exhibitionsIndex
};
