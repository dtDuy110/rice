const express = require('express');
const router = express.Router();
const { getTopReviews } = require('../controllers/reviewController');

router.get('/top', getTopReviews);

module.exports = router;
