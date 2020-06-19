import moment from 'moment';
import dbQuery from "../database/dbQuery";

import {
  errorMsg, successMsg, status
} from "../helpers/status";

const getComments = async (req, res) => {
    const sql = `SELECT * FROM comments`;

    try {
        const { rows } = await dbQuery.query(sql);
        const dbResponse = rows;

        if (dbResponse[0] == undefined) {
            errorMsg.error = 'There is no stored comments';
            return res.status(status.notfound).send(errorMsg);
        }

        successMsg.data = dbResponse;
        return res.status(status.success).send(successMsg);
    } catch (error) {
        errorMsg.error = 'An error occurred while getting data';
        return res.status(status.error).send(errorMsg);
    }

};

const getCommentsByBook = async (req, res) => {
    const { bookId } = req.params;
    const sql = `SELECT * FROM comments WHERE bookid=$1`;

    try {
        const { rows } = await dbQuery.query(sql, [bookId]);
        const dbResponse = rows;

        if (dbResponse[0] == undefined) {
            errorMsg.error = 'There is no stored comments with the book';
            return res.status(status.notfound).send(errorMsg);
        }

        successMsg.data = dbResponse;
        return res.status(status.success).send(successMsg);
    } catch (error) {
        errorMsg.error = 'An error occurred while getting data';
        return res.status(status.error).send(errorMsg);
    }
};

export {
    getComments,
    getCommentsByBook
}