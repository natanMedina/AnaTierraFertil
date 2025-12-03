'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/services/products'
import { Product } from '@/types/product'
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
import { useCreateVisit } from '@/hooks/useRecordVisit'
import { getProductCategories } from '@/services/categoriesProducts'
import { Category } from '@/types/category'

export default function ProductsPage(categoryParam?: string) {
  useCreateVisit()
  const { isAdmin, editMode } = useAdmin()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const productsPerPage = 6

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getProductCategories()
      if (data) {
        setCategories(data)
      }
    }
    const fetchProducts = async () => {
      const data = await getProducts()
      if (data) {
        setProducts(data)
      }
    }

    const loadData = async () => {
      await fetchCategories()
      await fetchProducts()
      setIsLoading(false)
    }

    loadData()
  }, [])

  useEffect(() => {
    const setCategory = () => {
      if (!categoryParam) return
      const category = decodeURIComponent(categoryParam)
      if (categories.find((c) => c.name === category))
        setSelectedCategory(category)
    }
    setCategory()
  }, [categories])

  useEffect(() => {
    // Resetear a la primera página cuando cambian los filtros
    setCurrentPage(1)
  }, [selectedCategory, searchTerm])

  // Filtrar productos según la categoría y término de búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory ||
      product.category_fk ===
        categories.find((c) => c.name === selectedCategory)!.id
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Calcular paginación sobre los productos filtrados
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  )

  // Generar array de números de página
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/products_bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar con filtros */}
          <aside className="lg:w-64 flex-shrink-0">
            {isLoading ? (
              <SidebarFilterSkeleton />
            ) : (
              <SidebarFilter
                title="Productos"
                categories={categories.map((c) => c.name)}
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
                placeholder="Buscar productos..."
                onSearch={setSearchTerm}
              />
              {/* Botón añadir */}
              {isAdmin && editMode && (
                <Button
                  variant="admin"
                  onClick={() => router.replace('/products/form')}
                >
                  Añadir
                  <CirclePlus className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                // Mostrar 6 skeletons durante la carga
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : filteredProducts.length === 0 ? (
                <p className="text-center text-black bg-white rounded-lg py-8 px-6 ml-80 w-full">
                  No se encontraron productos.
                </p>
              ) : (
                paginatedProducts.map((product) => (
                  <ElementCard
                    key={product.id}
                    element={product}
                    basePath="products"
                  />
                ))
              )}
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
