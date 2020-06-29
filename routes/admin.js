const express = require('express');
const authorController = require('../controllers/authorController');
const booksController = require('../controllers/bookController');
const usersController = require('../controllers/userController');
const commentsController = require('../controllers/commentController');

const router = express.Router();

router.get('/authors', authorController.getAuthors);

module.exports = router;

