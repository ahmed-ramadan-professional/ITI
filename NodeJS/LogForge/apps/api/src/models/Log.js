const mongoose = require('mongoose');
const { LOG_LEVELS } = require('@logforge/shared');

const logSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
      index: true
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    level: {
      type: String,
      enum: LOG_LEVELS,
      required: true,
      index: true
    },
    count: {
      type: Number,
      required: true,
      default: 1,
      min: 1
    },
    firstOccurrenceAt: {
      type: Date,
      required: true
    },
    lastOccurrenceAt: {
      type: Date,
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

logSchema.index({ applicationId: 1, message: 1, level: 1 }, { unique: true });

module.exports = mongoose.model('Log', logSchema);