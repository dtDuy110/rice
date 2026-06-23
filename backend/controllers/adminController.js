const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const orders = await Order.find();
    const usersCount = await User.countDocuments({ role: 'user' });
    const products = await Product.find();
    
    const revenue = orders.reduce((acc, item) => acc + item.totalAmount, 0);
    const lowStockItems = products.filter(p => p.stock <= 20).map(p => ({
      name: p.name,
      sku: p.sku,
      units: p.stock,
      icon: '⚠️'
    }));

    res.json({
      success: true,
      data: {
        stats: [
          { label: 'DOANH THU', value: `${revenue.toLocaleString('vi-VN')} ₫`, change: '+0%', icon: 'wallet' },
          { label: 'ĐƠN HÀNG', value: orders.length.toString(), change: '+0%', icon: 'package' },
          { label: 'KHÁCH HÀNG', value: usersCount.toString(), change: '+0%', icon: 'users' },
        ],
        recentOrders: orders.slice(-5).reverse(),
        lowStockItems: lowStockItems.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'id name email');
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (order) {
      order.status = status;
      const updatedOrder = await order.save();

      // --- Send notification to user ---
      const Notification = require('../models/Notification');
      const io = req.app.get('io');
      
      const statusMap = {
        pending: 'Chờ xác nhận',
        processing: 'Đang xử lý',
        delivery: 'Đang giao',
        delivered: 'Đã giao',
        cancelled: 'Đã hủy'
      };

      const notification = await Notification.create({
        user: order.user,
        recipient: 'user',
        title: 'Cập nhật trạng thái đơn hàng',
        message: `Đơn hàng #${order.orderNumber} của bạn đã được cập nhật sang trạng thái: ${statusMap[status] || status}`,
        type: 'order',
        link: '/tai-khoan' 
      });

      if (io) {
        io.to(`user_${order.user}`).emit('new_notification', notification);
      }

      res.json({ success: true, data: updatedOrder });
    } else {
      res.status(404).json({ success: false, error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get all products for admin
// @route   GET /api/admin/products
// @access  Private/Admin
const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (product) {
      res.json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ success: true, message: 'Product removed' });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getOrders,
  updateOrderStatus,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
