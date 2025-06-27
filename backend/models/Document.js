
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'completed', 'signed', 'cancelled'],
    default: 'completed'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  guestEmail: String, // For guest purchases
  formData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  signatures: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  templateId: String,
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);
