const express = require('express');
const { z } = require('zod');
const asyncHandler = require('../middlewares/asyncHandler');
const authenticateUser = require('../middlewares/authenticateUser');
const { authLimiter } = require('../middlewares/rateLimiters');
const { register, login, logout, me } = require('../controllers/userController');

const router = express.Router();

function validateBody(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      return res.status(400).json({ message: error.errors?.[0]?.message || 'Invalid request body.' });
    }
  };
}

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

router.post('/register', authLimiter, validateBody(registerSchema), asyncHandler(register));
router.post('/login', authLimiter, validateBody(loginSchema), asyncHandler(login));
router.post('/logout', asyncHandler(logout));
router.get('/me', authenticateUser, asyncHandler(me));

module.exports = router;