'use client'

import * as React from 'react'
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from '@/components/ui/item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type NewsItemProps = {
  title: string
  description: string
  imageUrl?: string
  className?: string
}

/**
 * NewsItem
 * Nuevo diseño:
 * - Imagen rectangular más grande a la izquierda
 * - Título fijo en la parte superior derecha
 * - Descripción con scroll si excede el alto disponible
 */
export function NewsItem({
  title,
  description,
  imageUrl,
  className,
}: NewsItemProps) {
  return (
    <Item
      variant="outline"
      className={cn(
        'bg-white/95 shadow-sm',
        'h-64', // altura fija para el item
        className
      )}
    >
      {/* Imagen rectangular a la izquierda - más grande */}
      <ItemMedia
        variant="image"
        className="w-86 h-full rounded-md overflow-hidden"
      >
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-300">
            Sin imagen
          </div>
        )}
      </ItemMedia>

      {/* Contenido derecho con título fijo y descripción con scroll */}
      <ItemContent className="flex-1 flex flex-col min-w-0 h-full">
        {/* Título fijo arriba */}
        <ItemTitle className="text-xl font-semibold mb-2 flex-shrink-0">
          {title}
        </ItemTitle>

        {/* Descripción con ScrollArea para overflow */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <ItemDescription className="leading-relaxed pr-4 whitespace-normal break-words line-clamp-none">
            {description}
          </ItemDescription>
        </ScrollArea>
      </ItemContent>
    </Item>
  )
}

export default NewsItem
