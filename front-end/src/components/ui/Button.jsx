const variants = {
  primary:
    'bg-primary text-on-primary hover:-translate-y-0.5 hover:shadow-[0px_8px_30px_rgba(47,93,80,0.2)]',
  secondary:
    'bg-transparent text-primary border-2 border-primary hover:-translate-y-0.5 hover:bg-primary/5',
  ghost:
    'bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface',
  danger:
    'bg-error text-on-error hover:-translate-y-0.5 hover:shadow-[0px_8px_30px_rgba(186,26,26,0.2)]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-label-md',
  lg: 'px-8 py-4 text-label-md',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-all duration-300 cursor-pointer whitespace-nowrap
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} />}
    </button>
  )
}
