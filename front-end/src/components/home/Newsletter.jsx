import useScrollAnimation from '../../hooks/useScrollAnimation'

export default function Newsletter() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section className="py-16 md:py-20 px-4 md:px-12 max-w-[1280px] mx-auto">
      <div
        ref={ref}
        className={`bg-surface-dim rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 border border-outline-variant/30 relative overflow-hidden transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Decorative blur */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Left Content */}
        <div className="max-w-xl relative z-10">
          <h2
            className="text-headline-lg text-on-surface mb-4"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            Tham gia CLB Thu Hoạch
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Đăng ký nhận bản tin của chúng tôi để nhận các ưu đãi độc quyền, công thức nấu ăn và những câu chuyện từ cánh đồng. Không có tin nhắn rác, chỉ có những điều tốt lành.
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full max-w-md relative z-10">
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Địa chỉ email của bạn"
              className="flex-1 bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary text-label-md font-semibold px-6 py-3 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-colors whitespace-nowrap shadow-sm"
            >
              Đăng ký
            </button>
          </form>
          <p className="text-label-sm text-outline mt-3">
            Bằng cách đăng ký, bạn đồng ý với Chính sách bảo mật của chúng tôi.
          </p>
        </div>
      </div>
    </section>
  )
}
