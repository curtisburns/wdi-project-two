const Image = require('../models/image');



function searchIndex(req, res) {
  const _searchTerm = req.body.searchTerm;
  Image
    .find({$text: { $search: _searchTerm}}).sort({dateUploaded: -1})
    .then(results => res.render('search/index', { results, _searchTerm })
    );
}


module.exports = {
  index: searchIndex
};
