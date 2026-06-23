const Notification = require('../models/Notification');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      user: req.user._id,
      recipient: 'user' 
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get admin notifications
// @route   GET /api/admin/notifications
// @access  Private/Admin
const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      user: req.user._id, 
      recipient: 'admin' 
    })
      .sort({ createdAt: -1 })
      .limit(30);
    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification && notification.user.toString() === req.user._id.toString()) {
      notification.isRead = true;
      await notification.save();
      res.json({ success: true, data: notification });
    } else {
      res.status(404).json({ success: false, error: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Mark all as read
// @route   PUT /api/notifications/read-all
// @access  Private
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getNotifications,
  getAdminNotifications,
  markAsRead,
  markAllAsRead
};
