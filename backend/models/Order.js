const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
      name: { type: String, required: true },
      variant: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0.0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'delivery', 'delivered', 'cancelled', 'success'],
    default: 'pending'
  },
  shippingAddress: {
    address: { type: String, required: false },
    city: { type: String, required: false },
    postalCode: { type: String, required: false },
    country: { type: String, required: false }
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
