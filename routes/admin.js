const express = require('express');
const authorController = require('../controllers/authorController');
const booksController = require('../controllers/bookController');
const usersController = require('../controllers/userController');
const commentsController = require('../controllers/commentController');

const router = express.Router();

router.get('/authors', authorController.getAuthors);
router.post('/authors/:authorid', authorController.updateAuthor);
router.delete('/authors/:authorid', authorController.deleteAuthor);

router.get('/books', booksController.getBooks);
router.patch('/books/:bookid', booksController.updateBook);
router.delete('/books/:bookid', booksController.deleteBook);

module.exports = router;

