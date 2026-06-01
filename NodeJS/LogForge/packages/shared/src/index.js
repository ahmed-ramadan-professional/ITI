const LOG_LEVELS = Object.freeze(['INFO', 'WARN', 'ERROR']);

const DEFAULT_LOG_PAGE = 1;
const DEFAULT_LOG_LIMIT = 10;
const MAX_LOG_LIMIT = 100;

function isValidLogLevel(level) {
  return LOG_LEVELS.includes(level);
}

function hasWhitespace(value) {
  return /\s/.test(value);
}

function normalizePagination({ page, limit }) {
  const normalizedPage = Number.isInteger(page) && page > 0 ? page : DEFAULT_LOG_PAGE;
  const normalizedLimit = Number.isInteger(limit)
    ? Math.min(Math.max(limit, 1), MAX_LOG_LIMIT)
    : DEFAULT_LOG_LIMIT;

  return {
    page: normalizedPage,
    limit: normalizedLimit,
    skip: (normalizedPage - 1) * normalizedLimit
  };
}

module.exports = {
  LOG_LEVELS,
  DEFAULT_LOG_PAGE,
  DEFAULT_LOG_LIMIT,
  MAX_LOG_LIMIT,
  isValidLogLevel,
  hasWhitespace,
  normalizePagination
};