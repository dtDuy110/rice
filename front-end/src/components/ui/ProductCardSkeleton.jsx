export default function ProductCardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl p-4 border border-outline-variant/30 animate-pulse">
      <div className="w-full aspect-square bg-surface-container-high rounded-xl mb-4"></div>
      <div className="h-5 bg-surface-container-high rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-surface-container-high rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-end mt-auto pt-4">
        <div>
          <div className="h-3 bg-surface-container-high rounded w-16 mb-2"></div>
          <div className="h-5 bg-surface-container-high rounded w-24"></div>
        </div>
        <div className="w-10 h-10 bg-surface-container-high rounded-full"></div>
      </div>
    </div>
  )
}
