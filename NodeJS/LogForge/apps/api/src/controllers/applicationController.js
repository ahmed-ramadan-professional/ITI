const { z } = require('zod');
const { hasWhitespace } = require('@logforge/shared');
const Application = require('../models/Application');
const Log = require('../models/Log');
const LogEvent = require('../models/LogEvent');

const createApplicationSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(80)
    .refine((value) => !hasWhitespace(value), 'Application name must not contain whitespaces.')
});

async function getApplications(req, res) {
  const applications = await Application.find({ developerId: req.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({ applications });
}

async function getApplicationByName(req, res) {
  const application = await Application.findOne({
    name: req.params.name,
    developerId: req.user.id
  }).lean();

  if (!application) {
    return res.status(404).json({ message: 'Application not found.' });
  }

  return res.status(200).json({ application });
}

async function createApplication(req, res) {
  const { name } = createApplicationSchema.parse(req.body);

  const existing = await Application.findOne({ name }).lean();
  if (existing) {
    return res.status(409).json({ message: 'Application name is already used.' });
  }

  const application = await Application.create({
    name,
    developerId: req.user.id
  });

  return res.status(201).json({ application });
}

async function deleteApplication(req, res) {
  const deleted = await Application.findOneAndDelete({
    name: req.params.name,
    developerId: req.user.id
  }).lean();

  if (!deleted) {
    return res.status(404).json({ message: 'Application not found.' });
  }

  await Promise.all([
    Log.deleteMany({ applicationId: deleted._id }),
    LogEvent.deleteMany({ applicationId: deleted._id })
  ]);

  return res.status(200).json({ message: 'Application deleted.' });
}

module.exports = {
  getApplications,
  getApplicationByName,
  createApplication,
  deleteApplication
};
