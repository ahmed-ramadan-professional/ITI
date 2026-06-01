const env = require('./env');

const DEFAULT_API_KEY = '991d0e74ad6ddbc7a46167c9b576d3fce424965cc7184838d330768957e8c33e';

function parseBoolean(value, fallback) {
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
}

function parseInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) ? parsed : fallback;
}

const enabled = parseBoolean(process.env.LOGGER_ENABLED, env.nodeEnv !== 'test');

if (env.nodeEnv === 'production' && enabled) {
  for (const name of ['LOGGER_API_KEY', 'LOGGER_APP_NAME', 'LOGGER_BASE_URL']) {
    if (!process.env[name]) {
      throw new Error(`${name} must be configured when API self-logging is enabled in production.`);
    }
  }
}

module.exports = Object.freeze({
  enabled,
  appName: process.env.LOGGER_APP_NAME || 'LogForge',
  apiKey: process.env.LOGGER_API_KEY || DEFAULT_API_KEY,
  baseUrl: process.env.LOGGER_BASE_URL || `http://127.0.0.1:${env.port}`,
  autoProvision: parseBoolean(process.env.LOGGER_AUTO_PROVISION, env.nodeEnv === 'development'),
  maxRetries: Math.max(0, parseInteger(process.env.LOGGER_MAX_RETRIES, 0)),
  timeoutMs: Math.max(500, parseInteger(process.env.LOGGER_TIMEOUT_MS, 1500))
});
