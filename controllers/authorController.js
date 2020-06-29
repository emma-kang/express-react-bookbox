const models = require('../models');
const _status = require('../helpers/status');
const _message = require('../helpers/message');

const getAuthors = async (req, res) => {
  const authors = await models.Authors.findAll()
    .catch((err) => {
      console.log(err);
      _message.error.message = 'An error occurred while getting data';
      return res.status(_status.error).send(_message.error);
    });

  if (authors == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).send(_message.error);
  }

  _message.success.data = authors;
  return res.status(_status.success).send(_message.success);

};

const getAuthorById = async (req, res) => {
  const { authorid } = req.params;
  const author = await models.Authors.findByPk(authorid)
    .catch((err) => {
      console.log(err);
      _message.error.message = 'An error occurred while getting data';
      return res.status(_status.error).send(_message.error);
    });

  if (author == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).send(_message.error);
  }

  _message.success.data = author;
  return res.status(_status.success).send(_message.success);
}


// Admin

const addNewAuthor = async (req, res) => {

}

const updateAuthor = async (req, res) => {

}

const deleteAuthor = async (req, res) => {

}

module.exports = {
  getAuthors,
  getAuthorById
}