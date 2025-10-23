'use client'

import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

export default function HeroSection() {
  // Información específica de esta sección
  const heroData = {
    title: siteConfig.name,
    description:
      'Acompañamiento integral en salud femenina, cuidado prenatal y bienestar natural, con un enfoque personalizado y holístico para cada etapa de tu vida.',
    primaryButton: {
      text: siteConfig.commonTexts.exploreCourses,
      onClick: () => console.log('Explorar Cursos clicked'),
    },
    secondaryButton: {
      text: siteConfig.commonTexts.knowMore,
      onClick: () => console.log('Conocer Más clicked'),
    },
  }
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with foliage */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100 to-blue-50">
        <div className="absolute inset-0 opacity-20">
          {/* Simulated foliage background with CSS */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-200/30 via-green-300/20 to-blue-200/30"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-400/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* Logo and Title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-brand"></div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-black">
                {heroData.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg lg:text-xl text-black mb-8 max-w-2xl leading-relaxed">
              {heroData.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-brand text-white px-8 py-3 text-base font-medium hover:opacity-90 transition-opacity"
                onClick={heroData.primaryButton.onClick}
              >
                {heroData.primaryButton.text}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-brand text-brand bg-transparent px-8 py-3 text-base font-medium hover:bg-brand hover:text-white transition-all"
                onClick={heroData.secondaryButton.onClick}
              >
                {heroData.secondaryButton.text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
