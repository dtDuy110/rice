const express = require('express');
const router = express.Router();
const { trackActivity, getAnalyticsSummary } = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to track activity (called by frontend tracker)
router.post('/track', trackActivity);

// Protected admin route to fetch analytics summary
router.get('/summary', protect, admin, getAnalyticsSummary);

module.exports = router;
