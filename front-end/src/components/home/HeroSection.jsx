import Button from '../ui/Button'
import useScrollAnimation from '../../hooks/useScrollAnimation'

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center bg-surface-container overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
          src="https://cdn.pixabay.com/video/2016/08/22/4741-182873115_large.mp4"
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-black/30" />
      </div>

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 text-center px-4 md:px-12 max-w-4xl mx-auto flex flex-col items-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Badge */}
        <span className="bg-secondary-container/20 text-on-secondary-container px-4 py-1.5 rounded-full text-label-sm mb-6 border border-secondary-container/30 inline-block">
          100% Chứng nhận hữu cơ
        </span>

        {/* Headline */}
        <h1 className="text-display-lg text-on-surface mb-6 drop-shadow-sm">
          Gạo Việt Thượng Hạng Cho Mọi Gia Đình
        </h1>

        {/* Subtitle */}
        <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto drop-shadow-sm">
          Tận hưởng hương vị tinh túy từ những cánh đồng màu mỡ nhất. Quy trình canh tác hữu cơ, lưu giữ trọn vẹn giá trị truyền thống.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg">
            Mua ngay
          </Button>
          <Button variant="secondary" size="lg">
            Tìm hiểu thêm
          </Button>
        </div>
      </div>
    </section>
  )
}
