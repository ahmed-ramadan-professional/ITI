const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\S+$/
    },
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
      required: true,
      index: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

module.exports = mongoose.model('Application', applicationSchema);