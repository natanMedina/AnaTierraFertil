import { Skeleton } from '@/components/ui/skeleton'

export function SidebarFilterSkeleton() {
  return (
    <div className="w-full lg:w-64 bg-white p-6 rounded-lg shadow-sm">
      {/* Título */}
      <Skeleton className="h-8 w-3/4 mb-6" />

      {/* Categorías */}
      <div className="mt-6 space-y-4">
        <Skeleton className="h-6 w-2/3" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
