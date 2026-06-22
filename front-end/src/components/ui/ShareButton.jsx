import { useState } from 'react'
import { Share2, Check, Copy } from 'lucide-react'
import { useToast } from '../../context/ToastContext'

export default function ShareButton({ title, text, url }) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()

  const shareUrl = url || window.location.href

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || document.title,
          text: text || 'Gạo Thành Phát - Hương vị tinh túy từ đồng ruộng',
          url: shareUrl,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      showToast('Đã sao chép liên kết!', 'success')
      setTimeout(() => {
        setCopied(false)
        setIsOpen(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
      showToast('Không thể sao chép liên kết.', 'error')
    }
  }

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400')
    setIsOpen(false)
  }

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title || '')}`, '_blank', 'width=600,height=400')
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button 
        onClick={handleNativeShare}
        className="flex items-center gap-2 text-primary hover:bg-primary/5 px-4 py-2 rounded-xl transition-colors font-semibold"
      >
        <Share2 size={18} /> Chia sẻ
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 bottom-full mb-2 w-48 bg-surface rounded-xl shadow-[var(--shadow-dropdown)] border border-outline-variant/30 overflow-hidden z-50 animate-scale-in origin-bottom-right">
            <button onClick={shareFacebook} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors text-on-surface text-sm">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg> Facebook
            </button>
            <button onClick={shareTwitter} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors text-on-surface text-sm">
              <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg> Twitter
            </button>
            <button onClick={copyToClipboard} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors text-on-surface text-sm border-t border-outline-variant/30">
              {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} className="text-outline" />}
              {copied ? 'Đã sao chép' : 'Sao chép link'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
