import dbQuery from '../database/dbQuery';

import { errorMsg, successMsg, status } from '../helpers/status';

const getAllBooks = async (req, res) => {
    const sql = `SELECT b.*, CONCAT(a.firstname, ' ', a.lastname) author
                 FROM books b JOIN authors a on b.authorid = a.id ORDER BY b.id ASC`;
    try {
        const { rows } = await dbQuery.query(sql);
        const dbResponse = rows;

        if (dbResponse[0] == undefined) {
            errorMsg.error = 'There is no stored book in the system';
            return res.status(status.notfound).send(errorMsg);
        }
        successMsg.data = dbResponse;
        return res.status(status.success).send(successMsg);
    } catch (error) {
        errorMsg.error = 'An error occurred while getting data';
        return res.status(status.error).send(errorMsg);
    }
};

const getBookById = async (req, res) => {
    const { bookId } = req.params.bookId;
    const sql = `SELECT * from books WHERE id=$1`;

    try {
        const { rows } = await dbQuery.query(sql, [bookId]);
        const dbResponse = rows;

        if (dbResponse[0] == undefined) {
            errorMsg.error = 'The book with the book id does not exist';
            return res.status(status.notfound).send(errorMsg);
        }

        successMsg.data = dbResponse;
        return res.status(status.success).send(successMsg);
    } catch (error) {
        errorMsg.error = 'An error occurred while getting data';
        return res.status(status.error).send(errorMsg);
    }
};

const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const { title, publisher, published, category, isbn, language, imageurl, description } = req.body;
    const { isadmin } = req.user;
    const sql = `UPDATE books 
                 SET title=$1, publisher=$2, published=$3
                    , category=$4, isbn=$5, language=$6, imageurl=$7
                    , description=$8 WHERE id=$8 returning *`;

    const values = [title, publisher, published, category, isbn, language, imageurl, description, bookId];

    if (isadmin !== 1) {
        errorMsg.error = 'You are unauthoried to update book information';
        return res.status(status.bad).send(errorMsg);
    }

    try {
        const { rows } = await dbQuery.query(sql, values);
        const dbResponse = rows[0];

        if (!dbResponse) {
            errorMsg.error = 'There is no book with the id';
            return res.status(status.notfound).send(errorMsg);
        }

        successMsg.data = dbResponse;
        return res.status(status.success).send(successMsg);
    } catch (error) {
        errorMsg.error = 'An error occurred while updating the data';
        return res.status(status.error).send(errorMsg);
    }
}

const deleteBook = async (req, res) => {
    const { bookId } = req.params;
    const { isadmin } = req.user;
    const sql = `DELETE FROM books WHERE id=$1 returning *`;

    if (isadmin !== 1) {
        errorMsg.error = 'You are unauthoried to remove book information';
        return res.status(status.bad).send(errorMsg);
    } 

    try {
        const { rows } = await dbQuery.query(sql, [bookId]);
        const dbResponse = rows[0];

        if (!dbResponse) {
            errorMsg.error = 'There is no book with the id';
            return res.status(status.notfound).send(errorMsg);
        }

        successMsg.data = {};
        successMsg.data.message = 'The book deleted successfully';
        return res.status(status.success).send(successMsg);
    } catch (error) {
        return res.status(status.error).send(error);
    }
};

export {
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
}