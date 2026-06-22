import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'
import useScrollAnimation from '../../hooks/useScrollAnimation'

const slides = [
  {
    badge: '100% Chứng nhận hữu cơ',
    title: 'Gạo Việt Thượng Hạng Cho Mọi Gia Đình',
    subtitle: 'Tận hưởng hương vị tinh túy từ những cánh đồng màu mỡ nhất. Quy trình canh tác hữu cơ, lưu giữ trọn vẹn giá trị truyền thống.',
    cta: { primary: 'Mua ngay', secondary: 'Tìm hiểu thêm' },
    link: '/san-pham',
    secondaryLink: '/gioi-thieu'
  },
  {
    badge: '🔥 Khuyến mãi đặc biệt',
    title: 'Miễn Phí Vận Chuyển Đơn Từ 500K',
    subtitle: 'Đặt hàng ngay hôm nay để nhận ưu đãi giao hàng miễn phí toàn quốc. Áp dụng cho tất cả sản phẩm.',
    cta: { primary: 'Khám phá ngay', secondary: 'Xem ưu đãi' },
    link: '/san-pham',
    secondaryLink: '/san-pham'
  },
  {
    badge: '⭐ Gạo ngon nhất thế giới',
    title: 'Gạo ST25 — Niềm Tự Hào Việt Nam',
    subtitle: 'Giống gạo đạt giải "Gạo ngon nhất thế giới" do kỹ sư Hồ Quang Cua lai tạo. Hương thơm lá dứa tự nhiên, cơm dẻo mềm.',
    cta: { primary: 'Đặt mua ST25', secondary: 'Câu chuyện' },
    link: '/san-pham',
    secondaryLink: '/gioi-thieu'
  }
]

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length)
  }, [current, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length)
  }, [current, goToSlide])

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slide = slides[current]

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center bg-surface-container overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100"
          src="/images/hero-vid.mp4"
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-black/30" />
      </div>

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 text-center px-4 md:px-12 max-w-4xl mx-auto flex flex-col items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Badge */}
        <span
          key={`badge-${current}`}
          className="bg-secondary-container/20 text-on-secondary-container px-4 py-1.5 rounded-full text-label-sm mb-6 border border-secondary-container/30 inline-block animate-fade-in"
        >
          {slide.badge}
        </span>

        {/* Headline */}
        <h1
          key={`title-${current}`}
          className="text-display-lg text-on-surface mb-6 drop-shadow-sm animate-fade-in-up"
        >
          {slide.title}
        </h1>

        {/* Subtitle */}
        <p
          key={`sub-${current}`}
          className="text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto drop-shadow-sm animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          {slide.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate(slide.link)}
            className="shadow-xl"
          >
            {slide.cta.primary}
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => navigate(slide.secondaryLink)}
            className="border-white text-white hover:bg-white hover:text-primary hover:border-white shadow-lg"
          >
            {slide.cta.secondary}
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-surface/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-surface/50 transition-all"
        aria-label="Slide trước"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-surface/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-surface/50 transition-all"
        aria-label="Slide sau"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? 'w-10 h-3 bg-primary'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
