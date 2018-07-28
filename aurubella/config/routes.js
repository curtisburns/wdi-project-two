// initiates file as router via express method
const router = require('express').Router();

// home page
router.route('/')
  .get((req, res) => res.render('pages/home'));


module.exports = router;
