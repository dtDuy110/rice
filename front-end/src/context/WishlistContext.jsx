import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchWishlist()
    } else {
      setWishlist([])
      setLoading(false)
    }
  }, [user])

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/wishlist')
      if (data.success) {
        setWishlist(data.data.products || [])
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToWishlist = async (product) => {
    if (!user) return false // Require login
    try {
      const { data } = await api.post(`/wishlist/${product._id}`)
      if (data.success) {
        setWishlist(data.data.products)
        return true
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error)
      return false
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      const { data } = await api.delete(`/wishlist/${productId}`)
      if (data.success) {
        setWishlist(data.data.products)
        return true
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      return false
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => 
      (typeof item === 'string' ? item : item._id) === productId
    )
  }

  const toggleWishlist = async (product) => {
    if (isInWishlist(product._id)) {
      return await removeFromWishlist(product._id)
    } else {
      return await addToWishlist(product)
    }
  }

  return (
    <WishlistContext.Provider value={{
      wishlist,
      loading,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
