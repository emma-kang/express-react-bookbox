const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/:bookid', bookController.getBookById);
// router.post('/:bookid, bookController.updateBook);
router.delete('/:bookid', bookController.deleteBook);

module.exports = router;

