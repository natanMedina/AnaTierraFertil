'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Product } from '@/types/product'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  product: Product
  buttonText?: string
  basePath?: string // Ruta base para la navegación (e.g., 'products', 'services')
}

export function ProductCard({
  product,
  basePath = 'products',
  buttonText = 'Explorar',
}: ProductCardProps) {
  const router = useRouter()

  const handleExplore = () => {
    router.push(`/${basePath}/${product.id}`)
  }

  return (
    <Card className="overflow-hidden group">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          {product.photo_url ? (
            <img
              src={product.photo_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-brand flex items-center justify-center">
              <span className="text-white text-xl">Imagen</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 text-center h-[120px] flex flex-col">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 overflow-hidden line-clamp-2 flex-1">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 justify-center">
        <Button
          onClick={handleExplore}
          className="bg-brand text-white w-2/3 text-base font-medium hover:opacity-90 transition-opacity"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
