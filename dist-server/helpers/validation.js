"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.hashPassword = exports.generateUserToken = void 0;

var _env = _interopRequireDefault(require("../env"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

/**
 * Generate Token
 * @param {string} id
 * @returns {string} token
 */
var generateUserToken = function generateUserToken(email, id, firstname, lastname, isadmin) {
  var token = _jsonwebtoken["default"].sign({
    email: email,
    user_id: id,
    firstname: firstname,
    lastname: lastname,
    isadmin: isadmin
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