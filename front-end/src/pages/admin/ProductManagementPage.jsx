import { Search, Plus, ChevronDown, Filter, MoreVertical } from 'lucide-react'
import { adminProducts } from '../../data/mockData'
import Badge from '../../components/ui/Badge'
import Pagination from '../../components/ui/Pagination'
import Button from '../../components/ui/Button'

export default function ProductManagementPage() {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-on-surface mb-1" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '28px', fontWeight: 700 }}>Quản lý sản phẩm</h2>
          <p className="text-body-md text-on-surface-variant">Quản lý kho hàng, giá cả và chi tiết sản phẩm.</p>
        </div>
        <Button variant="primary" icon={Plus}>Thêm sản phẩm</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-lg">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
          <input placeholder="Tìm kiếm theo tên hoặc SKU..." className="w-full bg-surface border border-outline-variant/50 rounded-xl pl-11 pr-4 py-3 text-body-md placeholder:text-outline focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="relative">
          <select className="bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md appearance-none pr-10 focus:outline-none focus:border-primary transition-colors">
            <option>Tất cả danh mục</option>
            <option>Gạo Di Sản</option>
            <option>Bột Xay</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
        </div>
        <div className="relative">
          <select className="bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md appearance-none pr-10 focus:outline-none focus:border-primary transition-colors">
            <option>Trạng thái</option>
            <option>Active</option>
            <option>Draft</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
        </div>
        <button className="flex items-center gap-2 border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors">
          <Filter size={16} /> Bộ lọc khác
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-2xl border border-surface-variant shadow-[var(--shadow-card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low/30">
                {['Ảnh', 'Tên sản phẩm', 'Danh mục', 'Tồn kho', 'Giá', 'Trạng thái', ''].map(h => (
                  <th key={h} className="text-left text-label-sm text-on-surface-variant uppercase tracking-wider py-4 px-6 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminProducts.map((product) => {
                const stockPct = (product.stock / product.maxStock) * 100
                const stockColor = stockPct > 50 ? 'bg-primary' : stockPct > 10 ? 'bg-secondary-container' : 'bg-outline-variant'
                return (
                  <tr key={product.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-4 px-6">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-body-md text-on-surface font-medium">{product.name}</p>
                      <p className="text-label-sm text-on-surface-variant">SKU: {product.sku}</p>
                    </td>
                    <td className="py-4 px-6 text-body-md text-on-surface-variant">{product.category}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-surface-container-high rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${stockColor} transition-all`} style={{ width: `${stockPct}%` }} />
                        </div>
                        <span className="text-body-md text-on-surface-variant whitespace-nowrap">{product.stock} {product.unit}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-body-md text-on-surface font-medium">${product.price.toFixed(2)}/{product.unit}</td>
                    <td className="py-4 px-6"><Badge type={product.status}>{product.status === 'active' ? 'Active' : 'Draft'}</Badge></td>
                    <td className="py-4 px-6"><button className="text-on-surface-variant hover:text-on-surface"><MoreVertical size={18} /></button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-label-sm text-on-surface-variant">Hiển thị 1 đến 10 / 48 mục</span>
          <Pagination currentPage={1} totalPages={3} />
        </div>
      </div>
    </div>
  )
}
