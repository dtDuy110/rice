/**
 * Format number to Vietnamese Dong (VNĐ)
 * @param {number} price
 * @returns {string} formatted price string
 */
export function formatVND(price) {
  if (price === null || price === undefined) return '0 ₫'
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}
