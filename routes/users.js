const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:userid', userController.getUserById);
router.post('/login', userController.loginUser);
router.post('/signup', userController.createNewUser);

module.exports = router;
