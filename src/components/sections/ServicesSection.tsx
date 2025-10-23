'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { siteConfig } from '@/config/site'

export default function ServicesSection() {
  // Información específica de esta sección
  const servicesData = {
    title: 'Servicios Especializados',
    subtitle: 'Cuidado integral para cada etapa de tu vida',
    ctaButton: {
      text: siteConfig.commonTexts.discoverIdeal,
      onClick: () => console.log('CTA clicked'),
    },
    services: [
      {
        title: 'Cuidado Prenatal',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Terapias Naturales',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Yoga Prenatal',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Cursos Educativos',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  }
  return (
    <div className="relative z-10 py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {servicesData.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {servicesData.subtitle}
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {servicesData.services.map((service, index) => (
            <Card
              key={index}
              className="text-center h-80 flex flex-col justify-center"
            >
              <CardHeader className="pb-2 pt-4">
                <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-6 flex items-center justify-center">
                  {service.icon || (
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-brand text-white px-8 py-3 text-base font-medium hover:opacity-90 transition-opacity"
            onClick={servicesData.ctaButton.onClick}
          >
            {servicesData.ctaButton.text}
          </Button>
        </div>
      </div>
    </div>
  )
}
