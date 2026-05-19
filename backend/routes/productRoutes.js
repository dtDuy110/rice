const express = require('express');
const router = express.Router();
const { getProducts, getFeaturedProducts, getProductById, getRelatedProducts } = require('../controllers/productController');

router.get('/featured', getFeaturedProducts);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:id/related', getRelatedProducts);

module.exports = router;
