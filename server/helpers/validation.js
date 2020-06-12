import env from '../env';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
        lastname
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
    generateUserToken,
    hashPassword,
    comparePassword
}