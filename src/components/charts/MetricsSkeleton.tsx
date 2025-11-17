import { Skeleton } from '@/components/ui/skeleton'

export default function MetricsSkeleton() {
  return (
    <div className="flex flex-col p-10 gap-7">
      {/* Header */}
      <div className="flex flex-row gap-15 justify-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-3 w-1/4 rounded-2xl bg-white p-7 shadow"
          >
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
      <div className="flex flex-col rounded-2xl bg-white p-7 shadow gap-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-40 rounded-lg" />
            <Skeleton className="h-6 w-70 rounded-lg" />
            <Skeleton className="h-6 w-20 rounded-lg" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-8 w-28 rounded-lg" />
            <Skeleton className="h-8 w-28 rounded-lg" />
            <Skeleton className="h-8 w-28 rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
      <div className="flex flex-col rounded-2xl bg-white p-7 shadow gap-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-40 rounded-lg" />
            <Skeleton className="h-6 w-70 rounded-lg" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-8 w-28 rounded-lg" />
            <Skeleton className="h-8 w-28 rounded-lg" />
            <Skeleton className="h-8 w-28 rounded-lg" />
          </div>
        </div>
        <Skeleton className="flex mx-auto h-96 w-1/2 rounded-lg" />
      </div>
    </div>
  )
}
