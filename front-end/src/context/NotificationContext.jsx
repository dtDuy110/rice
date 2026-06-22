import { createContext, useContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import api from '../services/api'
import { useAuth } from './AuthContext'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [socket, setSocket] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchNotifications()
      
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        withCredentials: true
      })
      
      newSocket.on('connect', () => {
        newSocket.emit('join_user_room', user._id)
      })

      newSocket.on('new_notification', (notification) => {
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
      const { data } = await api.get('/notifications')
      if (data.success) {
        setNotifications(data.data)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  const markAsRead = async (id) => {
    try {
      const { data } = await api.put(`/notifications/${id}/read`)
      if (data.success) {
        setNotifications(prev => 
          prev.map(n => n._id === id ? { ...n, isRead: true } : n)
        )
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const { data } = await api.put('/notifications/read-all')
      if (data.success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      socket
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
