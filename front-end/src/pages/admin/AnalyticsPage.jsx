import { useState, useEffect } from 'react'
import { Eye, Users, UserCheck, UserPlus, Search, RefreshCw, Activity, Navigation } from 'lucide-react'
import api from '../../services/api'
import Badge from '../../components/ui/Badge'

export default function AnalyticsPage() {
  const [data, setData] = useState({
    metrics: { totalViews: 0, activeUsers: 0, totalUsers: 0, newUsers: 0 },
    topPages: [],
    recentActivities: [],
    viewsOverTime: []
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const fetchAnalytics = async () => {
    try {
      setRefreshing(true)
      const res = await api.get('/analytics/summary')
      if (res.data.success) {
        setData(res.data.data)
      }
    } catch (error) {
      console.error('Error fetching analytics summary:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const filteredActivities = data.recentActivities.filter(item => {
    const term = searchTerm.toLowerCase()
    const ip = item.ipAddress?.toLowerCase() || ''
    const path = item.details?.path?.toLowerCase() || ''
    const userName = item.user?.name?.toLowerCase() || ''
    return ip.includes(term) || path.includes(term) || userName.includes(term)
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  const cards = [
    { label: 'TỔNG LƯỢT TRUY CẬP', value: data.metrics.totalViews.toLocaleString('vi-VN'), icon: Eye, color: 'text-primary' },
    { label: 'IP HOẠT ĐỘNG', value: data.metrics.activeUsers.toLocaleString('vi-VN'), icon: Activity, color: 'text-secondary' },
    { label: 'TỔNG THÀNH VIÊN', value: data.metrics.totalUsers.toLocaleString('vi-VN'), icon: Users, color: 'text-tertiary' },
    { label: 'ĐĂNG KÝ MỚI (30 NGÀY)', value: data.metrics.newUsers.toLocaleString('vi-VN'), icon: UserPlus, color: 'text-primary' },
  ]

  // Find max count for scaling bar chart
  const maxViewCount = Math.max(...data.viewsOverTime.map(v => v.count), 1)

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header action */}
      <div className="flex justify-between items-center">
        <p className="text-body-md text-on-surface-variant">
          Theo dõi lưu lượng truy cập và hoạt động của người dùng theo thời gian thực
        </p>
        <button
          onClick={fetchAnalytics}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-xl text-label-md text-on-surface hover:bg-surface-container-high transition-all border border-outline-variant/30 shadow-sm"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin text-primary' : 'text-on-surface-variant'} />
          <span>Làm mới</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <div key={i} className="bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">{card.label}</span>
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                  <Icon size={20} className={card.color} />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-on-surface" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  {card.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page Views Chart */}
        <div className="lg:col-span-2 bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-headline-md text-on-surface" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '20px' }}>
                Lượt truy cập 7 ngày qua
              </h3>
              <p className="text-label-sm text-on-surface-variant mt-1">Tổng hợp số lượt xem trang theo từng ngày</p>
            </div>
          </div>
          
          {/* Custom Visual Bar Chart */}
          <div className="flex-1 flex items-end gap-4 pt-8 pb-2 px-4 bg-surface-container-low/50 rounded-xl min-h-[240px]">
            {data.viewsOverTime.length === 0 ? (
              <div className="w-full text-center text-on-surface-variant text-body-md py-12">Chưa có dữ liệu thống kê</div>
            ) : (
              data.viewsOverTime.map((item, index) => {
                const heightPercent = Math.max((item.count / maxViewCount) * 100, 8)
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-surface-container-highest text-on-surface text-xs py-1 px-2 rounded-md shadow-sm pointer-events-none whitespace-nowrap">
                      {item.count} lượt
                    </div>
                    <div 
                      className="w-full bg-primary/80 group-hover:bg-primary rounded-t-lg transition-all duration-500" 
                      style={{ height: `${heightPercent}%` }} 
                    />
                    <span className="text-label-sm text-on-surface-variant transform -rotate-12 sm:rotate-0 mt-2">
                      {item.date.split('-').slice(1).join('/')}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Top Visited Pages */}
        <div className="bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)] flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Navigation size={20} className="text-primary" />
            <h3 className="text-headline-md text-on-surface" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '20px' }}>
              Trang xem nhiều nhất
            </h3>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[280px] pr-1">
            {data.topPages.length === 0 ? (
              <div className="text-center text-on-surface-variant text-body-md py-12">Chưa có dữ liệu</div>
            ) : (
              data.topPages.map((page, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
                    <span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-label-sm text-on-surface-variant font-bold">
                      {i + 1}
                    </span>
                    <p className="text-body-md text-on-surface font-medium truncate" title={page.path}>
                      {page.path}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-primary-container text-on-primary-container px-2.5 py-1 rounded-lg text-label-sm font-semibold">
                    <span>{page.count}</span>
                    <span className="text-xs opacity-80">lượt</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="bg-surface rounded-2xl p-6 border border-surface-variant shadow-[var(--shadow-card)]">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-headline-md text-on-surface" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '20px' }}>
              Lịch sử hoạt động trực tiếp
            </h3>
            <p className="text-label-sm text-on-surface-variant mt-1">Danh sách các hoạt động mới nhất của khách truy cập</p>
          </div>
          
          {/* Search Input */}
          <div className="flex items-center gap-2 bg-surface-container rounded-xl px-4 py-2 border border-outline-variant/30 w-full sm:w-72">
            <Search size={18} className="text-outline" />
            <input
              type="text"
              placeholder="Tìm theo IP, đường dẫn, user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-body-md text-on-surface placeholder:text-outline w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/30">
                <th className="text-left text-label-sm text-on-surface-variant uppercase tracking-wider py-3 px-2 font-medium">THỜI GIAN</th>
                <th className="text-left text-label-sm text-on-surface-variant uppercase tracking-wider py-3 px-2 font-medium">KHÁCH HÀNG / IP</th>
                <th className="text-left text-label-sm text-on-surface-variant uppercase tracking-wider py-3 px-2 font-medium">HÀNH ĐỘNG</th>
                <th className="text-left text-label-sm text-on-surface-variant uppercase tracking-wider py-3 px-2 font-medium">CHI TIẾT</th>
                <th className="text-left text-label-sm text-on-surface-variant uppercase tracking-wider py-3 px-2 font-medium">THIẾT BỊ</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-on-surface-variant py-8 text-body-md">
                    Không tìm thấy hoạt động nào phù hợp
                  </td>
                </tr>
              ) : (
                filteredActivities.map((activity) => (
                  <tr key={activity._id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-4 px-2 text-body-md text-on-surface-variant whitespace-nowrap">
                      {new Date(activity.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      <span className="text-xs block text-on-surface-variant/70">{new Date(activity.timestamp).toLocaleDateString('vi-VN')}</span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-body-md text-on-surface font-medium">
                        {activity.user ? activity.user.name : 'Khách vãng lai'}
                      </div>
                      <div className="text-label-sm text-on-surface-variant">IP: {activity.ipAddress}</div>
                    </td>
                    <td className="py-4 px-2 whitespace-nowrap">
                      <Badge type={activity.action === 'PAGE_VIEW' ? 'processing' : 'success'}>
                        {activity.action}
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-body-md text-on-surface font-medium max-w-xs truncate" title={activity.details?.path || ''}>
                      {activity.details?.path || 'N/A'}
                    </td>
                    <td className="py-4 px-2 text-label-sm text-on-surface-variant max-w-xs truncate" title={activity.deviceInfo}>
                      {activity.deviceInfo}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
