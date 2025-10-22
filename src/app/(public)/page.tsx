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

export default function Home() {
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
                {siteConfig.name}
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg lg:text-xl text-black mb-8 max-w-2xl leading-relaxed">
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-brand text-white px-8 py-3 text-base font-medium hover:opacity-90 transition-opacity"
              >
                Explorar Cursos
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-brand text-brand bg-transparent px-8 py-3 text-base font-medium hover:bg-brand hover:text-white transition-all"
              >
                Conocer Más
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative z-10 py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Servicios Especializados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cuidado integral para cada etapa de tu vida
            </p>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Card 1 - Cuidado Prenatal */}
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Cuidado Prenatal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 2 - Terapias Naturales */}
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Terapias Naturales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 3 - Yoga Prenatal */}
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Yoga Prenatal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 4 - Cursos Educativos */}
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Cursos Educativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-brand text-white px-8 py-3 text-base font-medium hover:opacity-90 transition-opacity"
            >
              Descubre lo ideal para ti
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
