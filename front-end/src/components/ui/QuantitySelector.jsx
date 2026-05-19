import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ value = 1, onChange, min = 1, max = 99 }) {
  return (
    <div className="inline-flex items-center border border-outline-variant rounded-xl overflow-hidden">
      <button
        onClick={() => onChange?.(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40"
      >
        <Minus size={16} />
      </button>
      <span className="w-10 h-10 flex items-center justify-center text-body-md font-medium text-on-surface border-x border-outline-variant">
        {value}
      </span>
      <button
        onClick={() => onChange?.(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
