export default function ProductDetailSkeleton() {
  return (
    <div className="py-12 px-4 md:px-12 max-w-[1280px] mx-auto animate-pulse">
      <div className="h-4 bg-surface-container-high rounded w-64 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
        <div className="space-y-4">
          <div className="aspect-square bg-surface-container-high rounded-3xl"></div>
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-surface-container-high rounded-xl"></div>
            <div className="w-20 h-20 bg-surface-container-high rounded-xl"></div>
            <div className="w-20 h-20 bg-surface-container-high rounded-xl"></div>
          </div>
        </div>
        <div>
          <div className="h-10 bg-surface-container-high rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-surface-container-high rounded w-32 mb-6"></div>
          <div className="h-12 bg-surface-container-high rounded w-1/3 mb-8"></div>
          <div className="space-y-2 mb-8">
            <div className="h-4 bg-surface-container-high rounded w-full"></div>
            <div className="h-4 bg-surface-container-high rounded w-full"></div>
            <div className="h-4 bg-surface-container-high rounded w-2/3"></div>
          </div>
          <div className="flex gap-4 mb-8">
            <div className="w-32 h-12 bg-surface-container-high rounded-xl"></div>
            <div className="flex-1 h-12 bg-surface-container-high rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
