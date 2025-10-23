import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-6xl font-bold text-foreground">404</h1>

      <p className="text-muted-foreground text-lg">Página no encontrada</p>

      <Button asChild className="bg-brand">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  )
}
