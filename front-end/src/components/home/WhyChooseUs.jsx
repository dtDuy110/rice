import { Leaf, Truck, Tag, ShieldCheck } from 'lucide-react'
import useScrollAnimation from '../../hooks/useScrollAnimation'

const benefits = {
  large: {
    icon: Leaf,
    title: 'Chất lượng hữu cơ',
    description:
      'Gạo của chúng tôi được trồng mà không sử dụng thuốc trừ sâu hóa học hay phân bón tổng hợp, tôn trọng đất đai và đảm bảo những hạt gạo tinh khiết nhất cho gia đình bạn. Chúng tôi duy trì các chứng nhận nghiêm ngặt.',
    bgIcon: 'bg-primary-container',
    textIcon: 'text-on-primary-container',
  },
  small: [
    {
      icon: Truck,
      title: 'Giao hàng nhanh',
      description: 'Trực tiếp từ kho của chúng tôi đến trước cửa nhà bạn trong 48 giờ.',
      bgIcon: 'bg-surface-container-high',
      textIcon: 'text-primary',
    },
    {
      icon: Tag,
      title: 'Giá cả hợp lý',
      description: 'Chất lượng cao cấp không phải là điều xa xỉ. Chúng tôi cung cấp giá cả công bằng.',
      bgIcon: 'bg-secondary-container/20',
      textIcon: 'text-secondary',
    },
  ],
  wide: {
    icon: ShieldCheck,
    title: 'Nguồn cung tin cậy',
    description:
      'Hơn 50 năm kinh nghiệm canh tác truyền thống, hợp tác trực tiếp với các hợp tác xã địa phương ở Đồng bằng sông Cửu Long.',
    bgIcon: 'bg-tertiary-container/20',
    textIcon: 'text-tertiary',
  },
}

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section className="py-16 md:py-20 px-4 md:px-12 max-w-[1280px] mx-auto">
      <div
        ref={ref}
        className={`bg-surface-container-low rounded-3xl p-8 md:p-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2
            className="text-headline-lg text-on-surface mb-4"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            Tại sao chọn Thành Phát?
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Chúng tôi thu hẹp khoảng cách giữa phương pháp canh tác truyền thống và tiêu chuẩn chất lượng hiện đại.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Large Card - 2 cols, 2 rows */}
          <div className="bg-surface p-8 rounded-2xl shadow-[var(--shadow-card)] md:col-span-2 md:row-span-2 flex flex-col justify-between border border-surface-variant group hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <div>
              <div className={`w-14 h-14 ${benefits.large.bgIcon} rounded-xl flex items-center justify-center ${benefits.large.textIcon} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefits.large.icon size={24} />
              </div>
              <h3
                className="text-headline-md text-on-surface mb-4"
                style={{ fontFamily: 'var(--font-family-heading)' }}
              >
                {benefits.large.title}
              </h3>
              <p className="text-body-md text-on-surface-variant">
                {benefits.large.description}
              </p>
            </div>
          </div>

          {/* Small Cards */}
          {benefits.small.map((item, index) => (
            <div
              key={index}
              className="bg-surface p-6 rounded-2xl shadow-[var(--shadow-card)] border border-surface-variant group hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${item.bgIcon} rounded-xl flex items-center justify-center ${item.textIcon} mb-4`}>
                <item.icon size={20} />
              </div>
              <h3 className="text-label-md text-on-surface mb-2 font-semibold">
                {item.title}
              </h3>
              <p className="text-body-md text-on-surface-variant text-sm">
                {item.description}
              </p>
            </div>
          ))}

          {/* Wide Card - 2 cols */}
          <div className="bg-surface p-6 rounded-2xl shadow-[var(--shadow-card)] md:col-span-2 border border-surface-variant flex items-center gap-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
            <div className={`w-16 h-16 ${benefits.wide.bgIcon} rounded-full flex items-center justify-center ${benefits.wide.textIcon} shrink-0`}>
              <benefits.wide.icon size={24} />
            </div>
            <div>
              <h3 className="text-label-md text-on-surface mb-1 font-semibold">
                {benefits.wide.title}
              </h3>
              <p className="text-body-md text-on-surface-variant text-sm">
                {benefits.wide.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
