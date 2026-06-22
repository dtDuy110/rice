import { Sprout, Factory, ClipboardCheck, Package, Truck } from 'lucide-react'
import useScrollAnimation from '../../hooks/useScrollAnimation'

const steps = [
  { icon: Sprout, title: 'Thu hoạch', description: 'Lúa được thu hoạch đúng thời vụ từ nông trại hữu cơ đạt chuẩn VietGAP.', color: 'bg-primary/10 text-primary' },
  { icon: Factory, title: 'Xay xát', description: 'Quy trình xay xát hiện đại, giữ trọn vẹn dinh dưỡng và hương vị.', color: 'bg-secondary/10 text-secondary' },
  { icon: ClipboardCheck, title: 'Kiểm định', description: 'Kiểm tra chất lượng nghiêm ngặt, đảm bảo an toàn thực phẩm.', color: 'bg-tertiary/10 text-tertiary' },
  { icon: Package, title: 'Đóng gói', description: 'Đóng gói chân không theo tiêu chuẩn, bảo quản tươi mới.', color: 'bg-primary/10 text-primary' },
  { icon: Truck, title: 'Giao hàng', description: 'Giao tận tay khách hàng trong 24–48h trên toàn quốc.', color: 'bg-secondary/10 text-secondary' }
]

export default function ProcessTimeline() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section className="py-16 md:py-20 px-4 md:px-12 max-w-[1280px] mx-auto">
      <div ref={ref} className={`bg-surface-container-low rounded-3xl p-8 md:p-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-headline-lg text-on-surface mb-3" style={{ fontFamily: 'var(--font-family-heading)' }}>Từ Ruộng Đến Bàn Ăn</h2>
          <p className="text-body-md text-on-surface-variant max-w-lg mx-auto">Quy trình 5 bước đảm bảo chất lượng tốt nhất cho mỗi hạt gạo</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-outline-variant/30" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center relative">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${step.color} flex items-center justify-center mb-4 relative z-10 bg-surface border-4 border-surface-container-low shadow-[var(--shadow-card)] transition-transform hover:scale-110 duration-300`}>
                  <step.icon size={28} />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-[2.2rem] md:translate-x-[2.8rem] -translate-y-1 w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center text-xs font-bold z-20">{index + 1}</div>
                <h3 className="text-label-md text-on-surface font-bold mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>{step.title}</h3>
                <p className="text-body-md text-on-surface-variant text-sm leading-relaxed max-w-[200px]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
