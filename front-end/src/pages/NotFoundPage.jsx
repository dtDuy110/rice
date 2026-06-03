import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[120px] font-bold text-primary leading-none mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
        404
      </h1>
      <h2 className="text-headline-md text-on-surface mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
        Không tìm thấy trang
      </h2>
      <p className="text-body-md text-on-surface-variant max-w-md mb-8">
        Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg" icon={Home}>
          Về trang chủ
        </Button>
      </Link>
    </div>
  )
}
