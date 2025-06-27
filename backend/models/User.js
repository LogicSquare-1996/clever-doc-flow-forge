
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      return this.userType !== 'guest';
    }
  },
  userType: {
    type: String,
    enum: ['admin', 'client', 'guest'],
    default: 'client'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: String,
  location: String,
  avatarUrl: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  // Admin specific fields
  adminData: {
    permissions: [String],
    lastLoginAt: Date,
    adminLevel: {
      type: String,
      enum: ['super_admin', 'admin', 'moderator'],
      default: 'admin'
    }
  },
  // Client specific fields
  clientData: {
    planType: {
      type: String,
      enum: ['free', 'basic', 'pro', 'enterprise'],
      default: 'free'
    },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'trial'],
      default: 'inactive'
    },
    stripeCustomerId: String,
    companyName: String,
    industry: String,
    joinDate: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
