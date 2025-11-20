'use client'

import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
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
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [isTitleTruncated, setIsTitleTruncated] = useState(false)
  const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(false)

  useEffect(() => {
    // Verificar si el título está truncado
    const titleElement = titleRef.current
    if (titleElement) {
      setIsTitleTruncated(titleElement.scrollWidth > titleElement.clientWidth)
    }

    // Verificar si la descripción está truncada
    const descriptionElement = descriptionRef.current
    if (descriptionElement) {
      setIsDescriptionTruncated(
        descriptionElement.scrollHeight > descriptionElement.clientHeight
      )
    }
  }, [element.name, element.description])

  const handleExplore = () => {
    router.push(`/${basePath}/${element.id}`)
  }

  return (
    <Card className="overflow-hidden group">
      <CardHeader className="p-0">
        {/* Fixed image area height so all cards have consistent image size */}
        <div className="relative w-full h-100 overflow-hidden">
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
        {/* Título con truncado y hover condicional */}
        {isTitleTruncated ? (
          <HoverCard openDelay={300}>
            <HoverCardTrigger asChild>
              <h3
                ref={titleRef}
                className="text-lg font-bold mb-2 truncate cursor-help"
              >
                {element.name}
              </h3>
            </HoverCardTrigger>
            <HoverCardContent className="max-w-xs break-words">
              <p className="text-sm font-semibold">{element.name}</p>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <h3 ref={titleRef} className="text-lg font-bold mb-2 truncate">
            {element.name}
          </h3>
        )}

        {/* Descripción con truncado y hover condicional */}
        {isDescriptionTruncated ? (
          <HoverCard openDelay={300}>
            <HoverCardTrigger asChild>
              <p
                ref={descriptionRef}
                className="text-gray-600 overflow-hidden line-clamp-2 flex-1 cursor-help"
              >
                {element.description}
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="max-w-sm break-words">
              <p className="text-sm text-gray-600 leading-relaxed">
                {element.description}
              </p>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <p
            ref={descriptionRef}
            className="text-gray-600 overflow-hidden line-clamp-2 flex-1"
          >
            {element.description}
          </p>
        )}
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
