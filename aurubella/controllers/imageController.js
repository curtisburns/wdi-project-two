// require the model
const Image = require('../models/image');

function imagesIndex(req, res) {
  Image
    .find()
    .populate('uploadedBy')
    .then(images => {
      console.log(images);
      res.render('images/index', { images });
    });
}

function imagesShow(req, res) {
  Image
    .findById(req.params.imageId)
    .then(image => res.render('images/show', { image }));
}

function imagesNew(req, res) {
  res.render('images/new');
}
//.populate(comments.createby)
//need to fix
function imagesCreate(req, res) {
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
