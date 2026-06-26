import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { Moon, Settings, Search } from 'lucide-react'
import AdminNotificationDropdown from '../admin/AdminNotificationDropdown'

export default function AdminLayout() {
  const location = useLocation()
  let title = "Tổng Quan"
  if (location.pathname.includes('/don-hang')) title = "Quản lý đơn hàng"
  else if (location.pathname.includes('/san-pham')) title = "Quản lý sản phẩm"
  else if (location.pathname.includes('/thong-ke')) title = "Thống kê & Theo dõi người dùng"

  return (
    <div className="min-h-screen bg-surface-container-low flex">
      <AdminSidebar />
      <div className="flex-1 ml-[220px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-surface-container-low/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-outline-variant/10">
          <h1
            className="text-headline-md text-on-surface"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            {title}
          </h1>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 bg-surface-container rounded-xl px-4 py-2 border border-outline-variant/30">
              <Search size={16} className="text-outline" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-transparent outline-none text-body-md text-on-surface placeholder:text-outline w-48"
              />
            </div>
            <AdminNotificationDropdown />
            <button className="p-2 rounded-xl hover:bg-surface-container-high text-on-surface-variant transition-colors">
              <Moon size={20} />
            </button>
            <button className="p-2 rounded-xl hover:bg-surface-container-high text-on-surface-variant transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
