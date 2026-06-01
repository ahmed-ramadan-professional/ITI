const env = require('../config/env');
const { verifyAuthToken } = require('../utils/jwt');

function authenticateUser(req, res, next) {
  const token = req.cookies?.[env.cookieName];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const decoded = verifyAuthToken(token);
    req.user = { id: decoded.sub, email: decoded.email };
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired session.' });
  }
}

module.exports = authenticateUser;
