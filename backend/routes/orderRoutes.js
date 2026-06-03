const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, addOrderItems);

router.route('/my')
  .get(protect, getMyOrders);

router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
