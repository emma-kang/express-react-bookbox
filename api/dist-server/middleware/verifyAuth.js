"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _status = require("../helpers/status");

_dotenv["default"].config();
/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {ovject} next
 * @returns {Promise<*>} response object
 */


var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.header.token;

            if (token) {
              _context.next = 4;
              break;
            }

            _status.errorMsg.error = 'Token not provided';
            return _context.abrupt("return", res.status(_status.status.bad).send(_status.errorMsg));

          case 4:
            _context.prev = 4;
            decoded = _jsonwebtoken["default"].verify(token, process.env.SECRET);
            req.user = {
              email: decoded.email,
              user_id: decoded.user_id,
              first_name: decoded.first_name,
              last_name: decoded.last_name,
              isAdmin: decoded.isAdmin
            };
            next();
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](4);
            _status.errorMsg.error = 'Authentication Failed';
            return _context.abrupt("return", res.status(_status.status.unauthorized).send(_status.errorMsg));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 10]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = verifyToken;
exports["default"] = _default;