import { useState, useEffect } from 'react'
import { Plus, ShieldCheck, Truck, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import QuantitySelector from '../components/ui/QuantitySelector'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import ProductDetailSkeleton from '../components/ui/ProductDetailSkeleton'

import api from '../services/api'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatVND } from '../utils/formatCurrency'
import ReviewSection from '../components/ui/ReviewSection'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const [error, setError] = useState(null)

  const fetchProductDetails = async () => {
    try {
      const [productRes, relatedRes] = await Promise.all([
        api.get(`/products/${id}`),
        api.get(`/products/${id}/related`)
      ])
      if (productRes.data.success) {
        setProduct(productRes.data.data)
      }
      if (relatedRes.data.success) {
        setRelatedProducts(relatedRes.data.data)
      }
    } catch (err) {
      setError('Sản phẩm không tồn tại hoặc có lỗi xảy ra.')
      console.error(err)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    fetchProductDetails().finally(() => setLoading(false))
  }, [id])

  const tabs = [
    { id: 'details', label: 'Chi tiết sản phẩm' },
    { id: 'specs', label: 'Thông số kỹ thuật' },
    { id: 'reviews', label: `Đánh giá (${product?.reviews || 0})` },
  ]

  if (loading) return <ProductDetailSkeleton />

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">{error || 'Không tìm thấy sản phẩm'}</h2>
        <Link to="/san-pham" className="text-primary hover:underline">Quay lại cửa hàng</Link>
      </div>
    )
  }

  return (
    <div className="py-12 px-4 md:px-12 max-w-[1280px] mx-auto">
      <Breadcrumbs productName={product.name} />
      
      {/* Product Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
        {/* Image Gallery */}
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-surface-container-low mb-4 aspect-square">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge type={product.badgeType}>{product.badge}</Badge>
              </div>
            )}
          </div>
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === i
                    ? 'border-primary shadow-sm'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-label-md text-primary mb-2 uppercase tracking-wider">
            {product.subtitle}
          </p>
          <h1
            className="text-on-surface mb-4"
            style={{ fontFamily: 'var(--font-family-heading)', fontSize: '36px', fontWeight: 700, lineHeight: 1.2 }}
          >
            {product.name}
          </h1>
          <div className="flex items-baseline gap-3 mb-6">
            <span
              className="text-primary"
              style={{ fontFamily: 'var(--font-family-heading)', fontSize: '28px', fontWeight: 700 }}
            >
              {formatVND(product.price)}
            </span>
            <span className="text-label-md text-on-surface-variant border border-outline-variant/50 px-3 py-1 rounded-lg">
              {product.weight}
            </span>
          </div>

          <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">
            {product.description.split('\n\n')[0]}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-label-md text-on-surface font-semibold">Số lượng</span>
            <QuantitySelector value={quantity} onChange={setQuantity} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button variant="secondary" size="lg" className="flex-1" onClick={() => addToCart(product._id, quantity)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Thêm vào giỏ
            </Button>
            <Button variant="primary" size="lg" className="flex-1">
              Mua ngay
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 text-label-sm text-on-surface-variant">
            <span className="flex items-center gap-2">
              <Truck size={16} className="text-primary" />
              Miễn phí ship đơn trên 500k
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />
              Đảm bảo hài lòng 100%
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-16">
        {/* Tab Headers */}
        <div className="flex gap-8 border-b border-outline-variant/30 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-label-md font-semibold transition-colors relative ${
                activeTab === tab.id
                  ? 'text-on-surface'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {activeTab === 'details' && (
              <>
                <div className="text-body-md text-on-surface-variant leading-relaxed space-y-4">
                  {product.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <ul className="mt-6 space-y-2">
                  {product.features?.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-body-md text-on-surface-variant">
                      <span className="text-primary mt-1">•</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </>
            )}
            
            {activeTab === 'specs' && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-4 bg-surface-container-low p-4 rounded-xl">
                  <div className="text-on-surface-variant text-label-md">Thương hiệu</div>
                  <div className="text-on-surface font-medium">Gạo Thành Phát</div>
                </div>
                <div className="grid grid-cols-2 gap-4 bg-surface p-4 rounded-xl border border-outline-variant/30">
                  <div className="text-on-surface-variant text-label-md">Xuất xứ</div>
                  <div className="text-on-surface font-medium">{product.origin || 'Việt Nam'}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 bg-surface-container-low p-4 rounded-xl">
                  <div className="text-on-surface-variant text-label-md">Khối lượng</div>
                  <div className="text-on-surface font-medium">{product.weight || '5 kg'}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 bg-surface p-4 rounded-xl border border-outline-variant/30">
                  <div className="text-on-surface-variant text-label-md">Hữu cơ</div>
                  <div className="text-on-surface font-medium">{product.organic ? 'Có' : 'Không'}</div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewSection 
                productId={product._id} 
                onReviewAdded={() => fetchProductDetails()}
              />
            )}
          </div>

          {/* Farm Details */}
          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/30 h-fit">
            <h3
              className="text-headline-md text-on-surface mb-6"
              style={{ fontFamily: 'var(--font-family-heading)', fontSize: '20px' }}
            >
              Chi tiết nông trại
            </h3>
            {product.farmDetails && Object.keys(product.farmDetails).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(product.farmDetails).map(([key, value]) => {
                  const labels = { origin: 'Nguồn gốc', harvest: 'Thu hoạch', processing: 'Chế biến' }
                  if (!value) return null;
                  return (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-outline-variant/20 last:border-0">
                      <span className="text-body-md text-on-surface-variant">{labels[key] || key}</span>
                      <span className="text-body-md text-on-surface font-medium text-right">{value}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-body-md text-on-surface-variant">Chưa có thông tin chi tiết.</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-headline-lg text-on-surface"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            Sản phẩm bổ sung
          </h2>
          <Link to="/san-pham" className="text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
            Xem tất cả <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((item) => (
            <Link to={`/san-pham/${item._id}`} key={item._id} className="group">
              <div className="rounded-2xl overflow-hidden mb-3 aspect-square bg-surface-container-low">
                <img
                  src={item.images?.[0] || item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3
                className="text-on-surface font-semibold mb-1"
                style={{ fontFamily: 'var(--font-family-heading)', fontSize: '16px' }}
              >
                {item.name}
              </h3>
              <p className="text-label-sm text-on-surface-variant mb-2">{item.subtitle}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  ${item.price.toFixed(2)}
                </span>
                <button 
                  onClick={(e) => { e.preventDefault(); addToCart(item._id, 1); }}
                  className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
