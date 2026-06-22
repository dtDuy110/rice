import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, AlertCircle, Copy, Check, Clock, ChevronLeft } from 'lucide-react'
import api from '../services/api'
import { useNotification } from '../context/NotificationContext'
import { formatVND } from '../utils/formatCurrency'

export default function OrderPaymentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const { socket } = useNotification()

  const accountNumber = '0825383233'
  const bankName = 'MB'

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchOrder()
  }, [id])

  useEffect(() => {
    if (socket) {
      const handlePaymentSuccess = (data) => {
        if (data.orderId === id) {
          setPaymentSuccess(true)
          setTimeout(() => {
            navigate('/tai-khoan?tab=orders')
          }, 5000)
        }
      }
      socket.on('payment_success', handlePaymentSuccess)
      return () => socket.off('payment_success', handlePaymentSuccess)
    }
  }, [socket, id, navigate])

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`)
      if (data.success) {
        setOrder(data.data)
        if (data.data.isPaid) {
          setPaymentSuccess(true)
          setTimeout(() => {
            navigate('/tai-khoan?tab=orders')
          }, 5000)
        }
      }
    } catch (err) {
      setError('Không tìm thấy đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return <div className="pt-32 pb-16 min-h-[60vh] flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" /></div>
  if (error || !order) return <div className="pt-32 pb-16 text-center text-error text-xl font-bold">{error || 'Lỗi tải đơn hàng'}</div>

  if (paymentSuccess) {
    return (
      <div className="pt-32 pb-16 px-4 min-h-[70vh] flex flex-col items-center justify-center animate-fade-in">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-scale-in">
          <CheckCircle size={48} className="text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-4 text-center" style={{ fontFamily: 'var(--font-family-heading)' }}>
          Cảm ơn bạn đã mua hàng!
        </h1>
        <p className="text-on-surface-variant text-body-lg text-center max-w-md mb-8">
          Thanh toán thành công. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.
        </p>
        <p className="text-on-surface-variant text-sm flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
          Tự động chuyển về quản lý đơn hàng sau vài giây...
        </p>
      </div>
    )
  }

  const qrUrl = `https://qr.sepay.vn/img?acc=${accountNumber}&bank=${bankName}&amount=${order.totalAmount}&des=${order.orderNumber}`

  return (
    <div className="pt-24 pb-16 px-4 md:px-12 max-w-[800px] mx-auto animate-fade-in min-h-[70vh]">
      <button onClick={() => navigate('/tai-khoan?tab=orders')} className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium mb-6">
        <ChevronLeft size={16} /> Quay lại quản lý đơn hàng
      </button>

      <div className="bg-surface rounded-3xl p-6 md:p-10 border border-surface-variant shadow-[var(--shadow-elevated)] text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
          Thanh toán chuyển khoản
        </h1>
        <p className="text-on-surface-variant mb-8 text-body-md">
          Mở ứng dụng ngân hàng và quét mã QR bên dưới để thanh toán. Đơn hàng sẽ tự động xác nhận sau khi bạn chuyển khoản thành công.
        </p>

        <div className="bg-surface-container-low rounded-2xl p-6 mb-8 inline-block shadow-sm">
          <img src={qrUrl} alt="VietQR" className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-xl object-contain bg-white p-2" />
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-left max-w-md mx-auto space-y-4">
          <div className="flex justify-between items-center border-b border-primary/10 pb-3">
            <span className="text-on-surface-variant text-sm">Ngân hàng:</span>
            <span className="font-bold text-on-surface">MB Bank</span>
          </div>
          <div className="flex justify-between items-center border-b border-primary/10 pb-3">
            <span className="text-on-surface-variant text-sm">Số tài khoản:</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-on-surface text-lg tracking-wider">{accountNumber}</span>
              <button onClick={() => copyToClipboard(accountNumber)} className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-primary/10 pb-3">
            <span className="text-on-surface-variant text-sm">Số tiền:</span>
            <span className="font-bold text-primary text-xl">{formatVND(order.totalAmount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-sm">Nội dung chuyển khoản:</span>
            <span className="font-bold text-error text-lg tracking-wider bg-error/10 px-3 py-1 rounded-lg text-center min-w-[120px]">
              {order.orderNumber}
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-on-surface-variant text-sm">
          <Clock className="animate-spin" size={16} /> Đang chờ hệ thống ghi nhận thanh toán...
        </div>
      </div>
    </div>
  )
}
