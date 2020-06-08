"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.status = exports.errorMsg = exports.successMsg = void 0;
var successMsg = {
  status: 'success'
};
exports.successMsg = successMsg;
var errorMsg = {
  status: 'error'
};
exports.errorMsg = errorMsg;
var status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204
};
exports.status = status;