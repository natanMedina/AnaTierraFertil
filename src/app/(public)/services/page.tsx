'use client'

import { useState, useEffect } from 'react'
import { getServices } from '@/services/services'
import { Service } from '@/types/service'
import { SidebarFilter } from '@/components/shared/SidebarFilter'
import { ElementCard } from '@/components/cards/ElementCard'
import { Search } from '@/components/shared/Search'
import { ProductCardSkeleton } from '@/components/cards/ElementCardSkeleton'
import { SidebarFilterSkeleton } from '@/components/shared/SidebarFilterSkeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/context/AdminContext'
import { CirclePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ServicesPage() {
  const { editMode } = useAdmin()
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const servicesPerPage = 6

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    // Resetear a la primera página cuando cambian los filtros
    setCurrentPage(1)
  }, [selectedCategory, searchTerm])

  async function fetchServices() {
    try {
      const data = await getServices()
      setServices(data)
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [...new Set(services.map((service) => service.category))]

  // Filtrar servicios según la categoría y término de búsqueda
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      !selectedCategory || service.category === selectedCategory
    const matchesSearch =
      !searchTerm ||
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Calcular paginación sobre los servicios filtrados
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage)
  const startIndex = (currentPage - 1) * servicesPerPage
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + servicesPerPage
  )

  // Generar array de números de página
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

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
            {isLoading ? (
              <SidebarFilterSkeleton />
            ) : (
              <SidebarFilter
                title="Servicios"
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            )}
          </aside>

          {/* Contenido principal */}
          <main className="flex-1">
            {/* Buscador en la parte superior */}
            <div className="mb-6 flex justify-end gap-10">
              <Search
                placeholder="Buscar servicios..."
                onSearch={setSearchTerm}
              />
              {/* Botón añadir */}
              {editMode && (
                <Button
                  variant="admin"
                  onClick={() => router.replace('/services/form')}
                >
                  Añadir
                  <CirclePlus className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Grid de servicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? // Mostrar 6 skeletons durante la carga
                  Array.from({ length: 6 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                : paginatedServices.map((service) => (
                    <ElementCard
                      key={service.id}
                      element={service}
                      basePath="services"
                      buttonText="Explorar"
                    />
                  ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination className="select-none">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((curr) => Math.max(1, curr - 1))
                        }
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : ''
                        }
                      />
                    </PaginationItem>

                    {pageNumbers.map((pageNumber) => (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNumber)}
                          isActive={pageNumber === currentPage}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((curr) =>
                            Math.min(totalPages, curr + 1)
                          )
                        }
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : ''
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
