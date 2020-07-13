const express = require('express');
const authorController = require('../controllers/authorController');
const booksController = require('../controllers/bookController');
const usersController = require('../controllers/userController');

const router = express.Router();

router.get('/authors', authorController.getAuthors);
router.post('/authors', authorController.addNewAuthor);
router.post('/authors/:authorid', authorController.updateAuthor);
router.delete('/authors/:authorid', authorController.deleteAuthor);

router.get('/books', booksController.getBooks);
router.post('/books', booksController.addNewBook);
router.patch('/books/:bookid', booksController.updateBook);
router.delete('/books/:bookid', booksController.deleteBook);

router.patch('/users/{userid}', usersController.updateToAdmin);

module.exports = router;

