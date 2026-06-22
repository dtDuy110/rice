import { useState, useEffect } from 'react'
import { Users, Award, ShoppingBag, ThumbsUp } from 'lucide-react'
import useScrollAnimation from '../../hooks/useScrollAnimation'

const stats = [
  { icon: ShoppingBag, end: 500, suffix: '+', label: 'Sản phẩm' },
  { icon: Users, end: 10000, suffix: '+', label: 'Khách hàng' },
  { icon: ThumbsUp, end: 1000, suffix: '+', label: 'Đánh giá 5⭐' },
  { icon: Award, end: 20, suffix: '+', label: 'Năm kinh nghiệm' },
]

function Counter({ end, suffix, duration = 2000, isVisible }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }
    window.requestAnimationFrame(step)
  }, [end, duration, isVisible])

  return (
    <div className="flex items-baseline justify-center gap-1">
      <span className="text-4xl md:text-5xl font-bold text-on-surface" style={{ fontFamily: 'var(--font-family-heading)' }}>
        {count}
      </span>
      <span className="text-2xl md:text-3xl font-bold text-primary">{suffix}</span>
    </div>
  )
}

export default function StatsCounter() {
  const { ref, isVisible } = useScrollAnimation(0.5)

  return (
    <section className="py-12 md:py-16 border-y border-outline-variant/30 bg-surface-container-lowest">
      <div ref={ref} className="max-w-[1280px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <stat.icon size={24} />
              </div>
              <Counter end={stat.end} suffix={stat.suffix} isVisible={isVisible} />
              <p className="text-body-md text-on-surface-variant mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
