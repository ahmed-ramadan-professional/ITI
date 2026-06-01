const logger = require('logforge-logger-sdk');
const config = require('../config/selfLogger');
const Application = require('../models/Application');
const Developer = require('../models/Developer');

let initialized = false;

async function ensureConfiguredApplication() {
  if (!config.autoProvision) return;

  const developer = await Developer.findOne({ apiKey: config.apiKey }).lean();
  if (!developer) {
    console.warn('[api-logger] Auto-provision skipped: configured API key does not match a developer.');
    return;
  }

  const existingApplication = await Application.findOne({ name: config.appName }).lean();
  if (!existingApplication) {
    await Application.create({ name: config.appName, developerId: developer._id });
    console.log(`[api-logger] Created configured application "${config.appName}".`);
    return;
  }

  if (existingApplication.developerId.toString() !== developer._id.toString()) {
    console.warn(`[api-logger] Auto-provision skipped: "${config.appName}" belongs to another developer.`);
  }
}

async function initializeApiLogger() {
  if (!config.enabled) return false;

  await ensureConfiguredApplication();

  logger.init({
    apiKey: config.apiKey,
    appName: config.appName,
    baseUrl: config.baseUrl,
    maxRetries: config.maxRetries,
    timeoutMs: config.timeoutMs,
    throwOnError: false
  });

  initialized = true;
  return true;
}

function normalizeMessage(message) {
  return String(message).replace(/\s+/g, ' ').trim().slice(0, 500);
}

async function writeApiLog(level, message) {
  if (!initialized) return { ok: false, skipped: true };

  try {
    const result = await logger.log({ level, message: normalizeMessage(message) });

    if (!result.ok) {
      console.warn(`[api-logger] Failed to send log: ${result.error}`);
    }

    return result;
  } catch (error) {
    console.warn(`[api-logger] Failed to send log: ${error.message}`);
    return { ok: false, error: error.message };
  }
}

module.exports = {
  initializeApiLogger,
  writeApiLog
};
