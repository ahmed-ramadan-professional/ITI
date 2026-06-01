function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const isDuplicateKey = err.code === 11000;
  const isValidationError = err.name === 'ValidationError' || err.name === 'ZodError';
  const statusCode = err.statusCode || (isDuplicateKey ? 409 : isValidationError ? 400 : 500);
  const message = isDuplicateKey
    ? 'A resource with that value already exists.'
    : err.message || 'Internal server error.';

  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  return res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {})
  });
}

module.exports = errorHandler;
