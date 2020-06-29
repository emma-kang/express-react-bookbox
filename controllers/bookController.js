const models = require('../models');
const _status = require('../helpers/status');
const _message = require('../helpers/message');

const getBooks = async (req, res) => {
  const books = await models.Books.findAll()
    .catch((err) => {
      console.log(err);
      _message.error.message = 'An error occurred while getting data';
      return res.status(_status.error).send(_message.error);
    });

  if (books == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).send(_message.error);
  }

  _message.success.data = books;
  return res.status(_status.success).send(_message.success);
}

const getBooksWithAuthor = async (req, res) => {
  models.Books.hasOne(models.Authors, {
    foreignKey: 'id'
  });

  const books = await models.Books.findAll({
    include: [
      {
        model: models.Authors,
        attributes: ['first_name', 'last_name']
      }
    ]
  }).catch((err) => {
    console.log(err);
    _message.error.message = 'An error occurred while getting data';
    return res.status(_status.error).send(_message.error);
  });

  if (books == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).send(_message.error);
  }

  _message.success.data = books;
  return res.status(_status.success).send(_message.success);
}

const getBookById = async (req, res) => {
  const { bookid } = req.params;
  const book = await models.Books.findByPk(bookid)
    .catch((err) => {
      console.log(err);
      _message.error.message = 'An error occurred while getting data';
      return res.status(_status.error).send(_message.error);
    });

  if (book == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).send(_message.error);
  }

  _message.success.data = book;
  return res.status(_status.success).send(_message.success);
}

// Admin

const addNewBook = async (req, res) => {
  const { title, authorid, publisher, published, category, language, imageurl } = req.body;

  const [ newBook, created ] = await models.Books.findOrCreate({
    where: { title: title, publisher: publisher, language: language },
    defaults: {
      authorid: authorid,
      published: published,
      category: category,
      imageurl: imageurl
    }
  }).catch((err) => {
    _message.error.message = 'An error occurred while getting data';
    return res.status(_status.error).send(_message.error);
  });

  if (created) {
    _message.error.message = 'Already existed book. Please check the information';
    return res.status(_status.conflict).send(_message.error);
  }

  _message.success.data = newBook;
  return res.status(_status.success).send(_message.success);

}

const deleteBook = async (req, res) => {
  const { bookid } = req.params;
  const book = await models.Books.destroy({
    where: { id: bookid }
  }).catch((err) => {
    _message.error.message = 'An error occurred while getting data';
    return res.status(_status.error).send(_message.error);
  });

  if (book == null) {
    _message.error.message = 'No data deleted';
    return res.status(_status.notfound).send(_message.error);
  }

  _message.success.data = {};
  return res.status(_status.success).send(_message.success);
}

// update book


module.exports = {
  getBooks,
  getBookById,
  getBooksWithAuthor,
  addNewBook,
  deleteBook
}
