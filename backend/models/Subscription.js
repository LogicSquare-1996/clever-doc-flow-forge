
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stripeSubscriptionId: {
    type: String,
    unique: true
  },
  stripePriceId: String,
  status: {
    type: String,
    enum: ['active', 'cancelled', 'past_due', 'unpaid']
  },
  currentPeriodStart: Date,
  currentPeriodEnd: Date,
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false
  },
  planName: String,
  amount: Number,
  currency: {
    type: String,
    default: 'usd'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
