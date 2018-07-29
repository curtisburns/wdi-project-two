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
  Image
    .findById(req.params.imageId)
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
  Image
    .findById(req.params.imageId)
    .then(image => res.render('exhibition/edit', { image }))
    .catch(err => res.status(404).send(err));
}

function exhibitionsUpdate(req, res) {
  req.body.tags = req.body.tags.split(' ');
  Image
    .findByIdAndUpdate(req.params.imageId, req.body)
    .then(image => res.redirect(`/exhibition/${image.id}`))
    .catch(err => res.status(500).send(err));
}

function exhibitionsDelete(req, res) {

}


// define the exports
module.exports = {
  index: exhibitionsIndex,
  show: exhibitionsShow,
  new: exhibitionsNew,
  create: exhibitionsCreate,
  edit: exhibitionsEdit,
  update: exhibitionsUpdate,
  delete: exhibitionsDelete
};
