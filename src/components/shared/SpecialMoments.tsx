'use client'

import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { siteConfigBase } from '@/config/site'
import { getMoments } from '@/services/moments'
import { Moments } from '@/types/moments'
import { useEffect, useState } from 'react'
import { useAdmin } from '@/context/AdminContext'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { MomentsCard } from '@/components/forms/MomentsCard'

export const SpecialMomentsSection = () => {
  const [moments, setMoments] = useState<Moments[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { editMode } = useAdmin()

  useEffect(() => {
    const fetchMoments = async () => {
      try {
        const data = await getMoments()
        setMoments(data)
      } catch (error) {
        console.error('Error al cargar momentos especiales:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMoments()
  }, [])

  const handleMomentCreated = (newMoment: Moments) => {
    setMoments((prev) => [newMoment, ...prev])
  }

  return (
    <div className="relative z-10 py-16 bg-green-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Encabezado de la Sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {siteConfigBase.sections.specialMoments.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {siteConfigBase.sections.specialMoments.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Cargando momentos...</div>
        ) : moments.length === 0 ? (
          <div className="text-center text-gray-600">
            No hay momentos especiales para mostrar
          </div>
        ) : (
          /* Carrusel de Momentos Especiales */
          <div className="relative">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {moments.map((moment) => (
                  <CarouselItem
                    key={moment.id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="text-center">
                      <Card className="overflow-hidden">
                        <div className="w-full h-60 overflow-hidden">
                          <img
                            src={moment.photo_url}
                            alt={`Momento ${moment.id}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Card>
                      <p className="text-gray-600 mt-4 whitespace-pre-wrap">
                        {moment.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}

        {/* Botón de crear momento en modo edición */}
        {editMode && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-brand hover:bg-brand/90 text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Crear Momento Especial
            </Button>
          </div>
        )}

        {/* Modal de crear momento */}
        <MomentsCard
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleMomentCreated}
        />
      </div>
    </div>
  )
}
