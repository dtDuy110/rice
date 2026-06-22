import { useState } from 'react'
import { X, Plus, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { formatVND } from '../../utils/formatCurrency'
import Button from './Button'
import QuantitySelector from './QuantitySelector'
import Badge from './Badge'

export default function QuickViewModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  if (!isOpen || !product) return null

  const isWishlisted = isInWishlist(product._id || product.id)

  const handleAddToCart = () => {
    addToCart(product._id || product.id, quantity)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="bg-surface rounded-3xl shadow-[var(--shadow-modal)] w-full max-w-4xl relative z-10 overflow-hidden flex flex-col md:flex-row animate-scale-in max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-surface-container-high/80 text-on-surface-variant flex items-center justify-center hover:bg-error hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative bg-surface-container-low min-h-[300px] md:min-h-full">
          <img 
            src={product.images?.[0] || product.image} 
            alt={product.name} 
            className="w-full h-full object-cover absolute inset-0"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <Badge type={product.badgeType}>{product.badge}</Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mb-4 text-sm text-on-surface-variant">
              <span>Đánh giá: </span>
              <span className="flex text-secondary-container">
                ★ {product.rating || 5}
              </span>
              <span>({product.reviews || 0} nhận xét)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-primary text-2xl font-bold" style={{ fontFamily: 'var(--font-family-heading)' }}>
                {formatVND(product.price)}
              </span>
              <span className="text-label-md text-on-surface-variant border border-outline-variant/50 px-2 py-0.5 rounded-md">
                {product.weight || '5 kg'}
              </span>
            </div>
            <p className="text-body-md text-on-surface-variant mb-8 line-clamp-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-label-md font-semibold text-on-surface">Số lượng:</span>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-outline-variant/30">
              <Button 
                variant="primary" 
                size="lg" 
                className="flex-1 flex justify-center items-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                Thêm vào giỏ
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                onClick={(e) => {
                  e.preventDefault()
                  toggleWishlist(product)
                }}
              >
                {isWishlisted ? 'Đã yêu thích' : 'Yêu thích'}
              </Button>
            </div>

            <div className="text-center pt-4">
              <Link 
                to={`/san-pham/${product._id || product.id}`}
                className="text-primary text-sm font-semibold hover:underline"
                onClick={onClose}
              >
                Xem chi tiết sản phẩm →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
