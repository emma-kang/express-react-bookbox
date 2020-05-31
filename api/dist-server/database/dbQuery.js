"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pool = _interopRequireDefault(require("./pool"));

var _default = {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query: function query(queryText, params) {
    return new Promise(function (resolve, reject) {
      _pool["default"].query(queryText, params).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};
exports["default"] = _default;