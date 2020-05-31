import express from 'express';

import { loginUser, createNewUser } from '../controllers/userController';
import verifyAuth from '../middleware/verifyAuth';

const router = express.Router();

router.get('/login', verifyAuth, loginUser);
router.post('/signup', verifyAuth, createNewUser);

module.exports = router;
