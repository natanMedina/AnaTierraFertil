'use client'

import { useState, useEffect } from 'react'
import { getServices } from '@/services/services'
import { Service } from '@/types/service'
import { SidebarFilter } from '@/components/shared/SidebarFilter'
import { ProductCard } from '@/components/shared/ProductCard'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    const data = await getServices()
    setServices(data)
  }

  const categories = [...new Set(services.map((service) => service.category))]

  // Filtrar productos según la categoría y término de búsqueda
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      !selectedCategory || service.category === selectedCategory
    const matchesSearch =
      !searchTerm ||
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    // {editMode && (
    //     <div className="text-center text-brand font-bold">
    //       Edición habilitada
    //     </div>
    //   )}
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100/50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar con filtros */}
          <aside className="lg:w-64 flex-shrink-0">
            <SidebarFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              onSearch={setSearchTerm}
            />
          </aside>

          {/* Grid de productos */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ProductCard key={service.id} product={service} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
