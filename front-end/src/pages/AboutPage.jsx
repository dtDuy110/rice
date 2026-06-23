import { Leaf, ShieldCheck, HeartHandshake, History } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/images/signin.png" alt="Cánh đồng lúa" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
            Về Thành Phát
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            Hành trình mang hạt gạo tinh túy từ đồng ruộng Việt Nam đến bữa ăn gia đình.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 px-4 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Câu Chuyện Của Chúng Tôi</h2>
            <h3 className="text-on-surface text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Từ Tình Yêu Đất Mẹ
            </h3>
            <p className="text-on-surface-variant text-body-lg mb-6 leading-relaxed">
              Thành Phát khởi nguồn từ một doanh nghiệp gia đình nhỏ với tình yêu mãnh liệt dành cho lúa gạo. Trải qua hơn 2 thập kỷ phát triển, chúng tôi tự hào là cầu nối tin cậy giữa những người nông dân tâm huyết và hàng triệu gia đình.
            </p>
            <p className="text-on-surface-variant text-body-lg mb-8 leading-relaxed">
              Chúng tôi không chỉ bán gạo, chúng tôi trao gửi những giá trị truyền thống, sức khỏe và sự trân trọng đối với nền nông nghiệp Việt Nam. Mỗi hạt gạo Thành Phát là kết tinh của nắng, gió, giọt mồ hôi và quy trình tuyển chọn khắt khe nhất.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-outline-variant/30 pt-8">
              <div>
                <h4 className="text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>20+</h4>
                <p className="text-on-surface-variant text-label-md">Năm Kinh Nghiệm</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>1000+</h4>
                <p className="text-on-surface-variant text-label-md">Nông Trại Đối Tác</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/product-detail-rice.png" alt="Nông dân" className="rounded-2xl w-full h-64 object-cover mt-8 shadow-lg" />
            <img src="/images/jasmine-rice.png" alt="Cánh đồng" className="rounded-2xl w-full h-64 object-cover shadow-lg" />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="px-4 max-w-[1280px] mx-auto text-center">
          <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Giá Trị Cốt Lõi</h2>
          <h3 className="text-on-surface text-3xl md:text-4xl font-bold mb-16" style={{ fontFamily: 'var(--font-family-heading)' }}>
            Cam Kết Từ Thành Phát
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-surface p-8 rounded-3xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf size={32} />
              </div>
              <h4 className="text-on-surface font-bold text-xl mb-3" style={{ fontFamily: 'var(--font-family-heading)' }}>Thuần Tự Nhiên</h4>
              <p className="text-on-surface-variant text-body-md">Sản phẩm hữu cơ, không sử dụng hóa chất độc hại, tôn trọng hệ sinh thái.</p>
            </div>

            <div className="bg-surface p-8 rounded-3xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-on-surface font-bold text-xl mb-3" style={{ fontFamily: 'var(--font-family-heading)' }}>Chất Lượng Vàng</h4>
              <p className="text-on-surface-variant text-body-md">Quy trình kiểm định khắt khe từ khâu gieo trồng đến khi đóng gói.</p>
            </div>

            <div className="bg-surface p-8 rounded-3xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HeartHandshake size={32} />
              </div>
              <h4 className="text-on-surface font-bold text-xl mb-3" style={{ fontFamily: 'var(--font-family-heading)' }}>Công Bằng</h4>
              <p className="text-on-surface-variant text-body-md">Hợp tác bền vững và đảm bảo thu nhập xứng đáng cho người nông dân.</p>
            </div>

            <div className="bg-surface p-8 rounded-3xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <History size={32} />
              </div>
              <h4 className="text-on-surface font-bold text-xl mb-3" style={{ fontFamily: 'var(--font-family-heading)' }}>Gìn Giữ Truyền Thống</h4>
              <p className="text-on-surface-variant text-body-md">Bảo tồn và phát triển các giống gạo đặc sản quý hiếm của Việt Nam.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
