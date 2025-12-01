'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getServiceById } from '@/services/services'
import { Service } from '@/types/service'
import InfoDisplay from '@/components/shared/InfoDisplay'
import InfoDisplaySkeleton from '@/components/shared/InfoDisplaySkeleton'
import { toast } from 'sonner'
import { Category } from '@/types/category'
import { getServiceCategoryById } from '@/services/categoriesServices'

export default function ServiceDetailPage() {
  const [service, setService] = useState<Service | null>(null)
  const [category, setCategory] = useState<Category | null>()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const serviceId = parseInt(id, 10)

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)
        const data = await getServiceById(serviceId)
        setService(data)
      } catch {
        toast.error('El servicio no existe o no se pudo cargar.')
        // Espera antes del redirect
        setTimeout(() => {
          router.replace('/services')
        }, 800)
      }
    }

    fetchService()
  }, [serviceId, router])

  // Cuando haya servicio se obtiene la categoría
  useEffect(() => {
    if (!service) return

    const fetchCategory = async () => {
      const data = await getServiceCategoryById(service.category_fk)
      if (data) setCategory(data)
      setLoading(false)
    }
    fetchCategory()
  }, [service])

  if (loading || !service || !category) return <InfoDisplaySkeleton />

  const purchaseOptions = []
  if (service.price) {
    purchaseOptions.push({
      title: 'Precio de compra',
      buttonText: 'Comprar',
      price: service.price,
    })
  }
  if (service.price_live_class) {
    purchaseOptions.push({
      title: 'Precio de clases en vivo',
      buttonText: 'Inscribirme',
      price: service.price_live_class,
    })
  }

  return (
    <InfoDisplay
      id={serviceId}
      title={service.name}
      description={service.description}
      category={category.name}
      photoUrl={service.photo_url}
      videoUrl={service.video_url}
      purchaseOptions={purchaseOptions}
      basePath="/services"
    />
  )
}
