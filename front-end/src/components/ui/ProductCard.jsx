import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Heart, Eye } from 'lucide-react'
import Badge from './Badge'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { formatVND } from '../../utils/formatCurrency'
import QuickViewModal from './QuickViewModal'

export default function ProductCard({ product, variant = 'home' }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  if (variant === 'shop') {
    return (
      <>
        <ShopCard product={product} onQuickView={() => setIsQuickViewOpen(true)} />
        <QuickViewModal product={product} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
      </>
    )
  }
  return (
    <>
      <HomeCard product={product} onQuickView={() => setIsQuickViewOpen(true)} />
      <QuickViewModal product={product} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </>
  )
}

function HomeCard({ product, onQuickView }) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product._id || product.id)

  return (
    <div className="group bg-surface rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border border-surface-variant block relative">
      {/* Image */}
      <div className="h-56 md:h-64 overflow-hidden relative block">
        <Link to={`/san-pham/${product._id || product.id}`} className="block w-full h-full">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {product.badge && (
          <div className="absolute top-4 left-4">
            <Badge type={product.badgeType}>{product.badge}</Badge>
          </div>
        )}
        
        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(); }}
            className="bg-surface/90 text-on-surface backdrop-blur-md px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-primary hover:text-white transition-colors pointer-events-auto transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <Eye size={16} /> Xem nhanh
          </button>
        </div>

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-sm z-10
            ${isWishlisted ? 'bg-error/10 text-error' : 'bg-surface/50 text-on-surface-variant hover:bg-surface/80 hover:text-error'}
          `}
        >
          <Heart size={20} className={isWishlisted ? 'fill-error' : ''} />
        </button>
      </div>

      {/* Content */}
      <Link to={`/san-pham/${product._id || product.id}`} className="p-6 md:p-8 block">
        <h3
          className="text-headline-md text-on-surface mb-2"
          style={{ fontFamily: 'var(--font-family-heading)', fontSize: '20px' }}
        >
          {product.name}
        </h3>
        <p className="text-body-md text-on-surface-variant mb-6 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span
            className="text-primary font-bold text-xl"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            {formatVND(product.price)}
          </span>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product._id || product.id, 1); }}
            className="bg-primary text-on-primary w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary-container transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </Link>
    </div>
  )
}

function ShopCard({ product, onQuickView }) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product._id || product.id)

  return (
    <div className="group bg-surface rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border border-surface-variant block relative">
      {/* Image */}
      <div className="h-56 md:h-72 overflow-hidden relative block">
        <Link to={`/san-pham/${product._id || product.id}`} className="block w-full h-full">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {product.badge && (
          <div className="absolute top-4 left-4">
            <Badge type={product.badgeType}>{product.badge}</Badge>
          </div>
        )}

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(); }}
            className="bg-surface/90 text-on-surface backdrop-blur-md px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-primary hover:text-white transition-colors pointer-events-auto transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <Eye size={16} /> Xem nhanh
          </button>
        </div>

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-sm z-10
            ${isWishlisted ? 'bg-error/10 text-error' : 'bg-surface/50 text-on-surface-variant hover:bg-surface/80 hover:text-error'}
          `}
        >
          <Heart size={20} className={isWishlisted ? 'fill-error' : ''} />
        </button>
      </div>

      {/* Content */}
      <Link to={`/san-pham/${product._id || product.id}`} className="p-6 block">
        <div className="flex justify-between items-start mb-2">
          <h3
            className="text-on-surface font-semibold text-lg leading-tight"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            {product.name}
          </h3>
          <span
            className="text-primary font-bold text-lg shrink-0 ml-2"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            {formatVND(product.price)}
          </span>
        </div>
        <p className="text-body-md text-on-surface-variant mb-4 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
                star <= Math.floor(product.rating)
                  ? 'text-secondary-container'
                  : 'text-outline-variant'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-label-sm text-outline ml-1">({product.reviews})</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product._id || product.id, 1); }}
          className="w-full bg-primary text-on-primary py-3 rounded-xl text-label-md font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2 relative z-10"
        >
          <ShoppingCartIcon />
          Thêm vào giỏ
        </button>
      </Link>
    </div>
  )
}

function ShoppingCartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}
