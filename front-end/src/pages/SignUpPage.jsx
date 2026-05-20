import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')

    if (password !== confirmPassword) {
      setLocalError('Mật khẩu xác nhận không khớp')
      return
    }
    if (password.length < 6) {
      setLocalError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', { name, email, password })
      if (data.success) {
        // Auto login after registration
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data))
        window.location.href = '/'
      }
    } catch (err) {
      setLocalError(err.response?.data?.error || 'Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="/images/signin-bg.png" alt="Cánh đồng lúa" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
          </div>
          <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-family-heading)' }}>Thành Phát</span>
        </div>
        <div className="absolute bottom-12 left-8 right-8">
          <h2 className="text-white text-4xl font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
            Tham gia cộng đồng yêu gạo Việt.
          </h2>
          <p className="text-white/80 text-body-lg">
            Đăng ký để nhận ưu đãi đặc biệt và trải nghiệm mua sắm tốt nhất.
          </p>
        </div>
      </div>

      {/* Right - Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-surface-container-lowest p-8">
        <div className="w-full max-w-md animate-fade-in">
          <h1 className="text-on-surface mb-2" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '32px', fontWeight: 700 }}>
            Tạo tài khoản mới
          </h1>
          <p className="text-body-md text-on-surface-variant mb-8">
            Vui lòng nhập thông tin để đăng ký.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {localError && (
              <div className="p-3 bg-error/10 text-error text-body-md rounded-xl border border-error/20">
                {localError}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="text-label-md text-on-surface font-semibold mb-2 block">Họ và tên</label>
              <div className="relative">
                <UserPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Nhập họ và tên"
                  className="w-full bg-surface border border-outline-variant/50 rounded-xl pl-11 pr-4 py-3 text-body-md placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-label-md text-on-surface font-semibold mb-2 block">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Nhập email của bạn"
                  className="w-full bg-surface border border-outline-variant/50 rounded-xl pl-11 pr-4 py-3 text-body-md placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-label-md text-on-surface font-semibold mb-2 block">Mật khẩu</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full bg-surface border border-outline-variant/50 rounded-xl pl-11 pr-12 py-3 text-body-md placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-label-md text-on-surface font-semibold mb-2 block">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Nhập lại mật khẩu"
                  className="w-full bg-surface border border-outline-variant/50 rounded-xl pl-11 pr-4 py-3 text-body-md placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'Tạo tài khoản'}
            </Button>
          </form>

          <p className="text-center text-body-md text-on-surface-variant mt-6">
            Đã có tài khoản?{' '}
            <Link to="/dang-nhap" className="text-on-surface font-semibold hover:text-primary transition-colors">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
