'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface SidebarFilterProps {
  title?: string
  categories: string[]
  selectedCategory?: string
  onCategorySelect: (category: string) => void
}

export function SidebarFilter({
  title,
  categories,
  selectedCategory,
  onCategorySelect,
}: SidebarFilterProps) {
  return (
    <div className="w-full lg:w-64 bg-white p-6 rounded-lg shadow-sm">
      {/* Título del Sidebar */}
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      <div className="space-y-4">
        {/* Categorías */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Categorías
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'ghost'}
                // allow wrapping and variable height so long names don't overflow/overlap
                className={`w-full flex items-start justify-between px-3 h-auto py-2 whitespace-normal ${
                  selectedCategory === category
                    ? 'bg-brand text-white hover:bg-brand/90'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onCategorySelect(category)}
              >
                <span className="text-left break-words whitespace-normal">
                  {category}
                </span>

                {/* Mostrar una pequeña 'x' para deseleccionar cuando la categoría está activa */}
                {selectedCategory === category && (
                  <span
                    role="button"
                    aria-label={`Deseleccionar ${category}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onCategorySelect('')
                    }}
                    className="ml-2 flex items-center justify-center p-1 rounded-full hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
