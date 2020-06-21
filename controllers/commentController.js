const _status = require('../helpers/status');
const Comments = require('../models/comments');

exports.getComments = async (req, res) => {
        Comments.findAll()
          .then(comments => {
            if (comments == null) {
              _status.errorMsg.error = 'There is no stored comments';
              return res.status(_status.status.notfound).send(_status.errorMsg);
            }
            _status.successMsg.data = comments;
            return res.status(_status.status.success).send(_status.successMsg);
          })
          .catch(error => {
            _status.errorMsg.error = 'An error occurred while getting data:' + error;
            return res.status(_status.status.error).send(_status.errorMsg);
          });
    
};

// const moment = require('moment');
// const dbQuery = require('../database/dbQuery');

// import {
//   errorMsg, successMsg, status
// } from "../helpers/status";

// const getComments = async (req, res) => {
//     const sql = `SELECT * FROM comments`;

//     try {
//         const { rows } = await dbQuery.query(sql);
//         const dbResponse = rows;

//         if (dbResponse[0] == undefined) {
//             errorMsg.error = 'There is no stored comments';
//             return res.status(status.notfound).send(errorMsg);
//         }

//         successMsg.data = dbResponse;
//         return res.status(status.success).send(successMsg);
//     } catch (error) {
//         errorMsg.error = 'An error occurred while getting data';
//         return res.status(status.error).send(errorMsg);
//     }

// };

// const getCommentsByBook = async (req, res) => {
//     const { bookId } = req.params;
//     const sql = `SELECT * FROM comments WHERE bookid=$1`;

//     try {
//         const { rows } = await dbQuery.query(sql, [bookId]);
//         const dbResponse = rows;

//         if (dbResponse[0] == undefined) {
//             errorMsg.error = 'There is no stored comments with the book';
//             return res.status(status.notfound).send(errorMsg);
//         }

//         successMsg.data = dbResponse;
//         return res.status(status.success).send(successMsg);
//     } catch (error) {
//         errorMsg.error = 'An error occurred while getting data';
//         return res.status(status.error).send(errorMsg);
//     }
// };

// export {
//     getComments,
//     getCommentsByBook
// }