import { useState } from 'react'
import { MapPin, Phone, User, ArrowLeft, ShieldCheck, Lock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import Button from '../components/ui/Button'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import api from '../services/api'
import { formatVND } from '../utils/formatCurrency'

export default function CheckoutPage() {
  const { cart, fetchCart } = useCart()
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: 'Hồ Chí Minh',
    note: ''
  })
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)

  const items = cart?.items || []
  const subtotal = items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0)
  const shipping = items.length > 0 ? 30000 : 0

  // Calculate discount
  let discountAmount = 0
  if (appliedCoupon) {
    if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.value
    } else if (appliedCoupon.type === 'percent') {
      discountAmount = (subtotal * appliedCoupon.value) / 100
    }
  }

  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + shipping + tax

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const applyCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponLoading(true)
    setCouponError('')
    try {
      const { data } = await api.post('/coupons/validate', {
        code: couponCode,
        orderAmount: subtotal
      })
      if (data.success) {
        setAppliedCoupon(data.data)
        showToast('Áp dụng mã giảm giá thành công!', 'success')
      }
    } catch (err) {
      setCouponError(err.response?.data?.error || 'Mã giảm giá không hợp lệ')
      setAppliedCoupon(null)
    } finally {
      setCouponLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) return
    setLoading(true)
    try {
      const res = await api.post('/orders', {
        shippingAddress: {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          postalCode: '700000',
          country: 'Vietnam'
        },
        paymentMethod: 'COD',
        totalPrice: total,
      })
      if (res.data.success) {
        await fetchCart()
        showToast('Đặt hàng thành công! Đang chuyển đến trang đơn hàng...', 'success')
        setTimeout(() => navigate('/tai-khoan'), 1500)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      showToast('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-8 md:py-12 px-4 md:px-12 max-w-[1280px] mx-auto animate-fade-in">
        <Breadcrumbs />
        <h1 className="text-headline-lg text-on-surface mb-8" style={{ fontFamily: 'var(--font-family-heading)' }}>Giỏ hàng trống</h1>
        <p className="text-on-surface-variant mb-6">Hãy thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
        <Link to="/san-pham" className="text-primary font-semibold hover:underline">← Quay lại cửa hàng</Link>
      </div>
    )
  }

  return (
    <div className="py-8 md:py-12 px-4 md:px-12 max-w-[1280px] mx-auto animate-fade-in">
      <Link to="/gio-hang" className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-label-md mb-6">
        <ArrowLeft size={16} /> Quay lại giỏ hàng
      </Link>

      <h1 className="text-on-surface mb-8" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '36px', fontWeight: 700 }}>
        Thanh toán
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Shipping Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface rounded-2xl p-8 border border-surface-variant shadow-[var(--shadow-card)]">
              <h2 className="text-on-surface mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '22px', fontWeight: 700 }}>
                <MapPin size={20} className="text-primary" /> Thông tin giao hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-label-md text-on-surface font-semibold mb-2 block">Họ và tên</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                    <input required name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nguyễn Văn A" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl pl-10 pr-4 py-3 text-body-md focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-label-md text-on-surface font-semibold mb-2 block">Số điện thoại</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                    <input required name="phone" value={form.phone} onChange={handleChange} placeholder="0901 234 567" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl pl-10 pr-4 py-3 text-body-md focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="text-label-md text-on-surface font-semibold mb-2 block">Địa chỉ chi tiết</label>
                <input required name="address" value={form.address} onChange={handleChange} placeholder="Số nhà, tên đường, phường/xã" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary" />
              </div>

              <div className="mt-5">
                <label className="text-label-md text-on-surface font-semibold mb-2 block">Thành phố</label>
                <select name="city" value={form.city} onChange={handleChange} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary">
                  <option>Hồ Chí Minh</option>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                  <option>Cần Thơ</option>
                  <option>Hải Phòng</option>
                  <option>Khác</option>
                </select>
              </div>

              <div className="mt-5">
                <label className="text-label-md text-on-surface font-semibold mb-2 block">Ghi chú (tùy chọn)</label>
                <textarea name="note" value={form.note} onChange={handleChange} rows="3" placeholder="Ghi chú cho đơn hàng..." className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary"></textarea>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-surface rounded-2xl p-8 border border-surface-variant shadow-[var(--shadow-card)]">
              <h2 className="text-on-surface mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '22px', fontWeight: 700 }}>
                <ShieldCheck size={20} className="text-primary" /> Phương thức thanh toán
              </h2>
              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer">
                <input type="radio" checked readOnly className="accent-primary w-4 h-4" />
                <div>
                  <p className="text-on-surface font-semibold">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-on-surface-variant text-label-sm">Thanh toán bằng tiền mặt khi nhận được hàng</p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 bg-surface rounded-2xl p-6 md:p-8 border border-surface-variant shadow-[var(--shadow-card)] h-fit sticky top-24">
            <h2 className="text-on-surface mb-6" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '22px', fontWeight: 700 }}>Đơn hàng của bạn</h2>

            <div className="space-y-3 mb-6">
              {items.map(item => {
                const p = item.product || {}
                return (
                  <div key={p._id} className="flex items-center gap-3">
                    <img src={p.images?.[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-body-md text-on-surface truncate">{p.name}</p>
                      <p className="text-label-sm text-on-surface-variant">x{item.quantity}</p>
                    </div>
                    <span className="text-body-md font-medium">${((p.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                )
              })}
            </div>

            {/* Coupon Code */}
            <div className="mb-6 border-t border-outline-variant/30 pt-6">
              <label className="text-label-sm font-semibold mb-2 block">Mã giảm giá</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Nhập mã giảm giá..."
                  className="flex-1 bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2 text-body-md focus:outline-none focus:border-primary uppercase"
                  disabled={appliedCoupon}
                />
                {!appliedCoupon ? (
                  <Button type="button" variant="secondary" onClick={applyCoupon} disabled={couponLoading || !couponCode.trim()}>
                    {couponLoading ? 'Đang kiểm tra...' : 'Áp dụng'}
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => { setAppliedCoupon(null); setCouponCode(''); }}>
                    Hủy
                  </Button>
                )}
              </div>
              {couponError && <p className="text-error text-xs mt-2">{couponError}</p>}
              {appliedCoupon && (
                <p className="text-primary text-xs mt-2 font-medium">
                  Đã áp dụng mã {appliedCoupon.code} (giảm {appliedCoupon.type === 'percent' ? `${appliedCoupon.value}%` : formatVND(appliedCoupon.value)})
                </p>
              )}
            </div>

            <div className="space-y-3 border-t border-outline-variant/30 pt-4 mb-6">
              <div className="flex justify-between text-body-md"><span className="text-on-surface-variant">Tạm tính</span><span>{formatVND(subtotal)}</span></div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-body-md text-error">
                  <span>Giảm giá</span><span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-body-md"><span className="text-on-surface-variant">Vận chuyển</span><span>{formatVND(shipping)}</span></div>
              <div className="flex justify-between text-body-md"><span className="text-on-surface-variant">Thuế (8%)</span><span>{formatVND(tax)}</span></div>
              <div className="border-t border-outline-variant/30 pt-3 flex justify-between">
                <span className="text-on-surface font-bold text-lg" style={{ fontFamily: 'var(--font-family-heading)' }}>Tổng cộng</span>
                <span className="text-primary font-bold text-xl" style={{ fontFamily: 'var(--font-family-heading)' }}>{formatVND(total)}</span>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đặt hàng'}
            </Button>
            <p className="text-center text-label-sm text-outline mt-4 flex items-center justify-center gap-1"><Lock size={12} />Thanh toán bảo mật</p>
          </div>
        </div>
      </form>
    </div>
  )
}
