import { useState, useEffect } from 'react'
import { User, Mail, Package, Clock, Settings, Lock, Edit3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import api from '../services/api'
import { formatVND } from '../utils/formatCurrency'

const statusMap = { pending: 'Chờ xác nhận', processing: 'Đang xử lý', delivery: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy' }

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { showToast } = useToast()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [activeTab, setActiveTab] = useState('orders') // 'orders', 'profile', 'password'

  // Profile form
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', email: user?.email || '' })
  const [updatingProfile, setUpdatingProfile] = useState(false)

  // Password form
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [updatingPassword, setUpdatingPassword] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/my')
        if (res.data.success) setOrders(res.data.data)
      } catch (err) {
        console.error('Error fetching orders:', err)
      } finally {
        setLoadingOrders(false)
      }
    }
    fetchOrders()
  }, [])

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setUpdatingProfile(true)
    try {
      const res = await api.put('/auth/profile', profileForm)
      if (res.data.success) {
        updateUser(res.data.data)
        showToast('Cập nhật hồ sơ thành công', 'success')
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Có lỗi xảy ra', 'error')
    } finally {
      setUpdatingProfile(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return showToast('Mật khẩu xác nhận không khớp', 'error')
    }
    setUpdatingPassword(true)
    try {
      const res = await api.put('/auth/password', {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      })
      if (res.data.success) {
        showToast('Cập nhật mật khẩu thành công', 'success')
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Có lỗi xảy ra', 'error')
    } finally {
      setUpdatingPassword(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return
    
    try {
      const res = await api.put(`/orders/${orderId}/cancel`)
      if (res.data.success) {
        showToast('Hủy đơn hàng thành công', 'success')
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: 'cancelled' } : o))
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Không thể hủy đơn hàng', 'error')
    }
  }

  return (
    <div className="py-8 md:py-12 px-4 md:px-12 max-w-[1280px] mx-auto animate-fade-in">
      <h1 className="text-on-surface mb-8" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '36px', fontWeight: 700 }}>
        Tài khoản của tôi
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)]">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <User size={36} />
              </div>
              <h2 className="text-on-surface font-bold text-xl" style={{ fontFamily: 'var(--font-family-heading)' }}>{user?.name}</h2>
              <p className="text-on-surface-variant text-body-md flex items-center gap-1 mt-1"><Mail size={14} /> {user?.email}</p>
            </div>
            
            <nav className="space-y-2 border-t border-outline-variant/30 pt-4">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-primary text-on-primary font-medium' : 'text-on-surface hover:bg-surface-container'}`}
              >
                <Package size={20} /> Đơn hàng
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-primary text-on-primary font-medium' : 'text-on-surface hover:bg-surface-container'}`}
              >
                <Edit3 size={20} /> Chỉnh sửa hồ sơ
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'password' ? 'bg-primary text-on-primary font-medium' : 'text-on-surface hover:bg-surface-container'}`}
              >
                <Lock size={20} /> Đổi mật khẩu
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-on-surface mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '24px', fontWeight: 700 }}>
                <Package size={24} className="text-primary" /> Lịch sử đơn hàng
              </h2>

              {loadingOrders ? (
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
                        <div className="flex flex-col items-end gap-2">
                          <Badge type={order.status}>{statusMap[order.status] || order.status}</Badge>
                          {order.status === 'pending' && (
                            <button
                              onClick={() => handleCancelOrder(order._id)}
                              className="text-label-sm text-error hover:underline"
                            >
                              Hủy đơn hàng
                            </button>
                          )}
                        </div>
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
                            <span className="text-body-md text-on-surface font-medium">{formatVND(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-outline-variant/30 pt-3 flex justify-between items-center">
                        <span className="text-on-surface-variant text-body-md">Tổng cộng</span>
                        <span className="text-primary font-bold text-lg" style={{ fontFamily: 'var(--font-family-heading)' }}>{formatVND(order.totalAmount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-surface rounded-2xl p-8 border border-surface-variant shadow-[var(--shadow-card)]">
              <h2 className="text-on-surface mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '24px', fontWeight: 700 }}>
                <Edit3 size={24} className="text-primary" /> Chỉnh sửa hồ sơ
              </h2>
              <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-md">
                <div>
                  <label className="text-label-md text-on-surface font-medium mb-2 block">Họ và tên</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-label-md text-on-surface font-medium mb-2 block">Email</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary"
                  />
                </div>
                <Button variant="primary" type="submit" disabled={updatingProfile}>
                  {updatingProfile ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="bg-surface rounded-2xl p-8 border border-surface-variant shadow-[var(--shadow-card)]">
              <h2 className="text-on-surface mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '24px', fontWeight: 700 }}>
                <Lock size={24} className="text-primary" /> Đổi mật khẩu
              </h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
                <div>
                  <label className="text-label-md text-on-surface font-medium mb-2 block">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-label-md text-on-surface font-medium mb-2 block">Mật khẩu mới</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-label-md text-on-surface font-medium mb-2 block">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary"
                  />
                </div>
                <Button variant="primary" type="submit" disabled={updatingPassword}>
                  {updatingPassword ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
