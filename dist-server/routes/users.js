"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var router = _express["default"].Router();

router.post('/login', _userController.loginUser);
router.post('/signup', _userController.createNewUser);
module.exports = router;