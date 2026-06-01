const LOG_LEVELS = Object.freeze(['INFO', 'WARN', 'ERROR']);

function isValidLogLevel(level) {
  return LOG_LEVELS.includes(level);
}

let config = null;

function init({ apiKey, appName, baseUrl, throwOnError = false, maxRetries = 2, timeoutMs = 5000 }) {
  if (!apiKey || typeof apiKey !== 'string' || !apiKey.trim()) {
    throw new Error('apiKey is required.');
  }
  if (!appName || typeof appName !== 'string' || /\s/.test(appName) || appName.length > 80) {
    throw new Error('appName is required, must not contain whitespaces, and must be 80 characters or fewer.');
  }
  if (!baseUrl || typeof baseUrl !== 'string') {
    throw new Error('baseUrl is required.');
  }

  let parsedBaseUrl;
  try {
    parsedBaseUrl = new URL(baseUrl);
  } catch {
    throw new Error('baseUrl must be a valid URL.');
  }

  if (!['http:', 'https:'].includes(parsedBaseUrl.protocol)) {
    throw new Error('baseUrl must use http or https.');
  }

  config = {
    apiKey: apiKey.trim(),
    appName,
    baseUrl: baseUrl.replace(/\/+$/, ''),
    throwOnError,
    maxRetries: Number.isInteger(maxRetries) ? Math.max(0, maxRetries) : 2,
    timeoutMs: Number.isInteger(timeoutMs) ? Math.max(500, timeoutMs) : 5000
  };

  return {
    appName: config.appName,
    baseUrl: config.baseUrl
  };
}

function ensureInitialized() {
  if (!config) {
    throw new Error('SDK is not initialized. Call init first.');
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function log({ message, level }) {
  ensureInitialized();

  if (!message || typeof message !== 'string' || !message.trim() || message.trim().length > 500) {
    throw new Error('message is required and must be 500 characters or fewer.');
  }

  if (!isValidLogLevel(level)) {
    throw new Error('level must be one of INFO, WARN, ERROR.');
  }

  const path = `/api/applications/${encodeURIComponent(config.appName)}/logs`;
  const url = `${config.baseUrl}${path}`;

  for (let attempt = 0; attempt <= config.maxRetries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey
        },
        body: JSON.stringify({ message: message.trim(), level }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      const text = await response.text();
      const payload = text ? JSON.parse(text) : {};

      if (response.ok) {
        return {
          ok: true,
          status: response.status,
          data: payload
        };
      }

      const retryable = response.status >= 500;
      if (!retryable || attempt === config.maxRetries) {
        const result = {
          ok: false,
          status: response.status,
          error: payload.message || 'Failed to send log.'
        };

        if (config.throwOnError) {
          const error = new Error(result.error);
          error.nonRetryable = true;
          throw error;
        }

        return result;
      }
    } catch (error) {
      clearTimeout(timeout);
      if (error.nonRetryable) throw error;

      const isLastAttempt = attempt === config.maxRetries;

      if (isLastAttempt) {
        const result = {
          ok: false,
          status: 0,
          error: error.message || 'Network request failed.'
        };

        if (config.throwOnError) {
          throw new Error(result.error);
        }

        return result;
      }
    }

    await sleep(150 * (attempt + 1));
  }

  return {
    ok: false,
    status: 0,
    error: 'Failed to send log.'
  };
}

module.exports = {
  init,
  log
};
