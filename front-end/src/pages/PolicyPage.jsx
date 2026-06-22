import Breadcrumbs from '../components/ui/Breadcrumbs'

export default function PolicyPage() {
  return (
    <div className="pt-24 pb-16 px-4 md:px-12 max-w-[800px] mx-auto animate-fade-in min-h-[70vh]">
      <Breadcrumbs />
      
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-on-surface mb-6" style={{ fontFamily: 'var(--font-family-heading)' }}>
          Chính Sách Của Thành Phát
        </h1>
        <p className="text-on-surface-variant text-lg">
          Cam kết bảo vệ quyền lợi khách hàng và đảm bảo chất lượng sản phẩm.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-on-surface-variant 
        prose-headings:font-bold prose-headings:text-on-surface prose-headings:font-heading
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-outline-variant/30 prose-h2:pb-2
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:leading-relaxed prose-p:mb-4
        prose-ul:my-4 prose-li:my-1"
        style={{ '--tw-prose-headings': 'var(--font-family-heading)' }}
      >
        <h2>1. Chính Sách Giao Hàng</h2>
        <p>Chúng tôi luôn nỗ lực để mang những hạt gạo thơm ngon đến tay bạn một cách nhanh chóng và an toàn nhất.</p>
        <ul>
          <li><strong>Khu vực TP.HCM:</strong> Giao hàng trong vòng 24 giờ kể từ khi chốt đơn.</li>
          <li><strong>Các tỉnh thành khác:</strong> Thời gian giao hàng từ 2 - 4 ngày làm việc.</li>
          <li><strong>Phí vận chuyển:</strong> Miễn phí cho đơn hàng từ 500,000đ. Đơn hàng dưới 500,000đ áp dụng phí ship cố định 30,000đ.</li>
        </ul>

        <h2>2. Chính Sách Đổi Trả & Hoàn Tiền</h2>
        <p>Sự hài lòng của bạn là ưu tiên hàng đầu. Thành Phát cam kết chính sách 1 đổi 1 hoặc hoàn tiền trong vòng 7 ngày đối với các trường hợp sau:</p>
        <ul>
          <li>Sản phẩm bị lỗi bao bì, rách, hở móp trong quá trình vận chuyển.</li>
          <li>Gạo bị mốc, có mùi lạ do lỗi bảo quản từ phía nhà sản xuất.</li>
          <li>Giao sai sản phẩm so với đơn đặt hàng.</li>
        </ul>
        <p><em>Lưu ý:</em> Yêu cầu đổi trả chỉ được chấp nhận khi sản phẩm còn nguyên tem mác (nếu có) và chưa qua sử dụng (trừ trường hợp phát hiện mốc/mùi lạ khi mở bao).</p>

        <h2>3. Chính Sách Bảo Mật (Privacy Policy)</h2>
        <p>Chúng tôi tôn trọng và cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng.</p>
        <h3>3.1. Thu thập thông tin</h3>
        <p>Chúng tôi chỉ thu thập các thông tin cần thiết cho việc giao hàng: Tên, Số điện thoại, Địa chỉ giao hàng.</p>
        <h3>3.2. Sử dụng thông tin</h3>
        <p>Thông tin của bạn được sử dụng duy nhất cho mục đích xử lý đơn hàng, hỗ trợ khách hàng và gửi thông báo về các chương trình khuyến mãi (nếu bạn đồng ý).</p>
        <h3>3.3. Cam kết bảo mật</h3>
        <p>Thành Phát cam kết không bán, chia sẻ hay trao đổi thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào khác, ngoại trừ các đơn vị vận chuyển đối tác.</p>
      </div>
    </div>
  )
}
