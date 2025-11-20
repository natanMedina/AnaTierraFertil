'use client'

import * as React from 'react'
import { Item, ItemMedia, ItemContent } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type NewsItemSkeletonProps = {
  className?: string
}

/**
 * NewsItemSkeleton
 * Versión skeleton del NewsItem mientras se cargan los datos
 */
export function NewsItemSkeleton({ className }: NewsItemSkeletonProps) {
  return (
    <Item
      variant="outline"
      className={cn(
        'bg-white/95 shadow-sm',
        'h-64', // misma altura que NewsItem
        className
      )}
    >
      {/* Skeleton de la imagen rectangular a la izquierda */}
      <ItemMedia
        variant="image"
        className="w-86 h-full rounded-md overflow-hidden"
      >
        <Skeleton className="w-full h-full" />
      </ItemMedia>

      {/* Contenido del lado derecho */}
      <ItemContent className="flex-1 flex flex-col p-6 gap-4">
        {/* Skeleton del título - 2 líneas */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Skeleton de la descripción - múltiples líneas */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </ItemContent>
    </Item>
  )
}
