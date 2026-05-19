import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage = 1, totalPages = 3, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-xl border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange?.(page)}
          className={`w-10 h-10 rounded-xl text-label-md font-semibold transition-all duration-200 ${
            page === currentPage
              ? 'bg-primary text-on-primary shadow-sm'
              : 'border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
          }`}
        >
          {page}
        </button>
      ))}

      {totalPages > 3 && (
        <span className="text-on-surface-variant px-1">...</span>
      )}

      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-xl border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
