const models = require('../models');
const moment = require('moment');
const _status = require('../helpers/status');
const _message = require('../helpers/message');

const getComments = async (req, res) => {
  const comments = await models.Comments.findAll()
    .catch((err) => {
      _message.error.message = 'An error occurred while getting data';
      return res.status(_status.error).send(_message.error);
    });

  if (comments == null) {
    _message.error.message = 'No data';
    return res.status(_status.nocontent).send(_message.error);
  }

  _message.success.data = comment;

  return res.status(_status.success).send(_message.success);
}

const getCommentByBook = async (req, res) => {
  const { bookid } = req.params;
  const comments = await models.Comments.findAll({
    where: {
      bookid: bookid
    }
  }).catch((err) => {
    _message.error.message = 'An error occurred while getting data';
    return res.status(_status.error).send(_message.error);
  });

  if (comments == null) {
    _message.error.message = 'No data';
    return res.status(_status.nocontent).send(_message.error);
  }

  _message.success.data = comments;
  return res.status(_status.success).send(_message.success);

}

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
    _message.error.message = 'An error occurred while getting data';
    return res.status(_status.error).send(_message.error);
  });

  if (newComment == null) {
    _message.error.message = 'No data added';
    return res.status(_status.error).send(_message.error);
  }

  _message.success.data = newComment;
  return res.status(_status.success).send(_message.success);

}


// update comment, delete comment

module.exports = {
  getComments,
  getCommentByBook
}