'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProductById } from '@/services/products'
import { Product } from '@/types/product'
import InfoDisplay from '@/components/shared/InfoDisplay'
import InfoDisplaySkeleton from '@/components/shared/InfoDisplaySkeleton'
import { toast } from 'sonner'

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const productId = parseInt(id, 10)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(productId)
        setProduct(data)
      } catch {
        toast.error('El producto no existe o no se pudo cargar.')
        // Espera antes del redirect
        setTimeout(() => {
          router.replace('/products')
        }, 800)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, router])

  if (loading || !product) return <InfoDisplaySkeleton />

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
