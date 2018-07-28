// require the model
const Image = require('../models/image');

function exhibitionsIndex(req, res) {
  Image
    .find()
    .then(images => {
      console.log(images);
      res.render('exhibition/index', { images });
    });
}

function exhibitionsShow(req, res) {
  const id = req.params.imageId;
  Image
    .findById(id)
    .then(image => res.render('exhibition/show', { image }));
}

function exhibitionsNew(req, res) {
  res.render('exhibition/new');
}

function exhibitionsCreate(req, res) {
  req.body.tags = req.body.tags.split(' ');
  Image
    .create(req.body)
    .then(() => res.redirect('/exhibition'))
    .catch(err => res.status(500).send(err));
}

function exhibitionsEdit(req, res) {

}
function exhibitionsUpdate(req, res) {

}


// define the exports
module.exports = {
  index: exhibitionsIndex,
  show: exhibitionsShow,
  new: exhibitionsNew,
  create: exhibitionsCreate,
  edit: exhibitionsEdit,
  update: exhibitionsUpdate
};
