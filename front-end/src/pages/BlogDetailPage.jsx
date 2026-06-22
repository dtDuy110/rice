import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, Eye, ArrowLeft } from 'lucide-react'
import api from '../services/api'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import ShareButton from '../components/ui/ShareButton'

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blogs/${slug}`)
        if (data.success) {
          setBlog(data.data)
        }
      } catch (err) {
        setError('Bài viết không tồn tại hoặc đã bị xóa.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    // Fallback if no backend
    if (slug === 'cach-phan-biet-gao-st25-that-gia') {
      setTimeout(() => {
        setBlog({
          title: 'Cách Phân Biệt Gạo ST25 Thật Và Giả Dễ Dàng',
          coverImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&q=80',
          createdAt: '2026-06-20T00:00:00Z',
          category: 'Kiến thức gạo',
          author: { name: 'Thành Phát' },
          views: 1250,
          content: `Gạo ST25 đang rất được ưa chuộng trên thị trường nhờ hương vị thơm ngon đặc biệt. Tuy nhiên, cũng chính vì độ hot này mà trên thị trường xuất hiện nhiều loại gạo giả mạo ST25. Dưới đây là những cách đơn giản giúp bạn phân biệt gạo ST25 thật.

### 1. Quan sát hạt gạo
Hạt gạo ST25 thật có đặc điểm dài (khoảng 9mm), mảnh, dẹt, không bị bạc bụng, màu trắng trong chứ không trắng đục. Hạt gạo nguyên vẹn, ít bị gãy vụn.

### 2. Mùi hương
Gạo ST25 thật có mùi thơm thoang thoảng của lá dứa tự nhiên xen lẫn mùi cốm mới. Bạn chỉ cần bốc một nắm gạo trên tay cũng có thể ngửi thấy mùi thơm này. Gạo giả thường được ướp hương liệu nên mùi sẽ nồng nặc và mau mất mùi sau vài ngày để ngoài không khí.

### 3. Khi nấu thành cơm
Cơm nấu từ gạo ST25 chuẩn không cần nhiều nước. Khi chín, hạt cơm nguyên vẹn, xếp chồng lên nhau rất đẹp mắt chứ không bị nở bung hay nát. Cơm dẻo mềm, vị ngọt thanh tự nhiên. Đặc biệt, dù để nguội cơm vẫn dẻo và không bị khô cứng.

### 4. Bao bì và mã vạch
Nên mua gạo ST25 tại các cửa hàng, siêu thị uy tín. Bao bì in ấn rõ nét, có đầy đủ thông tin nhà sản xuất, hạn sử dụng và đặc biệt là logo chứng nhận hoặc tem chống hàng giả.

Hy vọng với những mẹo nhỏ trên, gia đình bạn sẽ luôn thưởng thức được hương vị tuyệt vời của loại gạo ngon nhất thế giới này.`
        })
        setLoading(false)
      }, 500)
    } else {
      fetchBlog()
    }
  }, [slug])

  if (loading) return <div className="pt-24 min-h-screen flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mt-20" /></div>

  if (error && !blog) return (
    <div className="pt-24 min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">{error}</h2>
      <Link to="/tin-tuc" className="text-primary hover:underline">Quay lại danh sách bài viết</Link>
    </div>
  )

  return (
    <div className="pt-24 pb-16 px-4 md:px-12 max-w-[900px] mx-auto animate-fade-in min-h-[70vh]">
      <div className="mb-6">
        <Link to="/tin-tuc" className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium mb-6">
          <ArrowLeft size={16} /> Quay lại
        </Link>
        <Breadcrumbs productName={blog.title} />
      </div>

      <article>
        <div className="mb-8 text-center">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            {blog.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface mb-6 leading-tight" style={{ fontFamily: 'var(--font-family-heading)' }}>
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-on-surface-variant">
            <span className="flex items-center gap-2"><User size={16} /> {blog.author?.name || 'Admin'}</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(blog.createdAt).toLocaleDateString('vi-VN')}</span>
            <span className="flex items-center gap-2"><Eye size={16} /> {blog.views} lượt xem</span>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden mb-12 shadow-md">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-auto max-h-[500px] object-cover" />
        </div>

        <div className="prose prose-lg max-w-none text-on-surface-variant 
          prose-headings:font-bold prose-headings:text-on-surface prose-headings:font-heading
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-primary hover:prose-a:text-primary-container
          prose-img:rounded-2xl prose-img:shadow-sm"
          style={{ '--tw-prose-headings': 'var(--font-family-heading)' }}
        >
          {blog.content.split('\n\n').map((para, index) => {
            if (para.startsWith('###')) {
              return <h3 key={index}>{para.replace('### ', '')}</h3>
            }
            return <p key={index}>{para}</p>
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-outline-variant/30 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-on-surface">Tags:</span>
            {blog.tags?.map(tag => (
              <span key={tag} className="bg-surface-container-low px-3 py-1 rounded-lg text-sm text-on-surface-variant">#{tag}</span>
            )) || <span className="text-sm text-on-surface-variant">Không có tag</span>}
          </div>
          <ShareButton title={blog.title} />
        </div>
      </article>
    </div>
  )
}
