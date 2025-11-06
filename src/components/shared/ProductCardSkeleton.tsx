import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="w-full aspect-square" />
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter className="p-4 pt-0 justify-center">
        <Skeleton className="h-10 w-2/3" />
      </CardFooter>
    </Card>
  )
}
