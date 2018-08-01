// TODO: make a model for index to show content
// TODO: add register and log in buttons to home pages
// TODO: configure exhibitionController


// initiates file as router via express method
const router = require('express').Router();
const imageController = require('../controllers/imageController');
const registrationController = require('../controllers/registrationController');
const sessionController = require('../controllers/sessionController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const followingController = require('../controllers/followingController');
const followerController = require('../controllers/followerController');
const searchController = require('../controllers/searchController');
const exhibitionController = require('../controllers/exhibitionController');
const likeController = require('../controllers/likeController');


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
//This should only be accessible if not logged in. Otherwise, home is images
router.route('/')
  .get((req, res) => res.render('pages/home'));

router.route('/about')
  .get((req, res) => res.render('pages/about'));

router.route('/explore')
  .get(secureRoute, (req, res) => res.render('pages/explore'));

// index - RESTful
router.route('/images')
  .get(secureRoute, imageController.index)
  .post(secureRoute,imageController.create);

router.route('/images/new')
  .get(secureRoute, imageController.new);


// remember to have any dynamic pages at the bottom
router.route('/images/:imageId')
  .get(secureRoute, imageController.show)
  .delete(secureRoute, imageController.delete)
  .put(secureRoute, imageController.update);

router.route('/images/:imageId/edit')
  .get(secureRoute, imageController.edit);


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

router.route('/user/:id')
  .get(secureRoute, userController.show)
  .put(secureRoute, userController.update);

router.route('/user/:id/followers')
  .get(secureRoute, followerController.index);

router.route('/user/:id/following')
  .get(secureRoute, followingController.index)
  .post(secureRoute, followingController.create);

router.route('/user/:id/edit')
  .get(secureRoute, userController.edit);


router.route('/user/:id/exhibition')
  .get(secureRoute, exhibitionController.index);


router.route('/user/:userId/following/:followingId')
  .delete(secureRoute, followingController.delete);

router.route('/images/:imageId/comments')
  .post(secureRoute, commentController.create);

router.route('/images/:imageId/comments/:commentId')
  .delete(secureRoute, commentController.delete);

router.route('/images/:imageId/likes')
  .get(secureRoute, likeController.index)
  .post(secureRoute, likeController.create);

router.route('/images/:imageId/likes/:likeId')
  .delete(secureRoute, likeController.delete);

router.route('/search/index')
  .post(secureRoute, searchController.index);



module.exports = router;
