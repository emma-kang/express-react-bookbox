import env from '../env';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * isValidEmail helper Method
 * @param {string} email
 * @returns {Boolean}
 */
const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

/**
 * validatePassword helper Method
 * @param {string} password
 * @returns {Boolean}
 */
const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
}

/**
 * isEmpty helper Method
 * @param {string, string, string} input
 * @returns {Boolean}
 */

const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
    if (input.replace(/s/g, '').length) {
        return false;
    } return true;
}

/**
 * Generate Token
 * @param {string} id
 * @returns {string} token
 */
const generateUserToken = (email, id, firstname, lastname) => {
    const token = jwt.sign({
        email,
        user_id: id,
        firstname,
        lastname,
    },
    env.secret, { expiresIn: '1h'});

    return token;
}

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
 * comparePassword Method
 * @param hashedPasswords
 * @param password
 * @returns {boolean}
 */
const comparePassword = (hashedPasswords, password) => {
    return bcrypt.compareSync(password, hashedPasswords);
}

export {
    isValidEmail,
    validatePassword,
    isEmpty,
    generateUserToken,
    hashPassword,
    comparePassword
}