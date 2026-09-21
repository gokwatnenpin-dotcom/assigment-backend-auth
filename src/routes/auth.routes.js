const express = require('express');
const router = express.Router();

const { register, login, getProfile } = require('../controllers/auth.controller');
const authenticate = require('../middleware/authentication');
const { validateRegister, validateLogin } = require('../middleware/validation');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.get('/profile', authenticate, getProfile);

module.exports = router;
