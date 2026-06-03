const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access productId from parent router
const { createReview, getProductReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createReview)
  .get(getProductReviews);

module.exports = router;
