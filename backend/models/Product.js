const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  origin: { type: String },
  weight: { type: String },
  sku: { type: String, required: true, unique: true },
  unit: { type: String, default: 'kg' },
  stock: { type: Number, default: 0 },
  maxStock: { type: Number },
  status: { type: String, enum: ['active', 'draft'], default: 'active' },
  badge: { type: String },
  badgeType: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  organic: { type: Boolean, default: false },
  features: [{ type: String }],
  farmDetails: {
    origin: { type: String },
    harvest: { type: String },
    processing: { type: String }
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
