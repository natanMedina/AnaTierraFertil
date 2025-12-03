'use client'

import { useParams } from 'next/navigation'
import ProductDetailPage from './ProductDetailPage'
import ProductsPage from './ProductsPage'

export default function ProductsSection() {
  const param = useParams().params?.[0]
  const isId = !isNaN(Number(param))
  if (isId) {
    return ProductDetailPage(Number(param))
  } else {
    return ProductsPage(param)
  }
}
