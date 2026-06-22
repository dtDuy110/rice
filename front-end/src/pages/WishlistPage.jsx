import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ui/ProductCard'
import Button from '../components/ui/Button'

export default function WishlistPage() {
  const { wishlist, loading } = useWishlist()

  if (loading) {
    return (
      <div className="pt-24 pb-16 px-4 min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-12 max-w-[1280px] mx-auto animate-fade-in min-h-[70vh]">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
          Sản phẩm yêu thích
        </h1>
        <p className="text-on-surface-variant">
          {wishlist.length} sản phẩm được lưu
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-low rounded-3xl border border-outline-variant/30">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="fill-primary/20" />
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-3" style={{ fontFamily: 'var(--font-family-heading)' }}>
            Danh sách rỗng
          </h2>
          <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
            Bạn chưa lưu sản phẩm nào. Hãy khám phá các loại gạo đặc sản của Thành Phát và thêm vào danh sách yêu thích nhé!
          </p>
          <Link to="/san-pham">
            <Button variant="primary" size="lg" icon={ShoppingBag}>
              Khám phá sản phẩm
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
