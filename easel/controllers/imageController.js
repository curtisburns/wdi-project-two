// require the model
const Image = require('../models/image');

function imagesIndex(req, res) {
  Image
    .find().sort({dateUploaded: -1})
    .populate('uploadedBy')
    .then(images => {
      res.render('images/index', { images });
    });
}

function imagesShow(req, res) {
  Image
    .findById(req.params.imageId)
    .populate('uploadedBy')
    .then(image => res.render('images/show', { image }));
}

function imagesNew(req, res) {
  res.render('images/new');
}

function imagesCreate(req, res) {
  req.body.uploadedBy = req.session.userId;
  req.body.dateUploaded = new Date().toLocaleString('en-gb', {
    month: 'short', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  req.body.tags = req.body.tags.split(' ');
  Image
    .create(req.body)
    .then(() => {
      res.redirect('/images');
    })
    .catch(err => res.status(500).send(err));
}

function imagesEdit(req, res) {
  Image
    .findById(req.params.imageId)
    .then(image => res.render('images/edit', { image }))
    .catch(err => res.status(404).send(err));
}

function imagesUpdate(req, res) {
  req.body.tags = req.body.tags.split(' ');
  Image
    .findByIdAndUpdate(req.params.imageId, req.body)
    .then(image => res.redirect(`/images/${image.id}`))
    .catch(err => res.status(500).send(err));
}

function imagesDelete(req, res) {
  Image
    .findByIdAndDelete(req.params.imageId)
    .then(() => res.redirect('/images'))
    .catch(err => res.status(404).send(err));
}


// define the exports
module.exports = {
  index: imagesIndex,
  show: imagesShow,
  new: imagesNew,
  create: imagesCreate, // This has to be imagesCreate
  edit: imagesEdit,
  update: imagesUpdate,
  delete: imagesDelete
};
