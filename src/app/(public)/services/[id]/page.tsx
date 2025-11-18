'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getServiceById } from '@/services/services'
import { Service } from '@/types/service'
import InfoDisplay from '@/components/shared/InfoDisplay'
import InfoDisplaySkeleton from '@/components/shared/InfoDisplaySkeleton'
import { toast } from 'sonner'

export default function ServiceDetailPage() {
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const serviceId = parseInt(id, 10)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getServiceById(serviceId)
        setService(data)
      } catch {
        toast.error('El producto no existe o no se pudo cargar.')
        // Espera antes del redirect
        setTimeout(() => {
          router.replace('/services')
        }, 800)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [serviceId, router])

  if (loading || !service) return <InfoDisplaySkeleton />

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
      category={service.category}
      photoUrl={service.photo_url}
      videoUrl={service.video_url}
      purchaseOptions={purchaseOptions}
      basePath="/services"
    />
  )
}
