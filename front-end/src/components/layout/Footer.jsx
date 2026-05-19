import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 px-4 md:px-12 py-16 md:py-20 max-w-[1280px] mx-auto">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link
            to="/"
            className="text-headline-lg text-primary mb-4 block"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            Thành Phát
          </Link>
          <p className="text-body-md text-on-surface-variant max-w-sm">
            © 2024 Thành Phát. Tận hưởng hương vị tinh túy từ những cánh đồng màu mỡ nhất.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-label-md text-on-surface font-bold mb-4">Khám phá</h4>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4">
                Chứng nhận hữu cơ
              </a>
            </li>
            <li>
              <a href="#" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4">
                Báo cáo bền vững
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-label-md text-on-surface font-bold mb-4">Pháp lý</h4>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="#" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4">
                Liên hệ đại lý
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
