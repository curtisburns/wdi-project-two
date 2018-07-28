// TODO: make a model for index to show content
// TODO: add register and log in buttons to home pages
// TODO: configure exhibitionController


// initiates file as router via express method
const router = require('express').Router();
const exhibitionController = require('../controllers/exhibitionController');
// home page
router.route('/')
  .get((req, res) => res.render('pages/home'));

// index - RESTful
router.route('/exhibition')
  .get(exhibitionController.index);
  // .post(exhibitionController.create);

router.route('/exhibition/:imageId') //change to imageId at some
// point. The : just signals for express to cache the id of the record to params
  .get(exhibitionController.show);

module.exports = router;
