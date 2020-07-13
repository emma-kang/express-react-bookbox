const models = require('../models');
const _status = require('../helpers/status');
const _message = require('../helpers/message');

/**
 * Get All books 
 * @param {*} req 
 * @returns {object} 
 */
const getBooks = async (req, res) => {
  const books = await models.Books.findAll()
    .catch((err) => {
      console.log(err);
      _message.error.message = 'An error occurred while operating data';
      return res.status(_status.error).json(_message.error);
    });

  if (books == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = books;
  return res.status(_status.success).json(_message.success);
}

/**
 * Get books by Author Id
 * @param {int} authorId  
 * @returns {object}
 */
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
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (books == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = books;
  return res.status(_status.success).json(_message.success);
}

/**
 * Get book by bookId
 * @param {int} bookId 
 * @returns {object}
 */
const getBookById = async (req, res) => {
  const { bookid } = req.params;
  const book = await models.Books.findByPk(bookid)
    .catch((err) => {
      console.log(err);
      _message.error.message = 'An error occurred while operating data';
      return res.status(_status.error).json(_message.error);
    });

  if (book == null) {
    _message.error.message = 'No data';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = book;
  return res.status(_status.success).json(_message.success);
}

/**
 * Only Admin user
 * Add new Book 
 * @param {object} bookInfo 
 * @returns {object}
 */
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
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (created) {
    _message.error.message = 'Already existed book. Please check the information';
    return res.status(_status.conflict).json(_message.error);
  }

  _message.success.data = newBook;
  return res.status(_status.created).json(_message.success);

}

/**
 * Only Admin User
 * Delete Book
 * @param {int} bookId 
 * @returns {object}
 */
const deleteBook = async (req, res) => {
  const { bookid } = req.params;
  const book = await models.Books.destroy({
    where: { id: bookid }
  }).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (book == null) {
    _message.error.message = 'No data deleted';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = {};
  return res.status(_status.success).json(_message.success);
}

/**
 * Only Admin User
 * Update Book 
 * @param {int} bookId 
 * @returns {object}
 */
const updateBook = async (req, res) => {
  const { bookid } = req.params;
  const { imageurl, description } = req.body;

  const book = await models.Books.update({ imageurl: imageurl, description: description }, {
    where: {
      id: bookid
    }
  }).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (book == null) {
    _message.error.message = 'No matching data with the book id';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = book;
  return res.status(_status.success).json(_message.success);

}

module.exports = {
  getBooks,
  getBookById,
  getBooksWithAuthor,
  addNewBook,
  deleteBook,
  updateBook
}
