import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import Button from '../components/ui/Button'

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24 px-4 max-w-[1280px] mx-auto animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Liên Hệ</h2>
        <h1 className="text-on-surface text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-family-heading)' }}>
          Lắng Nghe Bạn
        </h1>
        <p className="text-on-surface-variant text-body-lg">
          Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn về sản phẩm, chính sách mua hàng và cơ hội hợp tác.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-surface rounded-3xl p-8 shadow-[var(--shadow-card)] border border-surface-variant">
            <h3 className="text-2xl font-bold text-on-surface mb-6" style={{ fontFamily: 'var(--font-family-heading)' }}>Thông Tin Liên Hệ</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-label-lg font-bold text-on-surface mb-1">Địa chỉ cửa hàng</h4>
                  <p className="text-on-surface-variant text-body-md">123 Đường Lúa Gạo, Phường Nông Nghiệp, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-label-lg font-bold text-on-surface mb-1">Số điện thoại</h4>
                  <p className="text-on-surface-variant text-body-md">Hotline: 1900 1234 (8:00 - 20:00)</p>
                  <p className="text-on-surface-variant text-body-md">Zalo: 0901 234 567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-label-lg font-bold text-on-surface mb-1">Email</h4>
                  <p className="text-on-surface-variant text-body-md">contact@thanhphat.vn</p>
                  <p className="text-on-surface-variant text-body-md">support@thanhphat.vn</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-label-lg font-bold text-on-surface mb-1">Giờ mở cửa</h4>
                  <p className="text-on-surface-variant text-body-md">Thứ 2 - Thứ 7: 8:00 - 20:00</p>
                  <p className="text-on-surface-variant text-body-md">Chủ nhật: 9:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="bg-surface-container-high rounded-3xl h-[300px] w-full overflow-hidden relative shadow-[var(--shadow-card)] border border-surface-variant">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.317502755531!2d106.69741511526017!3d10.786937692314545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f360ebc64b5%3A0xc3c530262c5c9944!2zQ2jhu6MgQuG6v24gVGjDoG5o!5e0!3m2!1svi!2s!4v1689233633010!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ Thành Phát"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-surface rounded-3xl p-8 lg:p-12 shadow-[var(--shadow-card)] border border-surface-variant">
          <h3 className="text-3xl font-bold text-on-surface mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>Gửi Lời Nhắn</h3>
          <p className="text-on-surface-variant text-body-md mb-8">Vui lòng điền thông tin, chúng tôi sẽ phản hồi trong vòng 24h.</p>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã liên hệ! Tính năng gửi email sẽ được cập nhật sớm.'); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-label-md text-on-surface font-semibold mb-2">Họ và tên *</label>
                <input required type="text" placeholder="Nguyễn Văn A" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div>
                <label className="block text-label-md text-on-surface font-semibold mb-2">Số điện thoại *</label>
                <input required type="tel" placeholder="0901 234 567" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-label-md text-on-surface font-semibold mb-2">Email</label>
              <input type="email" placeholder="example@email.com" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>

            <div>
              <label className="block text-label-md text-on-surface font-semibold mb-2">Chủ đề *</label>
              <select required className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                <option value="">Chọn chủ đề...</option>
                <option value="buy">Tư vấn mua hàng</option>
                <option value="wholesale">Khách sỉ / Đại lý</option>
                <option value="complaint">Góp ý / Khiếu nại</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-label-md text-on-surface font-semibold mb-2">Nội dung *</label>
              <textarea required rows="5" placeholder="Nhập lời nhắn của bạn..." className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"></textarea>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" icon={Send}>
              Gửi Tin Nhắn
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
