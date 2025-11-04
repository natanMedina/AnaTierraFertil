import { Skeleton } from '@/components/ui/skeleton'

export default function InfoDisplaySkeleton() {
  return (
    <div className="w-full flex flex-col md:flex-row bg-white">
      {/* Columna izquierda */}
      <div className="w-full md:w-4/12 px-12 py-10 flex flex-col space-y-6">
        <Skeleton className="h-15 w-3/4 mx-auto" /> {/* título */}
        <Skeleton className="h-1 w-60 mx-auto" /> {/* línea */}
        <Skeleton className="h-full w-full" /> {/* descripción */}
        <Skeleton className="h-6 w-1/3 mt-auto" /> {/* categoría */}
      </div>

      {/* Columna derecha */}
      <div className="w-full md:w-8/12 flex flex-col items-center justify-start p-8">
        <Skeleton className="h-10 w-24 self-end" /> {/* botón volver */}
        <Skeleton className="h-64 w-2/4 rounded-lg mt-12" />{' '}
        {/* imagen/video */}
        <div className="mt-10 flex gap-6">
          {[1].map((i) => (
            <div key={i} className="flex flex-col items-center gap-3 w-60">
              <Skeleton className="h-6 w-2/4" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-10 w-2/4 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
