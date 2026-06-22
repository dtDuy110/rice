import { useState, useRef, useEffect } from 'react'
import { Bell, Check, Circle } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'
import { Link } from 'react-router-dom'

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full hover:bg-surface-variant flex items-center justify-center text-on-surface-variant transition-colors relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-surface rounded-2xl shadow-[var(--shadow-dropdown)] border border-outline-variant/30 z-50 overflow-hidden flex flex-col max-h-[80vh]">
          <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
            <h3 className="font-bold text-on-surface">Thông báo</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
              >
                <Check size={14} /> Đánh dấu đã đọc
              </button>
            )}
          </div>
          
          <div className="overflow-y-auto flex-1 p-2">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant flex flex-col items-center gap-2">
                <Bell size={32} className="opacity-20" />
                <p className="text-sm">Bạn chưa có thông báo nào</p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {notifications.map(notification => (
                  <div 
                    key={notification._id}
                    onClick={() => {
                      if (!notification.isRead) markAsRead(notification._id)
                    }}
                    className={`p-3 rounded-xl cursor-pointer transition-colors flex gap-3 items-start ${
                      notification.isRead ? 'hover:bg-surface-variant/50' : 'bg-primary/5 hover:bg-primary/10'
                    }`}
                  >
                    <div className="mt-1">
                      {notification.isRead ? (
                        <Circle size={10} className="text-outline-variant" />
                      ) : (
                        <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm mb-1 ${notification.isRead ? 'text-on-surface-variant' : 'text-on-surface font-semibold'}`}>
                        {notification.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-outline mt-2">
                        {new Date(notification.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
