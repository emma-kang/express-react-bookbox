// import express from 'express';
// import { getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController';

// const router = express.Router();

// router.get('/', getAllBooks);
// router.get('/:bookId', getBookById);
// router.post('/:bookId', updateBook);
// router.delete('/:bookId', deleteBook);

// module.exports = router;

const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.get('/', commentController.getComments);

module.exports = router;
