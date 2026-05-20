import { useState, useEffect } from 'react'
import { User, Mail, Package, Clock, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Badge from '../components/ui/Badge'
import api from '../services/api'

const statusMap = { pending: 'Chờ xác nhận', processing: 'Đang xử lý', delivery: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy' }

export default function ProfilePage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/my')
        if (res.data.success) setOrders(res.data.data)
      } catch (err) {
        console.error('Error fetching orders:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className="py-8 md:py-12 px-4 md:px-12 max-w-[1280px] mx-auto animate-fade-in">
      <h1 className="text-on-surface mb-8" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '36px', fontWeight: 700 }}>
        Tài khoản của tôi
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-surface rounded-2xl p-8 border border-surface-variant shadow-[var(--shadow-card)] h-fit">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <User size={36} />
            </div>
            <h2 className="text-on-surface font-bold text-xl" style={{ fontFamily: 'var(--font-family-heading)' }}>{user?.name}</h2>
            <p className="text-on-surface-variant text-body-md flex items-center gap-1 mt-1"><Mail size={14} /> {user?.email}</p>
          </div>
          <div className="space-y-3 border-t border-outline-variant/30 pt-6">
            <div className="flex justify-between text-body-md">
              <span className="text-on-surface-variant">Vai trò</span>
              <span className="text-on-surface font-medium capitalize">{user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</span>
            </div>
            <div className="flex justify-between text-body-md">
              <span className="text-on-surface-variant">Tổng đơn hàng</span>
              <span className="text-on-surface font-medium">{orders.length}</span>
            </div>
            <div className="flex justify-between text-body-md">
              <span className="text-on-surface-variant">Tổng chi tiêu</span>
              <span className="text-primary font-bold">${orders.reduce((s, o) => s + o.totalAmount, 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="lg:col-span-2">
          <h2 className="text-on-surface mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '24px', fontWeight: 700 }}>
            <Package size={24} className="text-primary" /> Lịch sử đơn hàng
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-surface rounded-2xl p-12 border border-surface-variant shadow-[var(--shadow-card)] text-center">
              <Package size={48} className="text-outline mx-auto mb-4" />
              <p className="text-body-lg text-on-surface-variant mb-4">Bạn chưa có đơn hàng nào.</p>
              <Link to="/san-pham" className="text-primary font-semibold hover:underline">Khám phá sản phẩm →</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                    <div>
                      <p className="text-on-surface font-bold text-lg" style={{ fontFamily: 'var(--font-family-heading)' }}>
                        Đơn #{order.orderNumber || order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-on-surface-variant text-label-sm flex items-center gap-1 mt-1">
                        <Clock size={12} /> {new Date(order.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <Badge type={order.status}>{statusMap[order.status] || order.status}</Badge>
                  </div>

                  {/* Items */}
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-body-md text-on-surface truncate">{item.name}</p>
                          <p className="text-label-sm text-on-surface-variant">x{item.quantity}</p>
                        </div>
                        <span className="text-body-md text-on-surface font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-outline-variant/30 pt-3 flex justify-between items-center">
                    <span className="text-on-surface-variant text-body-md">Tổng cộng</span>
                    <span className="text-primary font-bold text-lg" style={{ fontFamily: 'var(--font-family-heading)' }}>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
