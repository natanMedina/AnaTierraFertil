'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemDescription,
} from '@/components/ui/item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Pencil, Trash2 } from 'lucide-react'

type NewsItemProps = {
  id: number
  title: string
  description: string
  imageUrl?: string
  date?: string
  className?: string
  showActions?: boolean
  onDeleted?: (id: number) => void
}

/**
 * NewsItem
 * Nuevo diseño:
 * - Imagen rectangular más grande a la izquierda
 * - Título fijo en la parte superior derecha
 * - Descripción con scroll si excede el alto disponible
 */
export function NewsItem({
  id,
  title,
  description,
  imageUrl,
  date,
  className,
  showActions = false,
  onDeleted,
}: NewsItemProps) {
  const router = useRouter()
  // Detectar si el título se truncó a una sola línea para mostrar hover condicional
  const titleRef = React.useRef<HTMLDivElement>(null)
  const [isTitleTruncated, setIsTitleTruncated] = React.useState(false)

  React.useEffect(() => {
    const el = titleRef.current
    if (el) {
      // truncate funciona por ancho; si el contenido real es mayor al ancho disponible, habrá truncado
      setIsTitleTruncated(el.scrollWidth > el.clientWidth)
    }
  }, [title])
  // Formatear la fecha si existe
  // Usar split y crear fecha con componentes locales para evitar problemas de zona horaria
  const formattedDate = date
    ? (() => {
        const [year, month, day] = date.split('-').map(Number)
        const localDate = new Date(year, month - 1, day)
        return localDate.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      })()
    : null
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
        {/* Encabezado con título y fecha */}
        <div className="flex flex-col gap-1 mb-2 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            {isTitleTruncated ? (
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <div
                    ref={titleRef}
                    className="text-xl font-semibold flex-1 min-w-0 truncate cursor-help"
                    data-slot="item-title"
                  >
                    {title}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="max-w-md break-words">
                  <p className="text-sm font-semibold leading-snug">{title}</p>
                </HoverCardContent>
              </HoverCard>
            ) : (
              <div
                ref={titleRef}
                className="text-xl font-semibold flex-1 min-w-0 truncate"
                data-slot="item-title"
              >
                {title}
              </div>
            )}
            <div className="flex items-center gap-2 flex-shrink-0">
              {formattedDate && (
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {formattedDate}
                </span>
              )}
              {showActions && (
                <div className="flex items-center gap-2 ml-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => router.push(`/news/form/${id}`)}
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <ConfirmDialog
                    title="Eliminar noticia"
                    description="Esta acción eliminará la noticia de forma permanente."
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                    onConfirm={async () => {
                      try {
                        const { deleteNews } = require('@/services/news')
                        const ok = await deleteNews(id)
                        if (ok) {
                          onDeleted?.(id)
                          toast.success('Noticia eliminada')
                        } else {
                          toast.error('No se pudo eliminar la noticia')
                        }
                      } catch (err) {
                        console.error(err)
                        toast.error('Error al eliminar la noticia')
                      }
                    }}
                    trigger={
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-7 px-2"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    }
                    icon={<Trash2 className="w-5 h-5 text-red-600" />}
                    iconBg="bg-red-50"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Descripción con ScrollArea para overflow */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <ItemDescription className="leading-relaxed pr-4 break-all whitespace-pre-wrap line-clamp-none">
            {description}
          </ItemDescription>
        </ScrollArea>
      </ItemContent>
    </Item>
  )
}

export default NewsItem
