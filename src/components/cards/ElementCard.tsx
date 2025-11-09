'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Product } from '@/types/product'
import { Service } from '@/types/service'
import { useRouter } from 'next/navigation'

interface ElementCardProps {
  element: Product | Service
  buttonText?: string
  basePath: string // Ruta base para la navegación (e.g., 'products', 'services')
}

export function ElementCard({
  element,
  basePath,
  buttonText = 'Explorar',
}: ElementCardProps) {
  const router = useRouter()

  const handleExplore = () => {
    router.push(`/${basePath}/${element.id}`)
  }

  return (
    <Card className="overflow-hidden group">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          {element.photo_url ? (
            <img
              src={element.photo_url}
              alt={element.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-brand flex items-center justify-center">
              <span className="text-white text-xl">{element.name}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 text-center h-[120px] flex flex-col">
        <h3 className="text-lg font-bold mb-2">{element.name}</h3>
        <p className="text-gray-600 overflow-hidden line-clamp-2 flex-1">
          {element.description}
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
