'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProductById } from '@/services/products'
import { Product } from '@/types/product'
import InfoDisplay from '@/components/shared/InfoDisplay'
import InfoDisplaySkeleton from '@/components/shared/InfoDisplaySkeleton'
import { toast } from 'sonner'
import { getProductCategoryById } from '@/services/categoriesProducts'
import { Category } from '@/types/category'

export default function ProductDetailPage(productId: number) {
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

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
      }
    }

    fetchProduct()
  }, [productId, router])

  // Cuando haya producto se obtiene la categoría
  useEffect(() => {
    if (!product) return

    const fetchCategory = async () => {
      const data = await getProductCategoryById(product.category_fk)
      if (data) setCategory(data)
      setLoading(false)
    }
    fetchCategory()
  }, [product])

  if (loading || !product || !category) return <InfoDisplaySkeleton />

  const purchaseOptions = [
    { title: 'Precio compra', buttonText: 'Comprar', price: product.price },
  ]

  return (
    <InfoDisplay
      id={product.id}
      title={product.name}
      description={product.description}
      category={category.name}
      photoUrl={product.photo_url}
      videoUrl={product.video_url}
      purchaseOptions={purchaseOptions}
      basePath="/products"
    />
  )
}
