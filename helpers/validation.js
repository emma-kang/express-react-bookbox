const env = require ('../env');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Generate Token
 * @param {string} id
 * @returns {string} token
 */
const generateUserToken = (email, id, first_name, last_name, isadmin) => {
  const token = jwt.sign({
    email,
    user_id: id,
    first_name,
    last_name,
    isadmin
  }, env.secret, { expiresIn: '1h' });

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

module.exports = {
    generateUserToken,
    hashPassword,
    comparePassword
}