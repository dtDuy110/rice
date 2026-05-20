import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Button from '../ui/Button'

export default function ProductModal({ isOpen, onClose, onSave, product = null }) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: 0,
    category: 'Gạo ST',
    unit: 'kg',
    stock: 0,
    maxStock: 100,
    status: 'active',
    image: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        price: product.price || 0,
        category: product.category || 'Jasmine',
        unit: product.unit || 'kg',
        stock: product.stock || 0,
        maxStock: product.maxStock || 100,
        status: product.status || 'active',
        image: product.images?.[0] || '',
        description: product.description || ''
      })
    } else {
      setFormData({
        name: '',
        sku: '',
        price: 0,
        category: 'Jasmine',
        unit: 'kg',
        stock: 0,
        maxStock: 100,
        status: 'active',
        image: '',
        description: ''
      })
    }
  }, [product, isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Format data for backend
    const submitData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      maxStock: Number(formData.maxStock),
      images: formData.image ? [formData.image] : []
    }
    
    await onSave(submitData)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/30">
          <h2 className="text-headline-md text-on-surface" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '24px' }}>
            {product ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-label-md text-on-surface mb-2">Tên sản phẩm</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2">SKU</label>
                <input required type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-label-md text-on-surface mb-2">Giá ($)</label>
                <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2">Danh mục</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary">
                  <option value="Gạo ST">Gạo ST</option>
                  <option value="Gạo Jasmine">Gạo Jasmine</option>
                  <option value="Gạo Thơm">Gạo Thơm</option>
                  <option value="Gạo Lài">Gạo Lài</option>
                  <option value="Gạo Móng Chim">Gạo Móng Chim</option>
                  <option value="Gạo Nếp">Gạo Nếp</option>
                  <option value="Gạo Lứt">Gạo Lứt</option>
                  <option value="Gạo Tấm">Gạo Tấm</option>
                  <option value="Gạo Basmati">Gạo Basmati</option>
                  <option value="Gạo Nhật">Gạo Nhật</option>
                </select>
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2">Đơn vị</label>
                <input required type="text" name="unit" value={formData.unit} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-label-md text-on-surface mb-2">Tồn kho</label>
                <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2">Tồn kho tối đa</label>
                <input required type="number" name="maxStock" value={formData.maxStock} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2">Trạng thái</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-label-md text-on-surface mb-2">URL Hình ảnh</label>
              <input required type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label className="block text-label-md text-on-surface mb-2">Mô tả chi tiết</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary"></textarea>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline-variant/30 flex justify-end gap-3 bg-surface-container-lowest rounded-b-2xl">
          <Button variant="secondary" onClick={onClose} disabled={loading}>Hủy</Button>
          <Button variant="primary" type="submit" form="product-form" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </Button>
        </div>

      </div>
    </div>
  )
}
