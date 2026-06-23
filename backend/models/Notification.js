const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  type: {
    type: String,
    enum: ['order', 'system', 'promotion', 'new_order', 'payment_success'],
    default: 'system'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  link: {
    type: String
  }
}, {
  timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
