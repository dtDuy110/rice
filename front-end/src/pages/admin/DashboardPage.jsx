import { TrendingUp, Wallet, Package, Users, Target, Eye, MoreVertical } from 'lucide-react'
import { dashboardStats, recentOrders, lowStockItems } from '../../data/mockData'
import Badge from '../../components/ui/Badge'

const iconMap = { wallet: Wallet, package: Package, users: Users, target: Target }

export default function DashboardPage() {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || Wallet
          return (
            <div key={i} className="bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">{stat.label}</span>
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                  <Icon size={18} />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-on-surface" style={{ fontFamily: 'var(--font-family-heading)' }}>{stat.value}</span>
                <span className={`text-label-sm mb-1 flex items-center gap-0.5 ${stat.change.startsWith('+') ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {stat.change.startsWith('+') && <TrendingUp size={12} />}
                  {stat.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Analytics */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-headline-md text-on-surface" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '20px' }}>Phân tích doanh thu</h3>
            <a href="#" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors">Xem báo cáo &gt;</a>
          </div>
          {/* Chart Placeholder */}
          <div className="h-64 bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl flex items-end justify-center p-4 relative overflow-hidden">
            <svg viewBox="0 0 400 150" className="w-full h-full absolute inset-0 p-4" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#154539" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#154539" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d="M0 120 C50 100, 80 60, 120 80 C160 100, 180 40, 220 50 C260 60, 290 20, 330 30 C370 40, 380 70, 400 60 L400 150 L0 150 Z" fill="url(#areaGrad)" />
              <path d="M0 120 C50 100, 80 60, 120 80 C160 100, 180 40, 220 50 C260 60, 290 20, 330 30 C370 40, 380 70, 400 60" fill="none" stroke="#154539" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* Monthly Sales */}
        <div className="bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-headline-md text-on-surface" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '20px' }}>Doanh số tháng</h3>
            <button className="text-on-surface-variant hover:text-on-surface"><MoreVertical size={18} /></button>
          </div>
          <div className="flex items-end gap-2 h-48">
            {[60, 80, 45, 70, 90, 85, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full rounded-t-md transition-all duration-500 ${i >= 5 ? 'bg-primary' : 'bg-secondary-container/50'}`} style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)]">
          <h3 className="text-headline-md text-on-surface mb-6" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '20px' }}>Đơn hàng gần đây</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  {['ID', 'KHÁCH HÀNG', 'NGÀY', 'TỔNG', 'TRẠNG THÁI'].map(h => (
                    <th key={h} className="text-left text-label-sm text-on-surface-variant uppercase tracking-wider py-3 px-2 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-4 px-2 text-body-md text-on-surface font-medium">{order.id}</td>
                    <td className="py-4 px-2 text-body-md text-on-surface-variant">{order.customer}</td>
                    <td className="py-4 px-2 text-body-md text-on-surface-variant">{order.date}</td>
                    <td className="py-4 px-2 text-body-md text-on-surface font-medium">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-2"><Badge type={order.status}>{order.status === 'success' ? 'Thành công' : 'Đang chờ'}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-headline-md text-on-surface" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '20px' }}>Sắp hết hàng</h3>
            <span className="bg-error text-on-error text-xs font-bold px-2 py-0.5 rounded-full">3</span>
          </div>
          <div className="space-y-4">
            {lowStockItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low/50">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-lg">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-body-md text-on-surface font-medium text-sm truncate">{item.name}</p>
                  <p className="text-label-sm text-on-surface-variant">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${item.units <= 10 ? 'text-error' : item.units <= 20 ? 'text-secondary' : 'text-on-surface'}`}>{item.units}</span>
                  <p className="text-label-sm text-on-surface-variant">còn lại</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 border border-outline-variant rounded-xl text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors font-medium">
            Xem kho hàng
          </button>
        </div>
      </div>
    </div>
  )
}
