const Image = require('../models/image');



function searchIndex(req, res) {
  Image
    .find({$text: { $search: req.body.searchTerm}}).sort({dateUploaded: 1})
    .then(results => res.render('search/index', { results })
    );
}


module.exports = {
  index: searchIndex
};
