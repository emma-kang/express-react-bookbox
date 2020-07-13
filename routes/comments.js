const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.get('/', commentController.getComments);
router.post('/', commentController.addNewComment);
router.get('/:bookid', commentController.getCommentByBook);
router.put('/:userid&:commentid', commentController.updateComment);
router.delete('/:userid&:commentid', commentController.deleteComment);

module.exports = router;
