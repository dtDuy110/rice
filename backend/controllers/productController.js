const Product = require('../models/Product');

// @desc    Fetch all products with filtering, sorting, pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, origin, search, sort, page = 1, limit = 8, minPrice, maxPrice, weight } = req.query;

    let query = {};

    // Filtering
    if (category) query.category = category;
    if (origin) {
      query.origin = { $in: origin.split(',') };
    }
    if (weight && weight !== 'Tất cả') {
      query.weight = weight;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    query.status = 'active'; // Only show active products to public

    // Sorting
    let sortObj = {};
    if (sort === 'Mới nhất') sortObj.createdAt = -1;
    else if (sort === 'Giá tăng') sortObj.price = 1;
    else if (sort === 'Giá giảm') sortObj.price = -1;
    else if (sort === 'Đánh giá cao') sortObj.rating = -1;
    else sortObj.createdAt = -1; // default

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortObj)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(count / Number(limit)),
        totalItems: count,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Fetch featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ badgeType: 'bestseller', status: 'active' }).limit(3);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Fetch related products
// @route   GET /api/products/:id/related
// @access  Public
const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    // Simple related logic: same category, different ID
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      status: 'active'
    }).limit(4);
    
    res.json({ success: true, data: related });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductById,
  getRelatedProducts
};
