
const mongoose = require('mongoose');

const documentPurchaseSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  guestEmail: String, // For guest purchases
  stripePaymentIntentId: {
    type: String,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'usd'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: Date // Optional expiry for document access
}, {
  timestamps: true
});

module.exports = mongoose.model('DocumentPurchase', documentPurchaseSchema);
