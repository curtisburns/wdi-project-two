const Image = require('../models/image');

function commentsCreate(req, res) {
  Image
    .findById(req.params.imageId)
    .then(image => {
      image.newlyPosted = false;
      image.comments.push(req.body);
      return image.save();
    })
    .then(image => res.redirect(`/images/${image.id}`))
    .catch(err => console.log(err));
}

function commentsDelete(req, res, next) {
  Image
    .findById(req.params.imageId)
    .then(image => {
      image.newlyPosted = false;
      image.comments = image.comments.filter(comment => comment.id !== req.params.commentId
      );
      console.log(image.comments);
      return image.save();
    })
    .then(image => res.redirect(`/images/${image.id}`))
    .catch(next);
}

module.exports = {
  create: commentsCreate,
  delete: commentsDelete
};
