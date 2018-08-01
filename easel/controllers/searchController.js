const Image = require('../models/image');



function searchIndex(req, res) {
  Image
    .find({$text: { $search: req.body.searchTerm}})
    .then(results => res.render('search/index', { results })
    );
}


module.exports = {
  index: searchIndex
};
