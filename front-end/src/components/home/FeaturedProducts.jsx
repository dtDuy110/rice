import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard'
import { products } from '../../data/mockData'
import useScrollAnimation from '../../hooks/useScrollAnimation'

export default function FeaturedProducts() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const featured = products.slice(0, 3)

  return (
    <section className="py-16 md:py-20 px-4 md:px-12 max-w-[1280px] mx-auto">
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2
              className="text-headline-lg text-on-surface mb-2"
              style={{ fontFamily: 'var(--font-family-heading)' }}
            >
              Sản phẩm đặc trưng
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Nguồn gốc tuyển chọn, xay xát tinh xảo
            </p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((product, index) => (
            <div
              key={product.id}
              className="transition-all duration-500"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <ProductCard product={product} variant="home" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
