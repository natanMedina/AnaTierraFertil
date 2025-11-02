'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/services/products'
import { Product } from '@/types/product'
import { SidebarFilter } from '@/components/shared/SidebarFilter'
import { ProductCard } from '@/components/shared/ProductCard'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    // Resetear a la primera página cuando cambian los filtros
    setCurrentPage(1)
  }, [selectedCategory, searchTerm])

  async function fetchProducts() {
    const data = await getProducts()
    setProducts(data)
  }

  const categories = [...new Set(products.map((product) => product.category))]

  // Filtrar productos según la categoría y término de búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory
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
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  basePath="products"
                />
              ))}
            </div>
            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
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
