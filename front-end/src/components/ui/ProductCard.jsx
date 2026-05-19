import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Badge from './Badge'

export default function ProductCard({ product, variant = 'home' }) {
  if (variant === 'shop') {
    return <ShopCard product={product} />
  }
  return <HomeCard product={product} />
}

function HomeCard({ product }) {
  return (
    <Link
      to={`/san-pham/${product.id}`}
      className="group bg-surface rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border border-surface-variant block"
    >
      {/* Image */}
      <div className="h-56 md:h-64 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <Badge type={product.badgeType}>{product.badge}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
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
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={(e) => e.preventDefault()}
            className="bg-primary text-on-primary w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary-container transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </Link>
  )
}

function ShopCard({ product }) {
  return (
    <Link
      to={`/san-pham/${product.id}`}
      className="group bg-surface rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border border-surface-variant block"
    >
      {/* Image */}
      <div className="h-56 md:h-72 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <Badge type={product.badgeType}>{product.badge}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
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
            ${product.price.toFixed(2)}
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
          onClick={(e) => e.preventDefault()}
          className="w-full bg-primary text-on-primary py-3 rounded-xl text-label-md font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCartIcon />
          Thêm vào giỏ
        </button>
      </div>
    </Link>
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
