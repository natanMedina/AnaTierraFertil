'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/services/products'
import { Product } from '@/types/product'
import { SidebarFilter } from '@/components/shared/SidebarFilter'
import { ProductCard } from '@/components/shared/ProductCard'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    fetchProducts()
  }, [])

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
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
