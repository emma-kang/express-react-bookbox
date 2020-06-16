"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommentsByBook = exports.getComments = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _moment = _interopRequireDefault(require("moment"));

var _dbQuery = _interopRequireDefault(require("../database/dbQuery"));

var _status = require("../helpers/status");

var getComments = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var sql, _yield$dbQuery$query, rows, dbResponse;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sql = "SELECT * FROM comments returning *";
            _context.prev = 1;
            _context.next = 4;
            return _dbQuery["default"].query(sql);

          case 4:
            _yield$dbQuery$query = _context.sent;
            rows = _yield$dbQuery$query.rows;
            dbResponse = rows;

            if (!(dbResponse[0] == undefined)) {
              _context.next = 10;
              break;
            }

            _status.errorMsg.error = 'There is no stored comments';
            return _context.abrupt("return", res.status(_status.status.notfound).send(_status.errorMsg));

          case 10:
            _status.successMsg.data = dbResponse;
            return _context.abrupt("return", res.status(_status.status.success).send(_status.successMsg));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            _status.errorMsg.error = 'An error occurred while getting data';
            return _context.abrupt("return", res.status(_status.status.error).send(_status.errorMsg));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 14]]);
  }));

  return function getComments(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getComments = getComments;

var getCommentsByBook = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var bookId, sql, _yield$dbQuery$query2, rows, dbResponse;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            bookId = req.params.bookId;
            sql = "SELECT * FROM comments WHERE bookid=$1";
            _context2.prev = 2;
            _context2.next = 5;
            return _dbQuery["default"].query(sql, [bookId]);

          case 5:
            _yield$dbQuery$query2 = _context2.sent;
            rows = _yield$dbQuery$query2.rows;
            dbResponse = rows;

            if (!(dbResponse[0] == undefined)) {
              _context2.next = 11;
              break;
            }

            _status.errorMsg.error = 'There is no stored comments with the book';
            return _context2.abrupt("return", res.status(_status.status.notfound).send(_status.errorMsg));

          case 11:
            _status.successMsg.data = dbResponse;
            return _context2.abrupt("return", res.status(_status.status.success).send(_status.successMsg));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](2);
            _status.errorMsg.error = 'An error occurred while getting data';
            return _context2.abrupt("return", res.status(_status.status.error).send(_status.errorMsg));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 15]]);
  }));

  return function getCommentsByBook(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCommentsByBook = getCommentsByBook;