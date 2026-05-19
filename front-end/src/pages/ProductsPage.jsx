import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import Pagination from '../components/ui/Pagination'
import { products } from '../data/mockData'
import useScrollAnimation from '../hooks/useScrollAnimation'

const categories = ['Jasmine', 'Basmati', 'Gạo lứt', 'Gạo nếp']
const origins = ['Việt Nam', 'Thái Lan', 'Ấn Độ']

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const { ref, isVisible } = useScrollAnimation(0.05)

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category)
    const matchSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div
      ref={ref}
      className={`py-8 md:py-12 px-4 md:px-12 max-w-[1280px] mx-auto transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-56 shrink-0">
          <h2
            className="text-headline-lg text-on-surface mb-6"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            Bộ lọc
          </h2>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-label-md text-on-surface font-semibold mb-3">Khoảng giá</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Tối thiểu"
                className="w-full bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
              />
              <span className="text-outline">-</span>
              <input
                type="number"
                placeholder="Tối đa"
                className="w-full bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Rice Category */}
          <div className="mb-8">
            <h3 className="text-label-md text-on-surface font-semibold mb-3">Loại gạo</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                  />
                  <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors text-sm">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Origin */}
          <div className="mb-8">
            <h3 className="text-label-md text-on-surface font-semibold mb-3">Xuất xứ</h3>
            <div className="space-y-2">
              {origins.map((origin) => (
                <label key={origin} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                  />
                  <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors text-sm">
                    {origin}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div>
            <h3 className="text-label-md text-on-surface font-semibold mb-3">Trọng lượng</h3>
            <div className="relative">
              <select className="w-full bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm text-on-surface appearance-none focus:outline-none focus:border-primary transition-colors pr-8">
                <option>Tất cả</option>
                <option>1 kg</option>
                <option>2 kg</option>
                <option>5 kg</option>
                <option>10 kg</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface border border-outline-variant/50 rounded-xl pl-11 pr-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Sắp xếp</span>
              <div className="relative">
                <select className="bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface appearance-none focus:outline-none focus:border-primary transition-colors pr-10">
                  <option>Mới nhất</option>
                  <option>Giá tăng</option>
                  <option>Giá giảm</option>
                  <option>Đánh giá cao</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} variant="shop" />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-body-lg text-on-surface-variant">Không tìm thấy sản phẩm phù hợp.</p>
            </div>
          )}

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  )
}
