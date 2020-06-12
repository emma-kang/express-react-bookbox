"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bookController = require("../controllers/bookController");

var router = _express["default"].Router();

router.get('/', _bookController.getAllBooks);
module.exports = router;