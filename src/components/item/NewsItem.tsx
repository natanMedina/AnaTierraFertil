'use client'

import * as React from 'react'
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from '@/components/ui/item'
import { cn } from '@/lib/utils'

type NewsItemProps = {
  title: string
  description: string
  imageUrl?: string
  className?: string
}

/**
 * NewsItem
 * Estructura basada en el diseño adjunto:
 * - Imagen cuadrada a la izquierda
 * - Título y descripción a la derecha
 * - Tarjeta con borde suave y fondo claro
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
        'bg-white/95 border-primary/10 shadow-sm',
        'rounded-md',
        className
      )}
    >
      {/* Media izquierda */}
      <ItemMedia variant="image" className="size-24 rounded-md overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className="size-full bg-gray-300" aria-hidden />
        )}
      </ItemMedia>

      {/* Contenido derecho */}
      <ItemContent className="min-w-0">
        <ItemTitle className="text-lg font-semibold text-foreground">
          {title}
        </ItemTitle>
        <ItemDescription className="text-muted-foreground leading-relaxed line-clamp-none">
          {description}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}

export default NewsItem
