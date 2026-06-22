const Coupon = require('../models/Coupon');

// @desc    Validate a coupon code
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    
    if (!coupon) {
      return res.status(404).json({ success: false, error: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' });
    }
    
    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({ success: false, error: `Đơn hàng tối thiểu để áp dụng mã là ${coupon.minOrderAmount}đ` });
    }
    
    let discountAmount = 0;
    if (coupon.type === 'fixed') {
      discountAmount = coupon.value;
    } else if (coupon.type === 'percent') {
      discountAmount = (orderAmount * coupon.value) / 100;
    } else if (coupon.type === 'freeship') {
      discountAmount = 0; // Value logic handled by frontend
    }
    
    res.json({ 
      success: true, 
      data: {
        code: coupon.code,
        discountAmount,
        type: coupon.type,
        value: coupon.value
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  validateCoupon
};
