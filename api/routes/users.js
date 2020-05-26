const userController = require('../controller/userController');
const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth');

router.get('/login', verifyAuth, userController.loginUser);
router.post('/signup', verifyAuth, userController.createNewUser);

module.exports = router;
