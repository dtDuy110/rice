import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'
import api from '../services/api'
import Breadcrumbs from '../components/ui/Breadcrumbs'

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs')
        if (data.success) {
          setBlogs(data.data)
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="pt-24 pb-16 px-4 min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // Fallback static blogs if database is empty
  const displayBlogs = blogs.length > 0 ? blogs : [
    {
      _id: '1',
      slug: 'cach-phan-biet-gao-st25-that-gia',
      title: 'Cách Phân Biệt Gạo ST25 Thật Và Giả Dễ Dàng',
      excerpt: 'Gạo ST25 đang rất được ưa chuộng, nhưng làm sao để nhận biết được gạo ST25 chính hãng? Dưới đây là 5 mẹo nhỏ...',
      coverImage: 'https://i.ytimg.com/vi/z8HQt-6GWOc/maxresdefault.jpg',
      createdAt: '2026-06-20T00:00:00Z',
      category: 'Kiến thức gạo',
      author: { name: 'Thành Phát' }
    },
    {
      _id: '2',
      slug: 'bi-quyet-nau-com-gao-lut',
      title: 'Bí Quyết Nấu Cơm Gạo Lứt Mềm Dẻo Cho Người Mới',
      excerpt: 'Gạo lứt rất tốt cho sức khỏe nhưng thường khó nấu. Hãy áp dụng phương pháp ngâm và tỉ lệ nước sau để có nồi cơm ngon nhất.',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRLMaR96g8lSyiVkKUh1bRuaxph78vqCBbzOkyVqr6tg&s=10',
      createdAt: '2026-06-18T00:00:00Z',
      category: 'Công thức',
      author: { name: 'Thành Phát' }
    },
    {
      _id: '3',
      slug: 'hanh-trinh-tim-ve-vung-nguyen-lieu-huu-co',
      title: 'Hành Trình Tìm Về Vùng Nguyên Liệu Lúa Hữu Cơ',
      excerpt: 'Cùng Thành Phát về thăm những cánh đồng lúa bạt ngàn tại Sóc Trăng, nơi sản sinh ra những hạt gạo đạt chuẩn quốc tế.',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcrEI4wz1NZNCp4XmoIYyb9QHHlj1ewv9rc7qd4Wdnjg&s=10',
      createdAt: '2026-06-15T00:00:00Z',
      category: 'Câu chuyện',
      author: { name: 'Thành Phát' }
    }
  ]

  return (
    <div className="pt-24 pb-16 px-4 md:px-12 max-w-[1280px] mx-auto animate-fade-in min-h-[70vh]">
      <Breadcrumbs />

      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
          Chuyện Nhà Nông
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
          Cập nhật kiến thức, mẹo vặt và những câu chuyện thú vị từ cánh đồng lúa Việt Nam.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayBlogs.map((blog) => (
          <article key={blog._id} className="bg-surface rounded-2xl overflow-hidden border border-surface-variant shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 group flex flex-col">
            <Link to={`/tin-tuc/${blog.slug}`} className="relative h-56 overflow-hidden block">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                {blog.category}
              </div>
            </Link>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex flex-wrap items-center gap-4 text-outline-variant text-xs mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(blog.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{blog.author?.name || 'Admin'}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-on-surface mb-3 line-clamp-2 hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-family-heading)' }}>
                <Link to={`/tin-tuc/${blog.slug}`}>{blog.title}</Link>
              </h2>
              <p className="text-body-md text-on-surface-variant mb-6 line-clamp-3 flex-1">
                {blog.excerpt}
              </p>
              <Link to={`/tin-tuc/${blog.slug}`} className="inline-flex items-center gap-1 text-primary font-semibold hover:underline mt-auto">
                Đọc tiếp <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
