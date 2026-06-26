import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function UserActivityTracker() {
  const location = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    const trackView = async () => {
      // Bỏ qua các trang admin để không làm lệch số liệu thống kê người dùng thực tế
      if (location.pathname.startsWith('/admin')) return;

      try {
        await api.post('/analytics/track', {
          action: 'PAGE_VIEW',
          details: { path: location.pathname },
          userId: user ? (user._id || user.id) : null
        })
      } catch (error) {
        // Silent catch để không ảnh hưởng trải nghiệm người dùng
        console.debug('Analytics tracking info:', error)
      }
    }

    trackView()
  }, [location.pathname, user])

  return null
}
