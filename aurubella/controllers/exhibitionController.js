// require the model
const Image = require('../models/image');

function exhibitionsIndex(req, res) {
  Image
    .find()
    .populate('uploadedBy')
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
//.populate(comments.createby)
//need to fix
function exhibitionsCreate(req, res) {
  req.body.uploadedBy = req.session.userId;
  req.body.tags = req.body.tags.split('#').map(tag =>
    tag = '#' + tag.trim()
  );
  Image
    .create(req.body)
    // .then((image) => {
    //   req.session.userId.imagesPosted.push(image.id);
    // })
    .then(() => {
      res.redirect('/exhibition');
    })
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
  Image
    .findByIdAndDelete(req.params.imageId)
    .then(() => res.redirect('/exhibition'))
    .catch(err => res.status(404).send(err));
}


// define the exports
module.exports = {
  index: exhibitionsIndex,
  show: exhibitionsShow,
  new: exhibitionsNew,
  create: exhibitionsCreate, // This has to be imagesCreate
  edit: exhibitionsEdit,
  update: exhibitionsUpdate,
  delete: exhibitionsDelete
};
