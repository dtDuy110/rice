import { useState, useEffect } from 'react'
import { Search, Plus, ChevronDown, Filter, Edit2, Trash2 } from 'lucide-react'
import Badge from '../../components/ui/Badge'
import Pagination from '../../components/ui/Pagination'
import Button from '../../components/ui/Button'
import ProductModal from '../../components/admin/ProductModal'
import api from '../../services/api'
import { useToast } from '../../context/ToastContext'
import { formatVND } from '../../utils/formatCurrency'

export default function ProductManagementPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const { showToast } = useToast()

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await api.get('/admin/products')
      if (res.data.success) {
        setProducts(res.data.data)
      }
    } catch (error) {
      console.error('Error fetching admin products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleCreate = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await api.delete(`/admin/products/${id}`)
        fetchProducts()
        showToast('Đã xóa sản phẩm!', 'success')
      } catch (error) {
        console.error('Error deleting product:', error)
        showToast('Có lỗi xảy ra khi xóa!', 'error')
      }
    }
  }

  const handleSaveProduct = async (productData) => {
      try {
        if (editingProduct) {
          await api.put(`/admin/products/${editingProduct._id}`, productData)
          showToast('Cập nhật sản phẩm thành công!', 'success')
        } else {
          await api.post('/admin/products', productData)
          showToast('Thêm sản phẩm thành công!', 'success')
        }
        setIsModalOpen(false)
        fetchProducts()
      } catch (error) {
        console.error('Error saving product:', error)
        showToast('Có lỗi xảy ra khi lưu!', 'error')
      }
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-on-surface mb-1" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '28px', fontWeight: 700 }}>Quản lý sản phẩm</h2>
          <p className="text-body-md text-on-surface-variant">Quản lý kho hàng, giá cả và chi tiết sản phẩm.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={handleCreate}>Thêm sản phẩm</Button>
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-on-surface-variant">Không có sản phẩm nào.</td>
                </tr>
              ) : (
                products.map((product) => {
                  const stockPct = product.maxStock ? (product.stock / product.maxStock) * 100 : Math.min((product.stock / 100) * 100, 100)
                  const stockColor = stockPct > 50 ? 'bg-primary' : stockPct > 10 ? 'bg-secondary-container' : 'bg-outline-variant'
                  return (
                    <tr key={product._id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-4 px-6">
                        <img src={product.images?.[0] || 'https://via.placeholder.com/150'} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
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
                      <td className="py-4 px-6 text-body-md text-on-surface font-medium">{formatVND(product.price)}/{product.unit}</td>
                      <td className="py-4 px-6"><Badge type={product.status === 'active' ? 'active' : 'draft'}>{product.status === 'active' ? 'Active' : 'Draft'}</Badge></td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEdit(product)} className="text-on-surface-variant hover:text-primary transition-colors p-2"><Edit2 size={18} /></button>
                          <button onClick={() => handleDelete(product._id)} className="text-on-surface-variant hover:text-error transition-colors p-2"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-label-sm text-on-surface-variant">Hiển thị {products.length} sản phẩm</span>
          {/* Mock Pagination for now since API doesn't paginate yet */}
          <Pagination currentPage={1} totalPages={1} />
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveProduct} 
        product={editingProduct} 
      />
    </div>
  )
}
