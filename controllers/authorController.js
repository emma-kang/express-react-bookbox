const models = require('../models');
const _status = require('../helpers/status');
const _message = require('../helpers/message');

/**
 * Get All authors
 * @returns {object}
 */
const getAuthors = async (req, res) => {
  const authors = await models.Authors.findAll()
    .catch((err) => {
      console.log(err);
      _message.error.message = 'An error occurred while operating data';
      return res.status(_status.error).json(_message.error);
    });

  if (authors == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = authors;
  return res.status(_status.success).json(_message.success);

};

/**
 * Get Author by Author ID
 * @param {int} authorId 
 * @returns {object}
 */
const getAuthorById = async (req, res) => {
  const { authorid } = req.params;
  const author = await models.Authors.findByPk(authorid)
    .catch((err) => {
      console.log(err);
      _message.error.message = 'An error occurred while operating data';
      return res.status(_status.error).json(_message.error);
    });

  if (author == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = author;
  return res.status(_status.success).json(_message.success);
}

/**
 * Only Admin User
 * Add new Author infomation 
 * @param {object} newInfo
 * @returns {object}
 */
const addNewAuthor = async (req, res) => {
  const { firstname, lastname, birthdate, country } = req.body;

  const [ newAuthor, created ] = await models.Authors.findOrCreate({
    where: { first_name: firstname, last_name: lastname },
    defaults: {
      dob: birthdate,
      country: country
    }
  }).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (created) {
    _message.error.message = 'Already existing author name';
    return res.status(_status.conflict).json(_message.error);
  };

  _message.success.data = {};
  return res.status(_status.created).json(_message.success);
}

/**
 * Only Admin User
 * Update Author Info
 * @param {int} authorId  
 * @param {object} authorInfoContents
 * @returns {object} 
 */
const updateAuthor = async (req, res) => {
  const { authorid } = req.params;
  const { firstname, lastname, dob, country } = req.body;

  const author = await models.Authors.update({ first_name: firstname, last_name: lastname, dob: dob, country: country }, {
    where: {
      id: authorid
    }
  }).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (author == null) {
    _message.error.message = 'No matching data with the author id';
    return res.status(_status.notfound).json(_message.error);
  };

  _message.success.data = author;
  return res.status(_status.success).json(_message.success);
};

/**
 * Only Admin User
 * Delete Author 
 * @param {int} authorId 
 * @returns {object}
 */
const deleteAuthor = async (req, res) => {
  const { authorid } = req.params;

  const author = await models.Authors.destroy({
    where: {
      id: authorid
    }
  }).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (author == null) {
    _message.error.message = 'No data deleted';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = {};
  return res.status(_status.success).json(_message.success);
};

module.exports = {
  getAuthors,
  getAuthorById,
  addNewAuthor,
  updateAuthor,
  deleteAuthor
}