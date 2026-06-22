import { ArrowRight, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import useScrollAnimation from '../../hooks/useScrollAnimation'

const blogs = [
  {
    id: 1,
    title: 'Cách Phân Biệt Gạo ST25 Thật Và Giả Dễ Dàng',
    excerpt: 'Gạo ST25 đang rất được ưa chuộng, nhưng làm sao để nhận biết được gạo ST25 chính hãng? Dưới đây là 5 mẹo nhỏ...',
    image: 'https://i.ytimg.com/vi/z8HQt-6GWOc/maxresdefault.jpg',
    date: '20/06/2026',
    category: 'Kiến thức gạo'
  },
  {
    id: 2,
    title: 'Bí Quyết Nấu Cơm Gạo Lứt Mềm Dẻo Cho Người Mới',
    excerpt: 'Gạo lứt rất tốt cho sức khỏe nhưng thường khó nấu. Hãy áp dụng phương pháp ngâm và tỉ lệ nước sau để có nồi cơm ngon nhất.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRLMaR96g8lSyiVkKUh1bRuaxph78vqCBbzOkyVqr6tg&s=10',
    date: '18/06/2026',
    category: 'Công thức'
  },
  {
    id: 3,
    title: 'Hành Trình Tìm Về Vùng Nguyên Liệu Lúa Hữu Cơ',
    excerpt: 'Cùng Thành Phát về thăm những cánh đồng lúa bạt ngàn tại Sóc Trăng, nơi sản sinh ra những hạt gạo đạt chuẩn quốc tế.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcrEI4wz1NZNCp4XmoIYyb9QHHlj1ewv9rc7qd4Wdnjg&s=10',
    date: '15/06/2026',
    category: 'Câu chuyện'
  }
]

export default function BlogPreview() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section className="py-16 md:py-20 px-4 md:px-12 max-w-[1280px] mx-auto">
      <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-10">
          <div>
            <h2 className="text-headline-lg text-on-surface mb-3" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Chuyện Nhà Nông
            </h2>
            <p className="text-body-md text-on-surface-variant max-w-lg">
              Cập nhật kiến thức, mẹo vặt và câu chuyện từ cánh đồng
            </p>
          </div>
          <Link to="/tin-tuc" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-container transition-colors group">
            Xem tất cả bài viết <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog, index) => (
            <div key={blog.id} className="bg-surface rounded-2xl overflow-hidden border border-surface-variant shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 group flex flex-col" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="relative h-48 md:h-56 overflow-hidden shrink-0">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                  {blog.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-outline text-xs mb-3">
                  <Calendar size={14} />
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-headline-md text-on-surface mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  {blog.title}
                </h3>
                <p className="text-body-md text-on-surface-variant mb-4 line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>
                <Link to={`/tin-tuc/${blog.id}`} className="inline-flex items-center gap-1 text-primary font-semibold hover:underline mt-auto">
                  Đọc tiếp <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
