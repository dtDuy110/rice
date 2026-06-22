import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard'
import useRecentlyViewed from '../../hooks/useRecentlyViewed'
import useScrollAnimation from '../../hooks/useScrollAnimation'

export default function RecentlyViewed() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const { recentlyViewed } = useRecentlyViewed()
  const scrollRef = useRef(null)

  if (!recentlyViewed || recentlyViewed.length === 0) return null

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
    <section className="py-12 border-t border-outline-variant/30 mt-12">
      <div
        ref={ref}
        className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex justify-between items-end mb-8">
          <h2
            className="text-headline-sm text-on-surface"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            Sản phẩm bạn vừa xem
          </h2>
          {recentlyViewed.length > 4 && (
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
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recentlyViewed.map((product) => (
            <div
              key={product._id}
              className="min-w-[250px] max-w-[280px] snap-start flex-shrink-0"
            >
              <ProductCard product={product} variant="home" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
