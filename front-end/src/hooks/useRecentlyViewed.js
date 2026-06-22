import { useState, useEffect } from 'react'

const RECENT_KEY = 'rice_recently_viewed'
const MAX_RECENT = 10

export default function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY)
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored))
      } catch (e) {
        console.error('Error parsing recently viewed', e)
      }
    }
  }, [])

  const addRecentlyViewed = (product) => {
    if (!product || !product._id) return

    setRecentlyViewed(prev => {
      // Remove if already exists to move it to the front
      const filtered = prev.filter(p => p._id !== product._id)
      
      const updated = [product, ...filtered].slice(0, MAX_RECENT)
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
      return updated
    })
  }

  return { recentlyViewed, addRecentlyViewed }
}
