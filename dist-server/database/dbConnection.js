"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _pool = _interopRequireDefault(require("./pool"));

_pool["default"].on('connect', function () {
  console.log('connected to the database');
});