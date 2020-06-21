const Authors = require('../models/authors');

exports.getAuthors = (req, res, next) => {
    Authors.findAll()
      .then(authors => {
        
      })
      .catch(err => {
        console.log(err);
      });
};