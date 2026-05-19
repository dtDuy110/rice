import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/san-pham', icon: Package, label: 'Sản phẩm' },
  { to: '/admin/don-hang', icon: ShoppingBag, label: 'Đơn hàng' },
  { to: '#', icon: Users, label: 'Khách hàng' },
  { to: '#', icon: BarChart3, label: 'Thống kê' },
  { to: '#', icon: Settings, label: 'Cài đặt' },
]

export default function AdminSidebar() {
  return (
    <aside className="w-[220px] min-h-screen bg-surface flex flex-col border-r border-outline-variant/20 fixed left-0 top-0 z-40">
      {/* Brand */}
      <div className="px-6 pt-8 pb-6">
        <h2
          className="text-primary font-bold text-xl"
          style={{ fontFamily: 'var(--font-family-heading)' }}
        >
          Admin Portal
        </h2>
        <p className="text-label-sm text-on-surface-variant mt-1">
          Quản lý Thành Phát
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) =>
          item.to === '#' ? (
            <div
              key={item.label}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-body-md text-on-surface-variant/50 cursor-not-allowed"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-body-md transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-on-primary font-medium shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          )
        )}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-6 border-t border-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">
            TP
          </div>
          <div>
            <p className="text-body-md font-medium text-on-surface text-sm">Store Admin</p>
            <p className="text-label-sm text-on-surface-variant">admin@thanhphat.vn</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
