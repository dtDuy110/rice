import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()

  const cartCount = cart ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/san-pham', label: 'Sản phẩm' },
    { to: '#', label: 'Giới thiệu' },
    { to: '#', label: 'Liên hệ' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-outline-variant/20'
          : 'bg-surface/80 backdrop-blur-md border-b border-outline-variant/10'
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-12 py-4 max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-headline-md text-primary font-bold"
          style={{ fontFamily: 'var(--font-family-heading)' }}
        >
          Thành Phát
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-label-md transition-colors pb-1 ${
                  isActive
                    ? 'text-primary border-b-2 border-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-3">
          <Link
            to="/gio-hang"
            className="text-primary hover:text-primary-container transition-colors p-2 rounded-lg hover:bg-surface-container-high relative"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-error text-on-error rounded-full text-[10px] font-bold flex items-center justify-center transform translate-x-1/4 -translate-y-1/4 border-2 border-surface">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/tai-khoan" className="hidden md:flex items-center gap-1 text-label-sm font-semibold text-on-surface hover:text-primary transition-colors">
                <User size={16} /> {user.name}
              </Link>
              <button
                onClick={() => { logout(); navigate('/dang-nhap'); }}
                className="text-primary hover:text-primary-container transition-colors p-2 rounded-lg hover:bg-surface-container-high"
                title="Đăng xuất"
              >
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <Link
              to="/dang-nhap"
              className="text-primary hover:text-primary-container transition-colors p-2 rounded-lg hover:bg-surface-container-high"
            >
              <User size={22} />
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-primary p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 space-y-2 bg-surface border-t border-outline-variant/20">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg text-body-md transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/5 font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
