'use client'

import { Input } from '@/components/ui/input'
import { Search as SearchIcon } from 'lucide-react'

interface SearchProps {
  placeholder?: string
  onSearch: (value: string) => void
}

export function Search({ placeholder = 'Buscar...', onSearch }: SearchProps) {
  return (
    <div className="relative w-72">
      <Input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 bg-white"
        onChange={(e) => onSearch(e.target.value)}
      />
      <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  )
}
