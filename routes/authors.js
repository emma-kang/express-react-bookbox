const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router.get('/', authorController.getAuthors);
router.get('/:authorid', authorController.getAuthorById);

module.exports = router;