import { Skeleton } from '@/components/ui/skeleton'

export default function FormSkeleton() {
  return (
    <div className="w-full flex flex-col md:flex-row bg-white">
      {/* Columna izquierda */}
      <div className="w-full md:w-4/12 px-12 py-15 flex flex-col space-y-6">
        <Skeleton className="h-15 w-full mx-auto" /> {/* título */}
        <Skeleton className="h-2 w-60" /> {/* línea */}
        <Skeleton className="h-full w-full" /> {/* descripción */}
        <Skeleton className="h-15 w-full mt-auto" /> {/* categoría */}
      </div>

      {/* Columna derecha */}
      <div className="relative w-full md:w-8/12 flex flex-col items-center p-8">
        <Skeleton className="absolute h-10 w-14 right-6" /> {/* botón volver */}
        <div className="flex gap-10 mt-20">
          <div className="rounded-2xl bg-white p-4 shadow">
            <Skeleton className="h-64 w-60 rounded-lg" />
          </div>
          <div className="rounded-2xl bg-white p-4 shadow">
            <Skeleton className="h-64 w-60 rounded-lg" />
          </div>
        </div>
        {/* imagen/video */}
        <div className="mt-10 flex gap-6">
          {[1].map((i) => (
            <div key={i} className="flex flex-col items-center gap-3 w-60 rounded-2xl bg-white p-4 shadow">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
        </div>
        <Skeleton className="absolute h-10 w-40 bottom-6 right-6" /> {/* botón guardar */}
      </div>
    </div>
  )
}
