"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.createNewUser = exports.getUserById = exports.getUsers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _moment = _interopRequireDefault(require("moment"));

var _dbQuery = _interopRequireDefault(require("../database/dbQuery"));

var _validation = require("../helpers/validation");

var _status = require("../helpers/status");

var createNewUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, first_name, last_name, password, createdDate, hashedPassword, sql, values, _yield$dbQuery$query, rows, dbResponse, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, first_name = _req$body.first_name, last_name = _req$body.last_name, password = _req$body.password;
            createdDate = (0, _moment["default"])(new Date());
            hashedPassword = (0, _validation.hashPassword)(password);
            sql = "INSERT INTO users (useremail, password, firstname, lastname, createddate)\n               values ($1, $2, $3, $4, $5)\n               returning *";
            values = [email, hashedPassword, first_name, last_name, createdDate];
            _context.prev = 5;
            _context.next = 8;
            return _dbQuery["default"].query(sql, values);

          case 8:
            _yield$dbQuery$query = _context.sent;
            rows = _yield$dbQuery$query.rows;
            dbResponse = rows[0];
            delete dbResponse.password;
            token = (0, _validation.generateUserToken)(dbResponse.email, dbResponse.id, dbResponse.firstname, dbResponse.lastname, dbResponse.isadmin);
            _status.successMsg.data = dbResponse;
            _status.successMsg.data.token = token;
            return _context.abrupt("return", res.status(_status.status.created).send(_status.successMsg));

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](5);

            if (!(_context.t0.routine === '_bt_check_unique')) {
              _context.next = 23;
              break;
            }

            _status.errorMsg.error = 'User with that Email already exist';
            return _context.abrupt("return", res.status(_status.status.conflict).send(_status.errorMsg));

          case 23:
            _status.errorMsg.error = 'Operation was not successful';
            return _context.abrupt("return", res.status(_status.status.error).send(_status.errorMsg));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 18]]);
  }));

  return function createNewUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createNewUser = createNewUser;

var loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, email, password, sql, _yield$dbQuery$query2, rows, dbResponse, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            sql = "SELECT *\n               FROM users\n               WHERE useremail = $1";
            _context2.prev = 2;
            _context2.next = 5;
            return _dbQuery["default"].query(sql, [email]);

          case 5:
            _yield$dbQuery$query2 = _context2.sent;
            rows = _yield$dbQuery$query2.rows;
            dbResponse = rows[0];

            if (dbResponse) {
              _context2.next = 11;
              break;
            }

            _status.errorMsg.error = 'User with the email does not exist';
            return _context2.abrupt("return", res.status(_status.status.notfound).send(_status.errorMsg));

          case 11:
            if ((0, _validation.comparePassword)(dbResponse.password, password)) {
              _context2.next = 14;
              break;
            }

            _status.errorMsg.error = 'The password you provided is incorrect';
            return _context2.abrupt("return", res.status(_status.status.bad).send(_status.errorMsg));

          case 14:
            token = (0, _validation.generateUserToken)(dbResponse.useremail, dbResponse.id, dbResponse.firstname, dbResponse.lastname, dbResponse.isadmin);
            delete dbResponse.password;
            _status.successMsg.data = dbResponse;
            _status.successMsg.data.token = token;
            return _context2.abrupt("return", res.status(_status.status.success).send(_status.successMsg));

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](2);
            _status.errorMsg.error = 'Operation was not successful';
            return _context2.abrupt("return", res.status(_status.status.error).send(_status.errorMsg));

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 21]]);
  }));

  return function loginUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.loginUser = loginUser;

var getUsers = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var sql, _yield$dbQuery$query3, rows, dbResponse;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sql = "SELECT * from users ORDER By id";
            _context3.prev = 1;
            _context3.next = 4;
            return _dbQuery["default"].query(sql);

          case 4:
            _yield$dbQuery$query3 = _context3.sent;
            rows = _yield$dbQuery$query3.rows;
            dbResponse = rows;

            if (!(dbResponse[0] == undefined)) {
              _context3.next = 10;
              break;
            }

            _status.errorMsg.error = 'There is no stored users in the system';
            return _context3.abrupt("return", res.status(_status.status.notfound).send(_status.errorMsg));

          case 10:
            _status.successMsg.data = dbResponse;
            return _context3.abrupt("return", res.status(_status.status.success).send(_status.successMsg));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](1);
            _status.errorMsg.error = 'An error occurred while getting user data';
            return _context3.abrupt("return", res.status(_status.status.error).send(_status.errorMsg));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 14]]);
  }));

  return function getUsers(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var getUserById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userId, sql, _yield$dbQuery$query4, rows, dbResponse;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.params.userId;
            sql = "SELECT * from users WHERE id=$1";
            _context4.prev = 2;
            _context4.next = 5;
            return _dbQuery["default"].query(sql, [userId]);

          case 5:
            _yield$dbQuery$query4 = _context4.sent;
            rows = _yield$dbQuery$query4.rows;
            dbResponse = rows[0];

            if (dbResponse) {
              _context4.next = 11;
              break;
            }

            _status.errorMsg.error = 'User with the id does not exist';
            return _context4.abrupt("return", res.status(_status.status.notfound).send(_status.errorMsg));

          case 11:
            delete dbResponse.password;
            _status.successMsg.data = dbResponse;
            return _context4.abrupt("return", res.status(_status.status.success).send(_status.successMsg));

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](2);
            _status.errorMsg.error = 'Operation was not successful';
            return _context4.abrupt("return", res.status(_status.status.error).send(_status.errorMsg));

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 16]]);
  }));

  return function getUserById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;