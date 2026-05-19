import { useState } from 'react'
import { TrendingUp, Package, Truck, MoreVertical } from 'lucide-react'
import { orders } from '../../data/mockData'
import Badge from '../../components/ui/Badge'

const tabs = ['Tất cả', 'Đang chờ', 'Đã giao', 'Đã hủy']
const statusMap = { processing: 'Đang xử lý', delivery: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy' }

const orderStats = [
  { label: "ĐƠN HÀNG HÔM NAY", value: '142', change: '+12%', color: 'bg-surface' },
  { label: "CHỜ XỬ LÝ", value: '38', color: 'bg-surface' },
  { label: "ĐANG GIAO", value: '24', color: 'bg-surface' },
  { label: "DOANH THU HÔM NAY", value: '4.2 Tr', color: 'bg-primary text-on-primary' },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('Tất cả')

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
              {orders.map((order, i) => (
                <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-5 px-6 text-body-md text-on-surface font-medium">{order.id}</td>
                  <td className="py-5 px-6 text-body-md text-on-surface-variant">{order.customer}</td>
                  <td className="py-5 px-6 text-body-md text-on-surface-variant">{order.date}</td>
                  <td className="py-5 px-6 text-body-md text-on-surface font-medium">${order.total.toFixed(2)}</td>
                  <td className="py-5 px-6"><Badge type={order.status}>{statusMap[order.status]}</Badge></td>
                  <td className="py-5 px-6"><button className="text-on-surface-variant hover:text-on-surface"><MoreVertical size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-label-sm text-on-surface-variant">Hiển thị 1 đến 4 / 142 mục</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-outline-variant rounded-lg text-label-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">Trước</button>
            <button className="px-4 py-2 border border-outline-variant rounded-lg text-label-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">Tiếp</button>
          </div>
        </div>
      </div>
    </div>
  )
}
