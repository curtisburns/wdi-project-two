// TODO: make a model for index to show content
// TODO: add register and log in buttons to home pages
// TODO: configure exhibitionController


// initiates file as router via express method
const router = require('express').Router();
const exhibitionController = require('../controllers/exhibitionController');
// home page
router.route('/')
  .get((req, res) => res.render('pages/home'));

router.route('/about')
  .get((req, res) => res.render('pages/about'));

// index - RESTful
router.route('/exhibition')
  .get(exhibitionController.index)
  .post(exhibitionController.create);

router.route('/exhibition/new')
  .get(exhibitionController.new);

// remember to have any dynamic pages at the bottom
router.route('/exhibition/:imageId')
  .get(exhibitionController.show)
  .edit(exhibitionController.edit)
  .delete(exhibitionController.delete);

router.route('/explore')
  .get((req, res) => res.render('pages/explore'));

module.exports = router;
