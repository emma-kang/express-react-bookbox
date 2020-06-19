"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: true
};
var pool = new _pg.Pool(databaseConfig);
var _default = pool;
exports["default"] = _default;