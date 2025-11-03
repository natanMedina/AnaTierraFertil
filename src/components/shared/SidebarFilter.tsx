'use client'

import { Button } from '@/components/ui/button'

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
                className={`w-full justify-start ${
                  selectedCategory === category
                    ? 'bg-brand text-white hover:bg-brand/90'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
