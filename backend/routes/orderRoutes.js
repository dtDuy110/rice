const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders, cancelOrder, trackOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, addOrderItems);

router.route('/my')
  .get(protect, getMyOrders);

router.get('/track/:id', trackOrder);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
