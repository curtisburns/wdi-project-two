// TODO: make a model for index to show content
// TODO: add register and log in buttons to home pages
// TODO: configure exhibitionController


// initiates file as router via express method
const router = require('express').Router();
const exhibitionController = require('../controllers/exhibitionController');
const registrationController = require('../controllers/registrationController');
const sessionController = require('../controllers/sessionController');
const commentController = require('../controllers/commentController');


function secureRoute(req, res, next) {
  if (!req.session.userId) {
    // User is not logged in. Disallow!
    return req.session.regenerate(() => {
      req.flash('danger', 'Please log in or register');
      res.redirect('/');
    });
  }

  return next();
}

// can only have on get per url - which makes sense...
// home page
//This should only be accessible if not logged in. Otherwise, home is exhibition
router.route('/')
  .get((req, res) => res.render('pages/home'));

router.route('/about')
  .get((req, res) => res.render('pages/about'));

router.route('/explore')
  .get(secureRoute, (req, res) => res.render('pages/explore'));

// index - RESTful
router.route('/exhibition')
  .get(secureRoute, exhibitionController.index)
  .post(secureRoute,exhibitionController.create);

router.route('/exhibition/new')
  .get(secureRoute, exhibitionController.new);


// remember to have any dynamic pages at the bottom
router.route('/exhibition/:imageId')
  .get(secureRoute, exhibitionController.show)
  .delete(secureRoute, exhibitionController.delete)
  .put(secureRoute, exhibitionController.update);

router.route('/exhibition/:imageId/edit')
  .get(secureRoute, exhibitionController.edit);


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
  .get(secureRoute, sessionController.delete);

router.route('/session/:sessionId')
  .get(secureRoute, sessionController.show);

router.route('/exhibition/:imageId/comments')
  .post(commentController.create);

router.route('/exhibition/:imageId/comments/:commentId')
  .delete(commentController.delete);

module.exports = router;
