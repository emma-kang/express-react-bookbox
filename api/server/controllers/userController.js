import moment from 'moment';
import dbQuery from "../database/dbQuery";

import {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    generateUserToken
} from "../helpers/validation";

import {
    errorMsg, successMsg, status
} from "../helpers/status";

/**
 * Create New User Method
 * @param req
 * @param res
 * @returns {Promise<*>}
 */

const createNewUser = async (req, res) => {
    const {
        email, firstname, lastname, password
    } = req.body;

    const createddate = moment(new Date());
    if (isEmpty(email) || isEmpty(firstname) || isEmpty(lastname) || isEmpty(password)) {
        errorMsg.error = 'All fields cannot be empty';
        return res.status(status.bad).send(errorMsg);
    }
    if (!isValidEmail(email)) {
        errorMsg.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMsg);
    }
    if (!validatePassword(password)) {
        errorMsg.error = 'Password must be more than five characters';
        return res.status(status.bad).send(errorMsg);
    }
    const hashedPassword = hashPassword(password);
    const sql = `INSERT INTO users 
    (useremail, password, firstname, lastname, createddate) values($1, $2, $3, $4, $5)
    returning *`;

    const values = [email, hashedPassword, firstname, lastname, createddate];

    try {
        const { rows } = await dbQuery.query(sql, values);
        const dbResponse = rows[0];
        delete dbResponse.password;
        const token = generateUserToken(dbResponse.email, dbResponse.id, 
            dbResponse.firstname, dbResponse.lastname, dbResponse.isadmin);
        successMsg.data = dbResponse;
        successMsg.data.token = token;
        return res.status(status.created).send(successMsg);
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMsg.error = 'User with that Email already exist';
            return res.status(status.conflict).send(errorMsg);
        }
        errorMsg.error = 'Operation was not successful';
        return res.status(status.error).send(errorMsg);
    }
};

/**
 * loginUser Method
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (isEmpty(email) || isEmpty(password)) {
        errorMsg.error = 'Email or Password is missing';
        return res.status(status.bad).send(errorMsg);
    }
    if (!isValidEmail(email) || !validatePassword(password)) {
        errorMsg.error = 'Please enter a valid email or password';
        return res.status(status.bad).send(errorMsg);
    }

    const sql = `SELECT * FROM users WHERE useremail = $1`;
    try {
        const { rows } = await dbQuery.query(sql, [email]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMsg.error = 'User with the email does not exist';
            return res.status(status.notfound).send(errorMsg);
        }
        if (!comparePassword(dbResponse.password, password)) {
            errorMsg.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMsg);
        }

        const token = generateUserToken(dbResponse.useremail, dbResponse.id, 
            dbResponse.firstname, dbResponse.lastname, dbResponse.isadmin);
        delete dbResponse.password;
        successMsg.data = dbResponse;
        successMsg.data.token = token;
        return res.status(status.success).send(successMsg);
    } catch (error) {
        errorMsg.error = 'Operation was not successful';
        return res.status(status.error).send(errorMsg);
    }
};

export {
    createNewUser,
    loginUser
}