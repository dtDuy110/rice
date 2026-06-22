import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import ProductCard from '../ui/ProductCard'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import api from '../../services/api'

export default function BestSellers() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const { data } = await api.get('/products/best-sellers')
        if (data.success) {
          setProducts(data.data)
        }
      } catch (error) {
        console.error('Error fetching best sellers:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBestSellers()
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-16 md:py-20 px-4 md:px-12 max-w-[1280px] mx-auto">
      <div
        ref={ref}
        className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
                <TrendingUp size={16} className="text-error" />
              </div>
              <span className="text-label-sm text-error font-bold uppercase tracking-wider">Bán chạy nhất</span>
            </div>
            <h2
              className="text-headline-lg text-on-surface"
              style={{ fontFamily: 'var(--font-family-heading)' }}
            >
              Sản phẩm được yêu thích
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Products */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <div
                key={product._id}
                className="min-w-[280px] max-w-[300px] snap-start flex-shrink-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} variant="home" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
