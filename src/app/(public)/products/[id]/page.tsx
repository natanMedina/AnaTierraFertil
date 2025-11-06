'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProductById } from '@/services/products'
import { Product } from '@/types/product'
import InfoDisplay from '@/components/shared/InfoDisplay'
import InfoDisplaySkeleton from '@/components/shared/InfoDisplaySkeleton'

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { id } = useParams<{ id: string }>()
  const productId = parseInt(id, 10)

  useEffect(() => {
    fetchProduct()
  }, [])

  async function fetchProduct() {
    try {
      setLoading(true)
      const data = await getProductById(productId)
      setProduct(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <InfoDisplaySkeleton />
  if (!product) return <p>No se encontró el producto.</p>

  const purchaseOptions = [
    { title: 'Precio compra', buttonText: 'Comprar', price: product.price },
  ]

  return (
    <InfoDisplay
      id={product.id}
      title={product.name}
      description={product.description}
      category={product.category}
      photoUrl={product.photo_url}
      videoUrl={product.video_url}
      purchaseOptions={purchaseOptions}
      basePath="/products"
    />
  )
}
