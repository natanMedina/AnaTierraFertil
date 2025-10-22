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
import { CheckCircleIcon } from 'lucide-react'

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
            <Card className="text-center h-80 flex flex-col justify-center">
              <CardHeader className="pb-2 pt-4">
                <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Cuidado Prenatal
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 2 - Terapias Naturales */}
            <Card className="text-center h-80 flex flex-col justify-center">
              <CardHeader className="pb-2 pt-4">
                <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Terapias Naturales
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 3 - Yoga Prenatal */}
            <Card className="text-center h-80 flex flex-col justify-center">
              <CardHeader className="pb-2 pt-4">
                <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Yoga Prenatal
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 4 - Cursos Educativos */}
            <Card className="text-center h-80 flex flex-col justify-center">
              <CardHeader className="pb-2 pt-4">
                <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Cursos Educativos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
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

      {/* Biography Section */}
      <div className="relative z-10 py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            {/* Left Column - Text Content */}
            <Card className="lg:w-2/3 p-8 shadow-lg rounded-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-4xl font-bold text-gray-800 mb-4">
                  Un poco de mi
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Ana María Palau -{' '}
                  <span className="text-brand font-medium">
                    @ana.tierrafertil
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <ul className="space-y-3 pl-5">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                    <span>Certificada en partería profesional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                    <span>+500 familias acompañadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                    <span>Especialista en medicina natural</span>
                  </li>
                </ul>
                <div className="pt-4 flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-brand text-brand bg-transparent px-8 py-3 text-base font-medium hover:bg-brand hover:text-white transition-all"
                  >
                    Conocer Más
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Image Placeholder */}
            <div className="relative lg:w-1/3 w-full h-[500px] lg:h-auto bg-brand rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Foto aquí</span>
              {/* Aquí irá la imagen real más adelante */}
            </div>
          </div>
        </div>
      </div>

      {/* Special Moments Section */}
      <div className="relative z-10 py-16 bg-green-50">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Momentos Especiales
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experiencias compartidas en nuestros cursos y encuentros
            </p>
          </div>

          {/* Moments Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
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

            {/* Card 2 */}
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

            {/* Card 3 */}
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
          </div>
        </div>
      </div>
    </div>
  )
}
