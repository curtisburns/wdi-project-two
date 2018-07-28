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
  const id = req.params.imageId; //this params.... is how it is bolted on to the
  // image object, refer to it as this. e.g image.imageId
  Image
    .findById(id)
    .then(image => res.render('exhibition/show', { image }));
}

function exhibitionsCreate(req, res) {

}
function exhibitionsEdit(req, res) {

}
function exhibitionsUpdate(req, res) {

}


// define the exports
module.exports = {
  index: exhibitionsIndex,
  show: exhibitionsShow,
  create: exhibitionsCreate,
  edit: exhibitionsEdit,
  update: exhibitionsUpdate
};
