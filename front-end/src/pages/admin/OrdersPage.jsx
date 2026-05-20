import { useState, useEffect } from 'react'
import { TrendingUp, Package, Truck, MoreVertical } from 'lucide-react'
import Badge from '../../components/ui/Badge'
import api from '../../services/api'

const tabs = ['Tất cả', 'Đang chờ', 'Đã giao', 'Đã hủy']
const statusMap = { processing: 'Đang xử lý', delivery: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy' }

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('Tất cả')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/admin/orders')
        if (res.data.success) {
          setOrders(res.data.data)
        }
      } catch (error) {
        console.error('Error fetching admin orders:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  // Calculate Stats
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString())
  const pendingOrders = orders.filter(o => o.status === 'processing')
  const deliveryOrders = orders.filter(o => o.status === 'delivery')
  const todayRevenue = todayOrders.reduce((acc, o) => acc + o.totalAmount, 0)

  const orderStats = [
    { label: "ĐƠN HÀNG HÔM NAY", value: todayOrders.length.toString(), color: 'bg-surface' },
    { label: "CHỜ XỬ LÝ", value: pendingOrders.length.toString(), color: 'bg-surface' },
    { label: "ĐANG GIAO", value: deliveryOrders.length.toString(), color: 'bg-surface' },
    { label: "DOANH THU HÔM NAY", value: `$${todayRevenue.toFixed(2)}`, color: 'bg-primary text-on-primary' },
  ]

  // Filter orders by tab
  const getTabStatus = (tab) => {
    if (tab === 'Đang chờ') return 'processing'
    if (tab === 'Đã giao') return 'delivered'
    if (tab === 'Đã hủy') return 'cancelled'
    return 'all'
  }
  
  const filteredOrders = getTabStatus(activeTab) === 'all' 
    ? orders 
    : orders.filter(o => o.status === getTabStatus(activeTab))

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStats.map((stat, i) => (
          <div key={i} className={`rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)] ${stat.color}`}>
            <p className={`text-label-sm uppercase tracking-wider mb-2 ${i === 3 ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>{stat.label}</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-family-heading)' }}>{stat.value}</span>
              {stat.change && <span className="text-label-sm text-primary flex items-center gap-0.5 mb-1"><TrendingUp size={12} />{stat.change}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-surface rounded-2xl border border-surface-variant shadow-[var(--shadow-card)]">
        {/* Tabs */}
        <div className="flex gap-6 px-6 border-b border-outline-variant/30">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 text-label-md font-semibold transition-colors relative ${activeTab === tab ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}>
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/30">
                {['Mã đơn', 'Khách hàng', 'Ngày', 'Tổng', 'Trạng thái', ''].map(h => (
                  <th key={h} className="text-left text-label-sm text-on-surface-variant uppercase tracking-wider py-3 px-6 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-on-surface-variant">Không có đơn hàng nào.</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-5 px-6 text-body-md text-on-surface font-medium">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="py-5 px-6 text-body-md text-on-surface-variant">{order.shippingAddress?.fullName || order.user?.name || 'Khách hàng'}</td>
                    <td className="py-5 px-6 text-body-md text-on-surface-variant">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="py-5 px-6 text-body-md text-on-surface font-medium">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-5 px-6"><Badge type={order.status}>{statusMap[order.status] || order.status}</Badge></td>
                    <td className="py-5 px-6">
                      <select
                        value={order.status}
                        onChange={async (e) => {
                          try {
                            await api.put(`/admin/orders/${order._id}/status`, { status: e.target.value })
                            setOrders(prev => prev.map(o => o._id === order._id ? { ...o, status: e.target.value } : o))
                          } catch (err) {
                            console.error('Error updating status:', err)
                          }
                        }}
                        className="bg-surface border border-outline-variant/50 rounded-lg px-2 py-1.5 text-label-sm focus:outline-none focus:border-primary cursor-pointer"
                      >
                        <option value="pending">Chờ xác nhận</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="delivery">Đang giao</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-label-sm text-on-surface-variant">Hiển thị {filteredOrders.length} đơn hàng</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-outline-variant rounded-lg text-label-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">Trước</button>
            <button className="px-4 py-2 border border-outline-variant rounded-lg text-label-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">Tiếp</button>
          </div>
        </div>
      </div>
    </div>
  )
}
