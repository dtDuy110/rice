import { useState } from 'react'
import { Trash2, Lock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import QuantitySelector from '../components/ui/QuantitySelector'
import Button from '../components/ui/Button'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [checkingOut, setCheckingOut] = useState(false)

  const items = cart?.items || []

  const subtotal = items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0)
  const shipping = items.length > 0 ? 8.0 : 0
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thanh toán')
      navigate('/dang-nhap')
      return
    }
    
    if (items.length === 0) return

    setCheckingOut(true)
    try {
      const res = await api.post('/orders', {
        shippingAddress: {
          address: '123 Đường Tạm',
          city: 'Hồ Chí Minh',
          postalCode: '700000',
          country: 'Vietnam'
        },
        paymentMethod: 'COD'
      })
      if (res.data.success) {
        alert('Đặt hàng thành công!')
        navigate('/')
        window.location.reload() // reload to clear state and show success
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Có lỗi xảy ra khi thanh toán')
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div className="py-8 md:py-12 px-4 md:px-12 max-w-[1280px] mx-auto animate-fade-in">
      <h1 className="text-on-surface mb-8" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '36px', fontWeight: 700 }}>
        Giỏ hàng
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => {
            const product = item.product || {}
            return (
              <div key={product._id} className="bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)] flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <img src={product.images?.[0] || product.image} alt={product.name} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-on-surface font-semibold text-lg mb-1" style={{ fontFamily: 'var(--font-family-heading)' }}>{product.name}</h3>
                  <p className="text-label-sm text-on-surface-variant mb-3">{product.category}</p>
                  <div className="flex items-center gap-4">
                    <QuantitySelector value={item.quantity} onChange={q => updateQuantity(product._id, q)} />
                    <button onClick={() => removeFromCart(product._id)} className="flex items-center gap-1 text-error text-label-sm hover:underline"><Trash2 size={14} />Xóa</button>
                  </div>
                </div>
                <span className="text-primary font-bold text-xl shrink-0" style={{ fontFamily: 'var(--font-family-heading)' }}>${((product.price || 0) * item.quantity).toFixed(2)}</span>
              </div>
            )
          })}
          {items.length === 0 && <div className="text-center py-20"><p className="text-body-lg text-on-surface-variant">Giỏ hàng trống.</p></div>}
        </div>

        <div className="bg-surface rounded-2xl p-8 border border-surface-variant shadow-[var(--shadow-card)] h-fit sticky top-24">
          <h2 className="text-on-surface mb-6" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '24px', fontWeight: 700 }}>Tóm tắt đơn hàng</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-body-md"><span className="text-on-surface-variant">Tạm tính</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-body-md"><span className="text-on-surface-variant">Vận chuyển</span><span>${shipping.toFixed(2)}</span></div>
            <div className="flex justify-between text-body-md"><span className="text-on-surface-variant">Thuế</span><span>${tax.toFixed(2)}</span></div>
            <div className="border-t border-outline-variant/30 pt-4 flex justify-between">
              <span className="text-on-surface font-bold text-lg" style={{ fontFamily: 'var(--font-family-heading)' }}>Tổng cộng</span>
              <span className="text-primary font-bold text-xl" style={{ fontFamily: 'var(--font-family-heading)' }}>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mb-6">
            <label className="text-label-sm text-on-surface font-medium mb-2 block">Mã giảm giá</label>
            <div className="flex gap-2">
              <input placeholder="Nhập mã" className="flex-1 bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-body-md placeholder:text-outline focus:outline-none focus:border-primary" />
              <button className="px-4 py-2.5 border border-outline-variant rounded-xl text-label-md hover:bg-surface-container-high font-medium">Áp dụng</button>
            </div>
          </div>
          <Button variant="primary" size="lg" className="w-full" icon={ArrowRight} iconPosition="right" onClick={handleCheckout} disabled={items.length === 0 || checkingOut}>
            {checkingOut ? 'Đang xử lý...' : 'Thanh toán'}
          </Button>
          <p className="text-center text-label-sm text-outline mt-4 flex items-center justify-center gap-1"><Lock size={12} />Thanh toán bảo mật</p>
        </div>
      </div>
    </div>
  )
}
