'use client'

import { useEffect, useState } from 'react'
import { getProducts } from '@/services/products'
import UnderConstruction from '@/components/temp/UnderConstruction.tsx'
import { Product } from '@/types/product'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const data = await getProducts()
    setProducts(data)
    console.log(data)
  }

  return <UnderConstruction section="Productos" />
}
