const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  ipAddress: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true,
    default: 'PAGE_VIEW'
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  deviceInfo: {
    type: String,
    default: 'Unknown'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for efficient querying/filtering in analytics dashboard
userActivitySchema.index({ timestamp: -1 });
userActivitySchema.index({ action: 1 });
userActivitySchema.index({ ipAddress: 1 });

const UserActivity = mongoose.model('UserActivity', userActivitySchema);
module.exports = UserActivity;
