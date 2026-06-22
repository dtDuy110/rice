import { useState } from 'react'
import { Search, MapPin, Truck, CheckCircle2, PackageSearch } from 'lucide-react'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Button from '../components/ui/Button'
import api from '../services/api'

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!orderId.trim()) return
    
    setLoading(true)
    setError('')
    setOrder(null)

    try {
      const { data } = await api.get(`/orders/track/${orderId.trim()}`)
      if (data.success) {
        setOrder(data.data)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã.')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { id: 'pending', label: 'Chờ xác nhận', icon: PackageSearch },
    { id: 'processing', label: 'Đang xử lý', icon: CheckCircle2 },
    { id: 'shipped', label: 'Đang giao', icon: Truck },
    { id: 'delivered', label: 'Đã giao', icon: MapPin },
  ]

  const getStepIndex = (status) => {
    return steps.findIndex(s => s.id === status)
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-12 max-w-[800px] mx-auto animate-fade-in min-h-[70vh]">
      <Breadcrumbs />
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
          Theo Dõi Đơn Hàng
        </h1>
        <p className="text-on-surface-variant">
          Nhập mã đơn hàng của bạn để kiểm tra tình trạng vận chuyển.
        </p>
      </div>

      <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-[var(--shadow-card)] border border-surface-variant mb-8">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Ví dụ: 64b8a9..."
              className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl pl-12 pr-4 py-3 text-body-md focus:outline-none focus:border-primary"
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading || !orderId.trim()} className="shrink-0 px-8">
            {loading ? 'Đang tra cứu...' : 'Tra cứu ngay'}
          </Button>
        </form>
        {error && <p className="text-error mt-4 text-sm font-medium text-center">{error}</p>}
      </div>

      {order && (
        <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-[var(--shadow-card)] border border-surface-variant animate-fade-in">
          <div className="flex flex-wrap justify-between items-center mb-8 border-b border-outline-variant/30 pb-6 gap-4">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Mã đơn hàng</p>
              <p className="text-on-surface font-bold font-mono">{order._id}</p>
            </div>
            <div className="text-right">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Ngày đặt</p>
              <p className="text-on-surface font-semibold">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-container-high -translate-y-1/2 rounded-full z-0 hidden sm:block"></div>
            
            {/* Progress Bar */}
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full z-0 hidden sm:block transition-all duration-700 ease-out"
              style={{ width: `${(getStepIndex(order.status) / (steps.length - 1)) * 100}%` }}
            ></div>

            <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-8 sm:gap-0">
              {steps.map((step, index) => {
                const isCompleted = getStepIndex(order.status) >= index
                const isCurrent = getStepIndex(order.status) === index
                const Icon = step.icon
                
                return (
                  <div key={step.id} className="flex sm:flex-col items-center gap-4 sm:gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm
                      ${isCompleted ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-outline'}
                      ${isCurrent ? 'ring-4 ring-primary/20' : ''}
                    `}>
                      <Icon size={24} />
                    </div>
                    <div className="sm:text-center">
                      <p className={`font-semibold ${isCompleted ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                        {step.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-6">
            <h3 className="font-bold text-on-surface mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>Sản phẩm</h3>
            <div className="space-y-4">
              {order.orderItems.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <img src={item.product?.images?.[0]} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-on-surface text-sm line-clamp-1">{item.name}</p>
                    <p className="text-on-surface-variant text-sm">SL: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
