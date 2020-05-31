"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllBooks = void 0;

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
            sql = "SELECT * FROM books ORDER BY 1";
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