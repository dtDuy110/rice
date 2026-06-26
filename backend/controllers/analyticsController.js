const UserActivity = require('../models/UserActivity');
const User = require('../models/User');

// @desc    Track user activity (e.g. page views)
// @route   POST /api/analytics/track
// @access  Public
const trackActivity = async (req, res) => {
  try {
    const { action, details, userId } = req.body;

    // Determine IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    // Determine Device Info
    const deviceInfo = req.headers['user-agent'] || 'Unknown';

    const activityData = {
      ipAddress,
      action: action || 'PAGE_VIEW',
      details: details || {},
      deviceInfo
    };

    if (userId && userId.match(/^[0-9a-fA-F]{24}$/)) {
      activityData.user = userId;
    }

    await UserActivity.create(activityData);
    res.status(201).json({ success: true });
  } catch (error) {
    // Non-blocking error for analytics tracking
    console.error('Analytics tracking error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get analytics summary for admin dashboard
// @route   GET /api/analytics/summary
// @access  Private/Admin
const getAnalyticsSummary = async (req, res) => {
  try {
    // 1. Total page views
    const totalViews = await UserActivity.countDocuments({ action: 'PAGE_VIEW' });

    // 2. Distinct active IPs/Users
    const distinctIPs = await UserActivity.distinct('ipAddress');
    const activeUsers = distinctIPs.length;

    // 3. Total registered users & recent registrations
    const totalUsers = await User.countDocuments({ role: 'user' });
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsers = await User.countDocuments({ role: 'user', createdAt: { $gte: thirtyDaysAgo } });

    // 4. Top visited pages (aggregation)
    const topPages = await UserActivity.aggregate([
      { $match: { action: 'PAGE_VIEW' } },
      { $group: { _id: '$details.path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // 5. Recent activities
    const recentActivities = await UserActivity.find()
      .sort({ timestamp: -1 })
      .limit(30)
      .populate('user', 'name email');

    // 6. Page views over time (Last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const viewsOverTimeRaw = await UserActivity.aggregate([
      { $match: { action: 'PAGE_VIEW', timestamp: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        metrics: {
          totalViews,
          activeUsers,
          totalUsers,
          newUsers
        },
        topPages: topPages.map(p => ({ path: p._id || '/', count: p.count })),
        recentActivities,
        viewsOverTime: viewsOverTimeRaw.map(v => ({ date: v._id, count: v.count }))
      }
    });
  } catch (error) {
    console.error('Get analytics summary error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  trackActivity,
  getAnalyticsSummary
};
