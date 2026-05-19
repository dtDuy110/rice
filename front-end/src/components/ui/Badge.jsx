const badgeStyles = {
  bestseller: 'bg-surface/90 text-primary backdrop-blur-sm',
  organic: 'bg-primary/90 text-on-primary backdrop-blur-sm',
  'fair-trade': 'bg-tertiary-container/90 text-on-tertiary-container backdrop-blur-sm',
  'whole-grain': 'bg-tertiary-container/90 text-on-tertiary-container backdrop-blur-sm',
  'in-stock': 'bg-primary-container/90 text-on-primary-container backdrop-blur-sm',
  active: 'bg-primary-fixed/30 text-primary',
  draft: 'bg-surface-container-high text-on-surface-variant',
  success: 'bg-primary-fixed/30 text-primary',
  pending: 'bg-secondary-fixed/30 text-secondary',
  processing: 'bg-secondary-fixed/40 text-on-secondary-fixed-variant',
  delivery: 'bg-tertiary-fixed/30 text-tertiary',
  delivered: 'bg-primary-fixed/30 text-primary',
  cancelled: 'bg-error-container/50 text-on-error-container',
}

export default function Badge({ type = 'bestseller', children, className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-label-sm font-medium shadow-sm
        ${badgeStyles[type] || badgeStyles.bestseller} ${className}
      `}
    >
      {children}
    </span>
  )
}
