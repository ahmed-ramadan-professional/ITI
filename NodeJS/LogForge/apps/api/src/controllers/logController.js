const { z } = require('zod');
const { isValidLogLevel, normalizePagination, LOG_LEVELS } = require('@logforge/shared');
const Application = require('../models/Application');
const Log = require('../models/Log');
const LogEvent = require('../models/LogEvent');

const createLogSchema = z.object({
  message: z.string().trim().min(1).max(500),
  level: z.enum(LOG_LEVELS)
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function resolveOwnedApplication(name, developerId) {
  return Application.findOne({ name, developerId }).lean();
}

async function getApplicationLogs(req, res) {
  const application = await resolveOwnedApplication(req.params.name, req.user.id);
  if (!application) {
    return res.status(404).json({ message: 'Application not found.' });
  }

  const page = Number.parseInt(req.query.page, 10);
  const limit = Number.parseInt(req.query.limit, 10);
  const { page: currentPage, limit: currentLimit, skip } = normalizePagination({ page, limit });

  const sortBy = req.query.sortBy === 'count' ? 'count' : 'recent';
  const level = req.query.level;
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';

  const filter = { applicationId: application._id };
  if (level && isValidLogLevel(level)) {
    filter.level = level;
  }
  if (search) {
    filter.message = { $regex: escapeRegex(search), $options: 'i' };
  }

  const sort = sortBy === 'count' ? { count: -1, lastOccurrenceAt: -1 } : { lastOccurrenceAt: -1 };

  const [logs, total] = await Promise.all([
    Log.find(filter).sort(sort).skip(skip).limit(currentLimit).lean(),
    Log.countDocuments(filter)
  ]);

  return res.status(200).json({
    logs,
    pagination: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPages: Math.ceil(total / currentLimit) || 1
    }
  });
}

async function postLog(req, res) {
  const { message, level } = createLogSchema.parse(req.body);

  const application = await resolveOwnedApplication(req.params.name, req.apiDeveloper.id);
  if (!application) {
    return res.status(403).json({ message: 'API key owner does not own this application.' });
  }

  const now = new Date();

  const log = await Log.findOneAndUpdate(
    {
      applicationId: application._id,
      message,
      level
    },
    {
      $inc: { count: 1 },
      $set: {
        lastOccurrenceAt: now,
        updatedAt: now
      },
      $setOnInsert: {
        firstOccurrenceAt: now,
        createdAt: now
      }
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  ).lean();

  await LogEvent.create({
    applicationId: application._id,
    message,
    level,
    occurredAt: now
  });

  return res.status(201).json({ log });
}

async function getLogAnalytics(req, res) {
  const application = await resolveOwnedApplication(req.params.name, req.user.id);
  if (!application) {
    return res.status(404).json({ message: 'Application not found.' });
  }

  const from = req.query.from ? new Date(req.query.from) : null;
  const to = req.query.to ? new Date(req.query.to) : null;
  const level = req.query.level;
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';

  const match = { applicationId: application._id };
  if (from || to) {
    match.occurredAt = {};
    if (from && !Number.isNaN(from.valueOf())) {
      match.occurredAt.$gte = from;
    }
    if (to && !Number.isNaN(to.valueOf())) {
      match.occurredAt.$lte = to;
    }
  }
  if (level && isValidLogLevel(level)) {
    match.level = level;
  }
  if (search) {
    match.message = { $regex: escapeRegex(search), $options: 'i' };
  }

  const [totalsRaw, seriesRaw] = await Promise.all([
    LogEvent.aggregate([
      { $match: match },
      { $group: { _id: '$level', total: { $sum: 1 } } }
    ]),
    LogEvent.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            day: { $dateToString: { format: '%Y-%m-%d', date: '$occurredAt' } },
            level: '$level'
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { '_id.day': 1 } }
    ])
  ]);

  const totalsByLevel = LOG_LEVELS.reduce((acc, logLevel) => {
    acc[logLevel] = 0;
    return acc;
  }, {});

  for (const row of totalsRaw) {
    totalsByLevel[row._id] = row.total;
  }

  const dailyMap = new Map();
  for (const row of seriesRaw) {
    const day = row._id.day;
    if (!dailyMap.has(day)) {
      dailyMap.set(day, {
        date: day,
        INFO: 0,
        WARN: 0,
        ERROR: 0
      });
    }

    dailyMap.get(day)[row._id.level] = row.total;
  }

  return res.status(200).json({
    totalsByLevel,
    dailySeries: Array.from(dailyMap.values())
  });
}

module.exports = {
  getApplicationLogs,
  postLog,
  getLogAnalytics
};