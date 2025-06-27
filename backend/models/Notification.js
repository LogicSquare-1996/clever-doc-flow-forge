
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['info', 'success', 'warning', 'error'],
    default: 'info'
  },
  category: {
    type: String,
    enum: ['document', 'account', 'system', 'payment'],
    default: 'system'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  actionUrl: String,
  actionText: String,
  readAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
