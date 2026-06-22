import { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import api from '../../services/api'

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const { data } = await api.get('/reviews/top')
        if (data.success) setReviews(data.data)
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    fetchTop()
  }, [])

  // Fallback static data if no reviews in DB yet
  const fallbackReviews = [
    { _id: 'f1', rating: 5, comment: 'Gạo ST25 thơm ngon tuyệt vời, gia đình tôi rất hài lòng. Cơm dẻo mềm, thơm mùi lá dứa tự nhiên.', user: { name: 'Nguyễn Thị Mai' }, product: { name: 'Gạo ST25 Sóc Trăng' } },
    { _id: 'f2', rating: 5, comment: 'Giao hàng nhanh, đóng gói cẩn thận. Gạo Jasmine hương thơm dịu nhẹ, nấu cơm rất ngon.', user: { name: 'Trần Văn Hùng' }, product: { name: 'Gạo Jasmine Đặc Sản' } },
    { _id: 'f3', rating: 5, comment: 'Mình đã thử nhiều loại gạo lứt nhưng gạo lứt đỏ của Thành Phát là ngon nhất, rất bùi và thơm.', user: { name: 'Lê Hoàng Anh' }, product: { name: 'Gạo Lứt Đỏ Hữu Cơ' } },
  ]

  const displayReviews = reviews.length > 0 ? reviews.slice(0, 3) : fallbackReviews

  return (
    <section className="py-16 md:py-20 px-4 md:px-12 max-w-[1280px] mx-auto">
      <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <h2 className="text-headline-lg text-on-surface mb-3" style={{ fontFamily: 'var(--font-family-heading)' }}>Khách hàng nói gì?</h2>
          <p className="text-body-md text-on-surface-variant max-w-lg mx-auto">Hàng nghìn gia đình đã tin chọn Thành Phát</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayReviews.map((review, i) => (
              <div key={review._id} className="bg-surface rounded-2xl p-8 border border-surface-variant shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 relative" style={{ animationDelay: `${i * 100}ms` }}>
                <Quote size={32} className="text-primary/10 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} className="text-secondary fill-secondary" />)}
                </div>
                <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed italic">"{review.comment}"</p>
                <div className="border-t border-outline-variant/30 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">{review.user?.name?.charAt(0) || 'K'}</div>
                    <div>
                      <p className="text-on-surface font-semibold text-sm">{review.user?.name || 'Khách hàng'}</p>
                      <p className="text-on-surface-variant text-xs">{review.product?.name || ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
