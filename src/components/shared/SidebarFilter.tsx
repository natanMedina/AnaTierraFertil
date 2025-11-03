'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SidebarFilterProps {
  placeholder?: string
  categories: string[]
  selectedCategory?: string
  onCategorySelect: (category: string) => void
  onSearch: (term: string) => void
}

export function SidebarFilter({
  categories,
  selectedCategory,
  onCategorySelect,
  onSearch,
  placeholder = 'items', // valor por defecto si no se proporciona
}: SidebarFilterProps) {
  return (
    <div className="w-full lg:w-64 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        {/* Buscador */}
        <div className="relative">
          <Input
            type="text"
            placeholder={`Buscar ${placeholder}...`}
            className="w-full pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

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
