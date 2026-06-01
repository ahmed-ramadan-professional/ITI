const dotenv = require('dotenv');

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const nodeEnv = process.env.NODE_ENV || 'development';

function requireProductionValue(name) {
  if (nodeEnv === 'production' && !process.env[name]) {
    throw new Error(`${name} must be configured in production.`);
  }
}

requireProductionValue('MONGO_URI');
requireProductionValue('JWT_SECRET');
requireProductionValue('DASHBOARD_ORIGIN');

const port = Number(process.env.API_PORT || 5000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('API_PORT must be an integer between 1 and 65535.');
}

const env = {
  nodeEnv,
  port,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/logforge',
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  dashboardOrigin: process.env.DASHBOARD_ORIGIN || 'http://localhost:5173',
  cookieName: process.env.COOKIE_NAME || 'logforge_token'
};

module.exports = env;
