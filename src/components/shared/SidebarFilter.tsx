'use client'

import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { X } from 'lucide-react'

interface SidebarFilterProps {
  title?: string
  categories: string[]
  selectedCategory?: string
  onCategorySelect: (category: string) => void
}

function CategoryButton({
  category,
  isSelected,
  onSelect,
  onDeselect,
}: {
  category: string
  isSelected: boolean
  onSelect: () => void
  onDeselect: () => void
}) {
  const textRef = useRef<HTMLSpanElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    const element = textRef.current
    if (element) {
      setIsTruncated(element.scrollWidth > element.clientWidth)
    }
  }, [category])

  const button = (
    <Button
      variant={isSelected ? 'default' : 'ghost'}
      className={`w-full flex items-center justify-between px-3 h-auto py-2 ${
        isSelected
          ? 'bg-brand text-white hover:bg-brand/90'
          : 'hover:bg-gray-100'
      }`}
      onClick={onSelect}
    >
      <span ref={textRef} className="text-left truncate flex-1">
        {category}
      </span>

      {isSelected && (
        <span
          role="button"
          aria-label={`Deseleccionar ${category}`}
          onClick={(e) => {
            e.stopPropagation()
            onDeselect()
          }}
          className="ml-2 flex items-center justify-center p-1 rounded-full hover:bg-white/10 cursor-pointer flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </span>
      )}
    </Button>
  )

  if (!isTruncated) {
    return button
  }

  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>{button}</HoverCardTrigger>
      <HoverCardContent side="right" className="max-w-xs break-words">
        <p className="text-sm">{category}</p>
      </HoverCardContent>
    </HoverCard>
  )
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
              <CategoryButton
                key={category}
                category={category}
                isSelected={selectedCategory === category}
                onSelect={() => onCategorySelect(category)}
                onDeselect={() => onCategorySelect('')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
