const express = require('express');
const { z } = require('zod');
const { LOG_LEVELS } = require('@logforge/shared');
const asyncHandler = require('../middlewares/asyncHandler');
const authenticateUser = require('../middlewares/authenticateUser');
const authenticateApiKey = require('../middlewares/authenticateApiKey');
const { ingestLimiter } = require('../middlewares/rateLimiters');
const {
  getApplications,
  getApplicationByName,
  createApplication,
  deleteApplication
} = require('../controllers/applicationController');
const { getApplicationLogs, postLog, getLogAnalytics } = require('../controllers/logController');

const router = express.Router();

const createAppSchema = z.object({
  name: z.string().min(1).max(80).regex(/^\S+$/, 'Whitespaces are not allowed in application names.')
});

const logBodySchema = z.object({
  message: z.string().trim().min(1).max(500),
  level: z.enum(LOG_LEVELS)
});

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

router.post(
  '/:name/logs',
  ingestLimiter,
  authenticateApiKey,
  validateBody(logBodySchema),
  asyncHandler(postLog)
);

router.use(authenticateUser);

router
  .route('/')
  .get(asyncHandler(getApplications))
  .post(validateBody(createAppSchema), asyncHandler(createApplication));

router.get('/:name/logs/analytics', asyncHandler(getLogAnalytics));
router.get('/:name/logs', asyncHandler(getApplicationLogs));
router.get('/:name', asyncHandler(getApplicationByName));
router.delete('/:name', asyncHandler(deleteApplication));

module.exports = router;