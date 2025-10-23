'use client'

import { Construction } from 'lucide-react'

export default function UnderConstruction({ section }: { section: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
      <Construction className="w-12 h-12 text-yellow-500 animate-bounce" />
      <h1 className="text-2xl font-semibold">Sección en construcción 🚧</h1>
      <p className="text-gray-500">
        Estás en la sección{' '}
        <span className="font-medium text-gray-700">{section}</span>. Pronto
        estará disponible.
      </p>
    </div>
  )
}
