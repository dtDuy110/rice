const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, couponCode } = req.body;

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
    let shippingPrice = 30000; // 30,000 VNĐ
    let discountAmount = 0;
    
    if (couponCode) {
      const Coupon = require('../models/Coupon');
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon && itemsPrice >= coupon.minOrderAmount) {
        if (coupon.type === 'freeship') {
          shippingPrice = 0;
        } else if (coupon.type === 'fixed') {
          discountAmount = coupon.value;
        } else if (coupon.type === 'percent') {
          discountAmount = (itemsPrice * coupon.value) / 100;
        }
      }
    }
    
    // Thuế = 8% của (Giá trị hàng - Khuyến mãi cố định/phần trăm). Nếu Freeship, thuế = 8% giá trị hàng.
    let taxPrice = (itemsPrice - discountAmount) * 0.08;
    if (couponCode) {
      const Coupon = require('../models/Coupon');
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon && coupon.type === 'freeship') {
         taxPrice = 0; // Miễn phí ship & thuế
      }
    }

    const totalAmount = itemsPrice - discountAmount + shippingPrice + taxPrice;

    // Create order items from cart items and check stock
    const items = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ success: false, error: `Sản phẩm ${item.product.name} không đủ số lượng` });
      }
      
      product.stock -= item.quantity;
      await product.save();

      items.push({
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.images?.[0] || '',
        price: item.product.price,
        product: item.product._id,
      });
    }

    const orderNumber = 'ORD-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

    const order = new Order({
      user: req.user._id,
      orderNumber,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod: paymentMethod || 'COD',
      status: 'pending'
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

// @desc    Get logged-in user orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Cancel order (user)
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Check if the order belongs to the user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: 'Not authorized to cancel this order' });
    }

    // Check if order is still pending
    if (order.status !== 'pending') {
      return res.status(400).json({ success: false, error: `Cannot cancel order in ${order.status} status` });
    }

    order.status = 'cancelled';
    await order.save();

    // Revert stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Track order by ID (Public)
// @route   GET /api/orders/track/:id
// @access  Public
const trackOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy đơn hàng' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, error: 'Mã đơn hàng không hợp lệ' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  cancelOrder,
  trackOrder
};
