const jwt = require('jsonwebtoken');
const env = require('../config/env');

function signAuthToken(payload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

function verifyAuthToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

function buildCookieOptions() {
  const isProd = env.nodeEnv === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
}

module.exports = {
  signAuthToken,
  verifyAuthToken,
  buildCookieOptions
};