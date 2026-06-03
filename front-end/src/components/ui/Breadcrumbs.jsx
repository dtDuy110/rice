import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ productName }) {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  const routeNames = {
    'san-pham': 'Sản phẩm',
    'gio-hang': 'Giỏ hàng',
    'thanh-toan': 'Thanh toán',
    'gioi-thieu': 'Giới thiệu',
    'lien-he': 'Liên hệ'
  }

  // Hide breadcrumbs on home page
  if (pathnames.length === 0) return null

  return (
    <nav className="flex items-center text-label-sm text-on-surface-variant mb-6 overflow-x-auto whitespace-nowrap">
      <Link to="/" className="hover:text-primary transition-colors">
        Trang chủ
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        
        let label = routeNames[value] || value
        
        // If it's a product detail page (last segment is an ID, and we are under /san-pham)
        if (pathnames[0] === 'san-pham' && value !== 'san-pham') {
          label = productName || 'Chi tiết sản phẩm'
        }

        return (
          <div key={to} className="flex items-center">
            <ChevronRight size={14} className="mx-2 text-outline-variant" />
            {last ? (
              <span className="text-on-surface font-medium" style={{ fontFamily: 'var(--font-family-heading)' }}>
                {label}
              </span>
            ) : (
              <Link to={to} className="hover:text-primary transition-colors">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
