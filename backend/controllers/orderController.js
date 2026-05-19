const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ success: false, error: 'Please provide shipping address' });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, error: 'No order items' });
    }

    // Calculate prices
    const itemsPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shippingPrice = 8.0; // Fixed shipping for now
    const taxPrice = itemsPrice * 0.07; // 7% tax
    const totalAmount = itemsPrice + shippingPrice + taxPrice;

    // Create order items from cart items
    const orderItems = cart.items.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      image: item.product.images?.[0] || '',
      price: item.product.price,
      product: item.product._id,
    }));

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalAmount,
      status: 'processing'
    });

    const createdOrder = await order.save();

    // Clear user cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ success: true, data: createdOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addOrderItems
};
