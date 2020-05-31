"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _verifyAuth = _interopRequireDefault(require("../middleware/verifyAuth"));

var router = _express["default"].Router();

router.get('/login', _verifyAuth["default"], _userController.loginUser);
router.post('/signup', _verifyAuth["default"], _userController.createNewUser);
module.exports = router;