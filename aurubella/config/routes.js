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
  .get(exhibitionController.index)
  .post(exhibitionController.create);


module.exports = router;
