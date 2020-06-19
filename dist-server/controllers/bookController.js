"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dbQuery = _interopRequireDefault(require("../database/dbQuery"));

var _status = require("../helpers/status");

var getAllBooks = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var sql, _yield$dbQuery$query, rows, dbResponse;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sql = "SELECT b.*, CONCAT(a.firstname, ' ', a.lastname) author\n                 FROM books b JOIN authors a on b.authorid = a.id ORDER BY b.id ASC";
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

            _status.errorMsg.error = 'There is no stored book in the system';
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

  return function getAllBooks(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAllBooks = getAllBooks;

var getBookById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var bookId, sql, _yield$dbQuery$query2, rows, dbResponse;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            bookId = req.params.bookId.bookId;
            sql = "SELECT * from books WHERE id=$1";
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

            _status.errorMsg.error = 'The book with the book id does not exist';
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

  return function getBookById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getBookById = getBookById;

var updateBook = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var bookId, _req$body, title, publisher, published, category, isbn, language, imageurl, description, isadmin, sql, values, _yield$dbQuery$query3, rows, dbResponse;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            bookId = req.params.bookId;
            _req$body = req.body, title = _req$body.title, publisher = _req$body.publisher, published = _req$body.published, category = _req$body.category, isbn = _req$body.isbn, language = _req$body.language, imageurl = _req$body.imageurl, description = _req$body.description;
            isadmin = req.user.isadmin;
            sql = "UPDATE books \n                 SET title=$1, publisher=$2, published=$3\n                    , category=$4, isbn=$5, language=$6, imageurl=$7\n                    , description=$8 WHERE id=$8 returning *";
            values = [title, publisher, published, category, isbn, language, imageurl, description, bookId];

            if (!(isadmin !== 1)) {
              _context3.next = 8;
              break;
            }

            _status.errorMsg.error = 'You are unauthoried to update book information';
            return _context3.abrupt("return", res.status(_status.status.bad).send(_status.errorMsg));

          case 8:
            _context3.prev = 8;
            _context3.next = 11;
            return _dbQuery["default"].query(sql, values);

          case 11:
            _yield$dbQuery$query3 = _context3.sent;
            rows = _yield$dbQuery$query3.rows;
            dbResponse = rows[0];

            if (dbResponse) {
              _context3.next = 17;
              break;
            }

            _status.errorMsg.error = 'There is no book with the id';
            return _context3.abrupt("return", res.status(_status.status.notfound).send(_status.errorMsg));

          case 17:
            _status.successMsg.data = dbResponse;
            return _context3.abrupt("return", res.status(_status.status.success).send(_status.successMsg));

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](8);
            _status.errorMsg.error = 'An error occurred while updating the data';
            return _context3.abrupt("return", res.status(_status.status.error).send(_status.errorMsg));

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[8, 21]]);
  }));

  return function updateBook(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateBook = updateBook;

var deleteBook = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var bookId, isadmin, sql, _yield$dbQuery$query4, rows, dbResponse;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            bookId = req.params.bookId;
            isadmin = req.user.isadmin;
            sql = "DELETE FROM books WHERE id=$1 returning *";

            if (!(isadmin !== 1)) {
              _context4.next = 6;
              break;
            }

            _status.errorMsg.error = 'You are unauthoried to remove book information';
            return _context4.abrupt("return", res.status(_status.status.bad).send(_status.errorMsg));

          case 6:
            _context4.prev = 6;
            _context4.next = 9;
            return _dbQuery["default"].query(sql, [bookId]);

          case 9:
            _yield$dbQuery$query4 = _context4.sent;
            rows = _yield$dbQuery$query4.rows;
            dbResponse = rows[0];

            if (dbResponse) {
              _context4.next = 15;
              break;
            }

            _status.errorMsg.error = 'There is no book with the id';
            return _context4.abrupt("return", res.status(_status.status.notfound).send(_status.errorMsg));

          case 15:
            _status.successMsg.data = {};
            _status.successMsg.data.message = 'The book deleted successfully';
            return _context4.abrupt("return", res.status(_status.status.success).send(_status.successMsg));

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](6);
            return _context4.abrupt("return", res.status(_status.status.error).send(_context4.t0));

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 20]]);
  }));

  return function deleteBook(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteBook = deleteBook;