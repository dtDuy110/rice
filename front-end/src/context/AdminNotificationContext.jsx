import { createContext, useContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import api from '../services/api'
import { useAuth } from './AuthContext'

const AdminNotificationContext = createContext()

export function AdminNotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [socket, setSocket] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchNotifications()
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const socketUrl = apiUrl.endsWith('/api') ? apiUrl.replace('/api', '') : apiUrl
      
      const newSocket = io(socketUrl, {
        withCredentials: true
      })
      
      newSocket.on('connect', () => {
        newSocket.emit('join_admin_room')
      })

      newSocket.on('new_admin_notification', (notification) => {
        setNotifications(prev => [notification, ...prev])
      })

      setSocket(newSocket)

      return () => newSocket.close()
    } else {
      setNotifications([])
      if (socket) socket.close()
    }
  }, [user])

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.isRead).length)
  }, [notifications])

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/admin/notifications')
      if (data.success) {
        setNotifications(data.data)
      }
    } catch (error) {
      console.error('Error fetching admin notifications:', error)
    }
  }

  const markAsRead = async (id) => {
    try {
      const { data } = await api.put(`/admin/notifications/${id}/read`)
      if (data.success) {
        setNotifications(prev => 
          prev.map(n => n._id === id ? { ...n, isRead: true } : n)
        )
      }
    } catch (error) {
      console.error('Error marking admin notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const { data } = await api.put('/admin/notifications/read-all')
      if (data.success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
      }
    } catch (error) {
      console.error('Error marking all admin notifications as read:', error)
    }
  }

  return (
    <AdminNotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      socket
    }}>
      {children}
    </AdminNotificationContext.Provider>
  )
}

export const useAdminNotification = () => useContext(AdminNotificationContext)
