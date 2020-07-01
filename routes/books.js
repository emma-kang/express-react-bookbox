const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/books/:bookid', bookController.getBookById);

module.exports = router;

