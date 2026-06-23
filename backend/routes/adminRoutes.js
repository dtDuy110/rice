const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getOrders,
  updateOrderStatus,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/adminController');
const { getAdminNotifications, markAsRead, markAllAsRead } = require('../controllers/notificationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin);

router.get('/dashboard', getDashboardStats);

router.route('/orders')
  .get(getOrders);

router.route('/orders/:id/status')
  .put(updateOrderStatus);

router.route('/products')
  .get(getAdminProducts)
  .post(createProduct);

router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

// Notification routes
router.get('/notifications', getAdminNotifications);
router.put('/notifications/:id/read', markAsRead);
router.put('/notifications/read-all', markAllAsRead);

module.exports = router;
