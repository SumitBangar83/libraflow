import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/Authentication.js';
// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

export default router;