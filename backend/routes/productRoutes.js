const express = require('express');
const router = express.Router();
const { getProducts, getFeaturedProducts, getProductById, getRelatedProducts, getBestSellers, getSearchSuggestions } = require('../controllers/productController');

router.get('/featured', getFeaturedProducts);
router.get('/best-sellers', getBestSellers);
router.get('/search-suggestions', getSearchSuggestions);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:id/related', getRelatedProducts);

module.exports = router;
