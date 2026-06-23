import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, LogOut, Search, Heart } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import NotificationDropdown from './NotificationDropdown'
import api from '../../services/api'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const navigate = useNavigate()

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef(null)

  const cartCount = cart ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const wishlistCount = wishlist?.length || 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([])
        return
      }
      try {
        const { data } = await api.get(`/products/search-suggestions?q=${encodeURIComponent(searchQuery)}`)
        if (data.success) setSuggestions(data.data)
      } catch (error) {
        console.error('Error fetching search suggestions:', error)
      }
    }

    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/san-pham?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setShowSuggestions(false)
      setMobileOpen(false)
    }
  }

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/san-pham', label: 'Sản phẩm' },
    { to: '/gioi-thieu', label: 'Giới thiệu' },
    { to: '/lien-he', label: 'Liên hệ' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300  ${scrolled
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
                `text-label-md transition-colors pb-1 ${isActive
                  ? 'text-primary border-b-2 border-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right Icons & Search */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Desktop Search */}
          <div className="hidden lg:block relative mr-2" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                className="bg-surface-container-high border-none rounded-full pl-10 pr-4 py-2 text-label-md w-48 xl:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            </form>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl shadow-[var(--shadow-dropdown)] border border-outline-variant/30 overflow-hidden">
                {suggestions.map(item => (
                  <button
                    key={item._id}
                    onClick={() => {
                      navigate(`/san-pham/${item._id}`)
                      setShowSuggestions(false)
                      setSearchQuery('')
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-surface-container-high transition-colors text-left"
                  >
                    <img src={item.images[0]} alt={item.name} className="w-10 h-10 object-cover rounded-md" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm text-on-surface font-semibold truncate" style={{ fontFamily: 'var(--font-family-heading)' }}>{item.name}</p>
                      <p className="text-xs text-primary">{item.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/yeu-thich"
            className="text-primary hover:text-danger-container transition-colors p-2 rounded-full hover:bg-surface-container-high relative"
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-error text-on-error rounded-full text-[10px] font-bold flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/gio-hang"
            className="text-primary hover:text-danger-container transition-colors p-2 rounded-full hover:bg-surface-container-high relative"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-error text-on-error rounded-full text-[10px] font-bold flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                {cartCount}
              </span>
            )}
          </Link>

          {user && <NotificationDropdown />}

          {user ? (
            <div className="flex items-center gap-1">
              <Link to="/tai-khoan" className="hidden md:flex items-center gap-1 text-label-sm font-semibold text-on-surface hover:text-primary transition-colors px-2">
                <User size={16} /> {user.name}
              </Link>
              <button
                onClick={() => { logout(); navigate('/dang-nhap'); }}
                className="text-primary hover:text-danger-container transition-colors p-2 rounded-full hover:bg-surface-container-high"
                title="Đăng xuất"
              >
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <Link
              to="/dang-nhap"
              className="text-primary hover:text-primary-container transition-colors p-2 rounded-full hover:bg-surface-container-high"
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
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 pb-4 space-y-2 bg-surface border-t border-outline-variant/20">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative mt-4 mb-2">
            <input
              type="text"
              placeholder="Tìm kiếm gạo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-high border-none rounded-xl pl-10 pr-4 py-3 text-label-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          </form>
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg text-body-md transition-colors ${isActive
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
