const moment = require('moment');
const dbQuery = require('../database/dbQuery');

import {
    errorMsg, successMsg, status
} from "../helpers/status";

/**
 * Get All Books Method 
 * @param {*} req 
 * @param {*} res 
 */

const getAllBooks = async (req, res) => {
    const sql = 'SELECT * FROM books ORDER BY 1';
    try {
        const { rows } = await dbQuery.query(sql);
        const dbResponse = rows;
        if (dbResponse[0] === undefined) {
            errorMsg.error = 'There is no stored book in the system';
            return res.status(status.notfound).send(errorMsg);
        }
        successMsg.data = dbResponse;
        return res.status(status.success).send(successMsg);
    } catch (error) {
        errorMsg.error = 'An error occurred while getting data';
        return res.status(status.error).send(errorMsg);
    }
}

export {
    getAllBooks
}