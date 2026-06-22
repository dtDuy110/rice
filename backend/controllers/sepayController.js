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

    // Look for ORD-xxxxxx in the content
    // content format example: "NGUYEN VAN A chuyen tien don hang ORD-123456"
    if (!content) {
      return res.status(200).json({ success: true, message: 'No content in transaction' });
    }

    const orderCodeMatch = content.match(/ORD-\d+/i);
    if (!orderCodeMatch) {
      return res.status(200).json({ success: true, message: 'No valid order code found in content' });
    }

    const orderNumber = orderCodeMatch[0].toUpperCase();

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
