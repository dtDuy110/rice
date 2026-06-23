const Order = require('../models/Order');

// @desc    Handle SEpay Webhook
// @route   POST /api/sepay/webhook
// @access  Public
const handleWebhook = async (req, res) => {
  try {
    // Xác thực API Token (Bảo mật Webhook)
    const expectedToken = process.env.SEPAY_WEBHOOK_TOKEN;
    if (expectedToken) {
      const authHeader = req.headers.authorization || '';
      if (!authHeader.includes(expectedToken)) {
        console.warn('Cảnh báo: Webhook từ SEpay gửi đến không đúng API Token!');
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid API Token' });
      }
    }

    const { transferType, transferAmount, content, amountIn } = req.body;

    // We only care about incoming transfers
    if (transferType !== 'in' && !amountIn) {
      return res.status(200).json({ success: true, message: 'Ignored non-incoming transaction' });
    }

    const amount = transferAmount || amountIn;

    // Look for ORD-xxxxxx or ORDxxxxxx in the content
    if (!content) {
      return res.status(200).json({ success: true, message: 'No content in transaction' });
    }

    const orderCodeMatch = content.match(/ORD-?\d+/i);
    if (!orderCodeMatch) {
      return res.status(200).json({ success: true, message: 'No valid order code found in content' });
    }

    let orderNumber = orderCodeMatch[0].toUpperCase();
    // Normalize: nếu khách nhập thiếu dấu gạch ngang (VD: ORD123), ta tự thêm vào để tra DB
    if (!orderNumber.includes('-')) {
      orderNumber = orderNumber.replace('ORD', 'ORD-');
    }

    // Find the order
    const order = await Order.findOne({ orderNumber });

    if (!order) {
      return res.status(200).json({ success: true, message: 'Order not found' });
    }

    if (order.isPaid) {
      return res.status(200).json({ success: true, message: 'Order is already paid' });
    }

    // Cập nhật trạng thái thanh toán
    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = 'processing';
    await order.save();

    // Bắn sự kiện qua Socket.IO để frontend cập nhật UI ngay lập tức
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${order.user.toString()}`).emit('payment_success', {
        orderId: order._id.toString(),
        orderNumber: order.orderNumber,
        amount: amount
      });
    }

    // --- Gửi thông báo cho admin ---
    const User = require('../models/User');
    const Notification = require('../models/Notification');
    const admins = await User.find({ role: 'admin' });

    for (const admin of admins) {
      const notification = await Notification.create({
        user: admin._id,
        recipient: 'admin',
        title: 'Thanh toán thành công',
        message: `Đơn hàng #${order.orderNumber} vừa được thanh toán ${Number(amount).toLocaleString('vi-VN')}₫ qua SEPay`,
        type: 'payment_success',
        link: '/admin/don-hang'
      });

      if (io) {
        io.to('admin_room').emit('new_admin_notification', notification);
      }
    }

    return res.status(200).json({ success: true, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('SEpay Webhook Error:', error);
    // SEpay yêu cầu trả về 200 để xác nhận đã nhận webhook, nếu lỗi 500 họ sẽ gửi lại.
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = {
  handleWebhook
};
