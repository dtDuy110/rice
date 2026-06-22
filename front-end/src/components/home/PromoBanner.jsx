import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Clock } from 'lucide-react'
import useScrollAnimation from '../../hooks/useScrollAnimation'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

export default function PromoBanner() {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const navigate = useNavigate()

  // Set target to 7 days from now (resets on each page load for demo)
  const [targetDate] = useState(() => new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  const timeBlocks = [
    { value: days, label: 'Ngày' },
    { value: hours, label: 'Giờ' },
    { value: minutes, label: 'Phút' },
    { value: seconds, label: 'Giây' },
  ]

  return (
    <section className="px-4 md:px-12 max-w-[1280px] mx-auto">
      <div
        ref={ref}
        className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#047857] to-[#064e3b]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 md:px-16 py-12 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <Zap size={16} className="text-secondary-container" />
              <span className="text-white/90 text-label-sm font-medium">Ưu đãi có hạn</span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Giảm 20% Đơn Hàng Đầu Tiên
            </h2>
            <p className="text-white/80 text-body-md mb-6 max-w-md">
              Đăng ký tài khoản và nhận ngay ưu đãi giảm giá 20% cho lần mua hàng đầu tiên. Áp dụng cho tất cả sản phẩm.
            </p>
            <button
              onClick={() => navigate('/san-pham')}
              className="bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
            >
              Mua ngay →
            </button>
          </div>

          {/* Right — Countdown */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 justify-center mb-4 text-white/80">
              <Clock size={16} />
              <span className="text-label-sm font-medium">Kết thúc sau</span>
            </div>
            <div className="flex gap-3">
              {timeBlocks.map((block) => (
                <div key={block.label} className="flex flex-col items-center">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-white/20">
                    <span className="text-white text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-family-heading)' }}>
                      {String(block.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-white/60 text-xs mt-2 font-medium">{block.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
