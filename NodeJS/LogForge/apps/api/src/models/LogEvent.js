const mongoose = require('mongoose');
const { LOG_LEVELS } = require('@logforge/shared');

const logEventSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
      index: true
    },
    level: {
      type: String,
      enum: LOG_LEVELS,
      required: true,
      index: true
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    occurredAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: false
  }
);

module.exports = mongoose.model('LogEvent', logEventSchema);