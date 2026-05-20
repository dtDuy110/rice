import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from './AuthContext'
import { useToast } from './ToastContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { showToast } = useToast()

  // Fetch cart on load or when user logs in
  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCart(null)
    }
  }, [user])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const res = await api.get('/cart')
      if (res.data.success) {
        setCart(res.data.data)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      showToast('Vui lòng đăng nhập để thêm vào giỏ hàng!', 'info')
      return
    }
    try {
      const res = await api.post('/cart/items', { productId, quantity })
      if (res.data.success) {
        setCart(res.data.data)
        showToast('Đã thêm vào giỏ hàng!', 'success')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      showToast('Có lỗi xảy ra khi thêm vào giỏ!', 'error')
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await api.put(`/cart/items/${productId}`, { quantity })
      if (res.data.success) {
        setCart(res.data.data)
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const res = await api.delete(`/cart/items/${productId}`)
      if (res.data.success) {
        setCart(res.data.data)
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  const clearCart = () => {
    setCart(null)
    // Optional: add a real endpoint for this if needed, but the checkout endpoint already clears it
  }

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    fetchCart,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
