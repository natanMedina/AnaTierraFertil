'use client'

import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export default function CarouselSection() {
  // Información específica de esta sección
  const carouselData = {
    title: 'Momentos Especiales',
    subtitle: 'Experiencias compartidas en nuestros cursos y encuentros',
    backgroundColor: 'bg-green-50',
    maxWidth: 'max-w-6xl',
    items: [
      {
        image: 'Foto 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        image: 'Foto 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        image: 'Foto 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        image: 'Foto 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        image: 'Foto 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        image: 'Foto 6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  }
  return (
    <div className={`relative z-10 py-16 ${carouselData.backgroundColor}`}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {carouselData.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {carouselData.subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className={`w-full ${carouselData.maxWidth} mx-auto`}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {carouselData.items.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="text-center">
                    <Card className="overflow-hidden">
                      <div className="w-full h-60 bg-brand flex items-center justify-center text-white text-xl font-semibold">
                        {item.image}
                      </div>
                    </Card>
                    <p className="text-gray-600 mt-4">{item.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
