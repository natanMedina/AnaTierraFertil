'use client'

import { useEffect, useState } from 'react'
import { getProducts } from '@/services/products'
import UnderConstruction from '@/components/temp/UnderConstruction.tsx'
import { Product } from '@/types/product'
import { useAdmin } from '@/context/AdminContext'

export default function ProductsPage() {
  const { editMode } = useAdmin()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const data = await getProducts()
    setProducts(data)
    console.log(data, products)
  }

  return (
    <>
      <UnderConstruction section="Productos" />
      {editMode && (
        <div className="text-center text-brand font-bold">
          Edición habilitada
        </div>
      )}
    </>
  )
}
