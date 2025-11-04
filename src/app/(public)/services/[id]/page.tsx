'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getServiceById } from '@/services/services'
import { Service } from '@/types/service'
import InfoDisplay from '@/components/shared/InfoDisplay'

export default function ServiceDetailPage() {
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { id } = useParams<{ id: string }>()
  const serviceId = parseInt(id, 10)

  useEffect(() => {
    fetchService()
  }, [])

  async function fetchService() {
    try {
      setLoading(true)
      const data = await getServiceById(serviceId)
      setService(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Cargando servicio...</p>
  if (error) return <p>Error: {error}</p>
  if (!service) return <p>No se encontró el servicio.</p>

  const purchaseOptions = [
    { title: 'Precio compra', buttonText: 'Comprar', price: service.price },
    {
      title: 'Precio de clases en vivo',
      buttonText: 'Inscribirme',
      price: service.price,
    },
  ]

  return (
    <InfoDisplay
      title={service.name}
      description={service.description}
      category={service.category}
      photoUrl={service.photo_url}
      videoUrl={service.video_url}
      purchaseOptions={purchaseOptions}
    />
  )
}
