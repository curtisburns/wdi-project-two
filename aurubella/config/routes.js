// TODO: make a model for index to show content
// TODO: add register and log in buttons to home pages
// TODO: configure exhibitionController


// initiates file as router via express method
const router = require('express').Router();
const exhibitionController = require('../controllers/exhibitionController');
const registrationController = require('../controllers/registrationController');
const sessionController = require('../controllers/sessionController');

// can only have on get per url - which makes sense...
// home page
router.route('/')
  .get((req, res) => res.render('pages/home'));

router.route('/about')
  .get((req, res) => res.render('pages/about'));

router.route('/explore')
  .get((req, res) => res.render('pages/explore'));

// index - RESTful
router.route('/exhibition')
  .get(exhibitionController.index)
  .post(exhibitionController.create);

router.route('/exhibition/new')
  .get(exhibitionController.new);


// remember to have any dynamic pages at the bottom
router.route('/exhibition/:imageId')
  .get(exhibitionController.show)
  .delete(exhibitionController.delete)
  .put(exhibitionController.update);

router.route('/exhibition/:imageId/edit')
  .get(exhibitionController.edit);


//register new user
router.route('/register/new')
  .get(registrationController.new);

router.route('/register')
  .post(registrationController.create);

// log in
router.route('/session/new')
  .get(sessionController.new);

router.route('/session')
  .post(sessionController.create);

//is this RESTful?? come back to this.
router.route('/session/delete')
  .get(sessionController.delete);

router.route('/session/:sessionId')
  .get(sessionController.show);


module.exports = router;
