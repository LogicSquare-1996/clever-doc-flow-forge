
const express = require('express');
const User = require('../models/User');
const Document = require('../models/Document');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, userType } = req.query;
    
    const query = userType ? { userType } : {};
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all documents (admin only)
router.get('/documents', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const documents = await Document.find()
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Document.countDocuments();

    res.json({
      documents,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics (admin only)
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDocuments = await Document.countDocuments();
    const activeSubscriptions = await User.countDocuments({
      'clientData.subscriptionStatus': 'active'
    });

    const recentUsers = await User.find()
      .select('firstName lastName email createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalDocuments,
      activeSubscriptions,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
