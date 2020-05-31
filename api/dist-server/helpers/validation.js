"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.hashPassword = exports.generateUserToken = exports.isEmpty = exports.validatePassword = exports.isValidEmail = void 0;

var _env = _interopRequireDefault(require("../env"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

/**
 * isValidEmail helper Method
 * @param {string} email
 * @returns {Boolean}
 */
var isValidEmail = function isValidEmail(email) {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};
/**
 * validatePassword helper Method
 * @param {string} password
 * @returns {Boolean}
 */


exports.isValidEmail = isValidEmail;

var validatePassword = function validatePassword(password) {
  if (password.length <= 5 || password === '') {
    return false;
  }

  return true;
};
/**
 * isEmpty helper Method
 * @param {string, string, string} input
 * @returns {Boolean}
 */


exports.validatePassword = validatePassword;

var isEmpty = function isEmpty(input) {
  if (input === undefined || input === '') {
    return true;
  }

  if (input.replace(/s/g, '').length) {
    return false;
  }

  return true;
};
/**
 * Generate Token
 * @param {string} id
 * @returns {string} token
 */


exports.isEmpty = isEmpty;

var generateUserToken = function generateUserToken(email, id, firstname, lastname) {
  var token = _jsonwebtoken["default"].sign({
    email: email,
    user_id: id,
    firstname: firstname,
    lastname: lastname,
    isAdmin: isAdmin
  }, _env["default"].secret, {
    expiresIn: '1h'
  });

  return token;
};
/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */


exports.generateUserToken = generateUserToken;
var saltRounds = 10;

var salt = _bcryptjs["default"].genSaltSync(saltRounds);

var hashPassword = function hashPassword(password) {
  return _bcryptjs["default"].hashSync(password, salt);
};
/**
 * comparePassword Method
 * @param hashedPasswords
 * @param password
 * @returns {boolean}
 */


exports.hashPassword = hashPassword;

var comparePassword = function comparePassword(hashedPasswords, password) {
  return _bcryptjs["default"].compareSync(password, hashedPasswords);
};

exports.comparePassword = comparePassword;