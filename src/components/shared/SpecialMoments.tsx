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

export const SpecialMomentsSection = () => (
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

      {/* Carrusel de Momentos Especiales */}
      <div className="relative">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {/* Elemento del Carrusel 1 */}
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="text-center">
                <Card className="overflow-hidden">
                  <div className="w-full h-60 bg-brand flex items-center justify-center text-white text-xl font-semibold">
                    Foto 1
                  </div>
                </Card>
                <p className="text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </CarouselItem>

            {/* Elemento del Carrusel 2 */}
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="text-center">
                <Card className="overflow-hidden">
                  <div className="w-full h-60 bg-brand flex items-center justify-center text-white text-xl font-semibold">
                    Foto 2
                  </div>
                </Card>
                <p className="text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </CarouselItem>

            {/* Elemento del Carrusel 3 */}
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="text-center">
                <Card className="overflow-hidden">
                  <div className="w-full h-60 bg-brand flex items-center justify-center text-white text-xl font-semibold">
                    Foto 3
                  </div>
                </Card>
                <p className="text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </CarouselItem>

            {/* Elemento del Carrusel 4 - Elemento adicional para demostración */}
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="text-center">
                <Card className="overflow-hidden">
                  <div className="w-full h-60 bg-brand flex items-center justify-center text-white text-xl font-semibold">
                    Foto 4
                  </div>
                </Card>
                <p className="text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  </div>
)
