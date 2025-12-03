import { Skeleton } from '../ui/skeleton'

export default function SurveySkeleton() {
  return (
    <div className="flex flex-col items-center p-10 gap-8">
      <Skeleton className="h-12 w-1/2" />
      <div className="flex flex-col items-center gap-10">
        <Skeleton className="h-8 w-1/3" />
        <div className="flex gap-10">
          {[0, 1].map((index) => {
            return <Skeleton key={index} className="h-80 w-100" />
          })}
        </div>
      </div>
    </div>
  )
}
