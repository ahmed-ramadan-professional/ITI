const { writeApiLog } = require('../services/apiLogger');

const LOG_INGESTION_PATH = /^\/api\/applications\/[^/]+\/logs\/?$/;

function shouldSkipRequest(req) {
  return req.method === 'POST' && LOG_INGESTION_PATH.test(req.path);
}

function getLevel(statusCode) {
  if (statusCode === 404 || statusCode >= 500) return 'ERROR';
  if (statusCode >= 400) return 'WARN';
  return 'INFO';
}

function logApiRequest(req, res, next) {
  if (shouldSkipRequest(req)) return next();

  const path = req.path;

  res.on('finish', () => {
    void writeApiLog(getLevel(res.statusCode), `HTTP ${req.method} ${path} -> ${res.statusCode}`);
  });

  return next();
}

module.exports = logApiRequest;
