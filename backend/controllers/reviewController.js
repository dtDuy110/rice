const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Create new review
// @route   POST /api/products/:productId/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      product: productId
    });

    if (alreadyReviewed) {
      return res.status(400).json({ success: false, error: 'Bạn đã đánh giá sản phẩm này rồi' });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating: Number(rating),
      comment
    });

    // Update product rating and reviews count
    const reviews = await Review.find({ product: productId });
    product.reviews = reviews.length;
    product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await product.save();

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'Bạn đã đánh giá sản phẩm này rồi' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get product reviews
// @route   GET /api/products/:productId/reviews
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createReview,
  getProductReviews
};
