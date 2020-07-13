const models = require('../models');
const moment = require('moment');
const _status = require('../helpers/status');
const _message = require('../helpers/message');

/**
 * Get comments 
 * @param {*} req 
 * @returns {object}
 */
const getComments = async (req, res) => {
  const comments = await models.Comments.findAll()
    .catch((err) => {
      _message.error.message = 'An error occurred while operating data';
      return res.status(_status.error).json(_message.error);
    });

  if (comments == null) {
    _message.error.message = 'No data';
    return res.status(_status.nocontent).json(_message.error);
  }

  _message.success.data = comment;

  return res.status(_status.success).json(_message.success);
}

/**
 * Get Comments by book 
 * @param {int} bookId 
 * @returns {object}
 */
const getCommentByBook = async (req, res) => {
  const { bookid } = req.params;
  const comments = await models.Comments.findAll({
    where: {
      bookid: bookid
    }
  }).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (comments == null) {
    _message.error.message = 'No data';
    return res.status(_status.nocontent).json(_message.error);
  }

  _message.success.data = comments;
  return res.status(_status.success).json(_message.success);

}

/**
 * Add new Comment 
 * @param {int} bookid
 * @param {int} userid  
 * @param {object} commentContents 
 */
const addNewComment = async (req, res) => {
  const { body } = req.body;
  const { bookid, userid } = req.params;
  const postingdate = moment(new Date());

  const newComment = await models.Comments.create(
    {
      bookid: bookid,
      postingdate: postingdate,
      userid: userid,
      body: body
    }
  ).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (newComment == null) {
    _message.error.message = 'No data added';
    return res.status(_status.error).json(_message.error);
  }

  _message.success.data = newComment;
  return res.status(_status.success).json(_message.success);

}

/**
 * Only comment's owner 
 * Update Comment 
 * @param {int} userid 
 * @param {int} commentid
 * @param {object} commentContents 
 */
const updateComment = async (req, res) => {
  const { userid, commentid } = req.params;
  const { bookid, body } = req.body;
  const updated = moment(new Date());

  const comment = await models.Comments.update({
    body: body, updatedAt: updated
  }, {
    where: {
      id: commentid,
      bookid: bookid,
      userid: userid
    }
  }).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (comment == null) {
    _message.error.message = 'No matching data';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = comment;
  return res.status(_status.success).json(_message.success);
}

/**
 * Only comment's owner 
 * Delete comment 
 * @param {int} userid 
 * @param {int} commentid 
 */
const deleteComment = async (req, res) => {
  const { userid, commentid } = req.params;

  const comment = await models.Comments.destroy({
    where: { id: commentid, userid: userid }
  }).catch((err) => {
    _message.error.message = 'An error occurred while operating data';
    return res.status(_status.error).json(_message.error);
  });

  if (comment == null) {
    _message.error.message = 'No data deleted';
    return res.status(_status.notfound).json(_message.error);
  }

  _message.success.data = {};
  return res.status(_status.success).json(_message.success);
}

module.exports = {
  getComments,
  getCommentByBook,
  addNewComment,
  updateComment,
  deleteComment
}