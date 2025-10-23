'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { siteConfig } from '@/config/site'
import { CheckCircleIcon } from 'lucide-react'
import { Background } from '@/components/shared/Background'
import { SpecialMomentsSection } from '@/components/shared/SpecialMoments'

// Componente para la sección hero
const HeroSection = () => (
  <div className="relative z-10 flex items-center min-h-screen">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-brand"></div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-black">
            {siteConfig.name}
          </h1>
        </div>
        <p className="text-lg lg:text-xl text-black mb-8 max-w-2xl leading-relaxed">
          Description: Lorem ipsum dolor sit amet...
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button
            size="lg"
            className="bg-brand text-white px-8 py-3 text-base font-medium hover:opacity-90 transition-opacity"
          >
            Explorar Cursos
          </Button>
          <Link href="/biography">
            <Button
              variant="outline"
              size="lg"
              className="border-brand text-brand bg-transparent px-8 py-3 text-base font-medium hover:bg-brand hover:text-white transition-all"
            >
              Conocer Más
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

interface ServiceCardProps {
  title: string
  description: string
}

// Componente para una tarjeta de servicio
const ServiceCard = ({ title, description }: ServiceCardProps) => (
  <Card className="text-center h-80 flex flex-col justify-center">
    <CardHeader className="pb-2 pt-4">
      <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-6 flex items-center justify-center">
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>
      <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
    </CardHeader>
    <CardContent className="pt-2">
      <CardDescription className="text-gray-600">{description}</CardDescription>
    </CardContent>
  </Card>
)

// Componente para la sección de servicios
const ServicesSection = () => (
  <div className="relative z-10 py-16 bg-gray-50">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          {siteConfig.sections.services.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {siteConfig.sections.services.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <ServiceCard
          title="Cuidado Prenatal"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <ServiceCard
          title="Terapias Naturales"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <ServiceCard
          title="Yoga Prenatal"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <ServiceCard
          title="Cursos Educativos"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
      </div>
      <div className="text-center">
        <Button
          size="lg"
          className="bg-brand text-white px-8 py-3 text-base font-medium hover:opacity-90 transition-opacity"
        >
          {siteConfig.sections.services.ctaButton}
        </Button>
      </div>
    </div>
  </div>
)

// Componente para la sección de biografía
const BiographySection = () => (
  <div className="relative z-10 py-16 bg-white">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row items-stretch gap-12">
        {/* Columna Izquierda - Contenido de Texto */}
        <Card className="lg:w-2/3 p-8 shadow-lg rounded-lg">
          <CardHeader className="pb-6">
            <CardTitle className="text-4xl font-bold text-gray-800 mb-4">
              {siteConfig.biography.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {siteConfig.biography.name} -{' '}
              <span className="text-brand font-medium">
                {siteConfig.biography.username}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 text-lg leading-relaxed">
            {siteConfig.biography.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <ul className="space-y-3 pl-5">
              {siteConfig.biography.services.map((service, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 flex justify-center">
              <Link href="/biography">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-brand text-brand bg-transparent px-8 py-3 text-base font-medium hover:bg-brand hover:text-white transition-all"
                >
                  Conocer Más
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Columna Derecha - Marcador de Posición de Imagen */}
        <div className="relative lg:w-1/3 w-full h-[500px] lg:h-auto bg-brand rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
          <span className="text-white text-2xl font-bold">Foto aquí</span>
          {/* Aquí irá la imagen real más adelante */}
        </div>
      </div>
    </div>
  </div>
)

// Componente principal
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <HeroSection />
      <ServicesSection />
      <BiographySection />
      <SpecialMomentsSection />
    </div>
  )
}
