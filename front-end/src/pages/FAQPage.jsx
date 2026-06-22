import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import Breadcrumbs from '../components/ui/Breadcrumbs'

const faqs = [
  {
    category: "Đặt hàng & Giao hàng",
    items: [
      { q: "Thời gian giao hàng là bao lâu?", a: "Với khu vực TP.HCM, chúng tôi giao hàng trong vòng 24h. Các tỉnh thành khác thời gian giao hàng từ 2-4 ngày làm việc tùy khu vực." },
      { q: "Tôi có được kiểm tra hàng trước khi thanh toán không?", a: "Có. Bạn hoàn toàn có quyền kiểm tra bao bì, nhãn mác và khối lượng trước khi thanh toán cho nhân viên giao hàng." },
      { q: "Phí vận chuyển được tính thế nào?", a: "Miễn phí vận chuyển cho đơn hàng từ 500,000đ. Đơn hàng dưới 500,000đ sẽ có phí ship cố định là 30,000đ trên toàn quốc." }
    ]
  },
  {
    category: "Sản phẩm",
    items: [
      { q: "Gạo của Thành Phát có đạt chuẩn hữu cơ không?", a: "Các dòng sản phẩm có gắn tag 'Hữu cơ' (như Gạo Lứt Đỏ, Gạo Jasmine Đặc Sản) đều có giấy chứng nhận hữu cơ quốc tế. Bạn có thể xem chứng nhận tại trang chi tiết sản phẩm." },
      { q: "Cách bảo quản gạo tốt nhất?", a: "Bạn nên để gạo trong thùng kín, đặt ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Không để gần hóa chất hoặc nơi có độ ẩm cao." }
    ]
  },
  {
    category: "Đổi trả & Hoàn tiền",
    items: [
      { q: "Chính sách đổi trả của công ty ra sao?", a: "Thành Phát cam kết 1 đổi 1 trong vòng 7 ngày nếu sản phẩm bị rách bao bì, ẩm mốc do lỗi của nhà sản xuất hoặc quá trình vận chuyển." }
    ]
  }
]

export default function FAQPage() {
  const [openItem, setOpenItem] = useState('0-0')

  return (
    <div className="pt-24 pb-16 px-4 md:px-12 max-w-[1000px] mx-auto animate-fade-in min-h-[70vh]">
      <Breadcrumbs />
      
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
          Câu Hỏi Thường Gặp
        </h1>
        <p className="text-on-surface-variant text-lg">
          Giải đáp nhanh các thắc mắc phổ biến của khách hàng.
        </p>
      </div>

      <div className="space-y-12">
        {faqs.map((section, sIndex) => (
          <div key={section.category}>
            <h2 className="text-2xl font-bold text-on-surface mb-6 border-b border-outline-variant/30 pb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.items.map((item, iIndex) => {
                const id = `${sIndex}-${iIndex}`
                const isOpen = openItem === id
                return (
                  <div key={id} className={`bg-surface border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary shadow-sm' : 'border-outline-variant/50 hover:border-outline-variant'}`}>
                    <button
                      onClick={() => setOpenItem(isOpen ? null : id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className={`font-semibold text-lg ${isOpen ? 'text-primary' : 'text-on-surface'}`}>{item.q}</span>
                      <ChevronDown size={20} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-outline'}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-5 pt-0 text-body-md text-on-surface-variant leading-relaxed">
                        {item.a}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
