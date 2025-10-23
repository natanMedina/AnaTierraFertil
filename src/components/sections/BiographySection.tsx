'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircleIcon } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function BiographySection() {
  // Información específica de esta sección
  const biographyData = {
    title: 'Un poco de mi',
    name: 'Ana María Palau',
    username: '@ana.tierrafertil',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    ],
    services: [
      'Certificada en partería profesional',
      '+500 familias acompañadas',
      'Especialista en medicina natural',
    ],
    buttonText: siteConfig.commonTexts.knowMore,
    buttonOnClick: () => console.log('Conocer Más clicked'),
    imagePlaceholder: 'Foto aquí',
  }
  return (
    <div className="relative z-10 py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          {/* Left Column - Text Content */}
          <Card className="lg:w-2/3 p-8 shadow-lg rounded-lg">
            <CardHeader className="pb-6">
              <CardTitle className="text-4xl font-bold text-gray-800 mb-4">
                {biographyData.title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {biographyData.name} -{' '}
                <span className="text-brand font-medium">
                  {biographyData.username}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700 text-lg leading-relaxed">
              {biographyData.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <ul className="space-y-3 pl-5">
                {biographyData.services.map((service, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircleIcon className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-brand text-brand bg-transparent px-8 py-3 text-base font-medium hover:bg-brand hover:text-white transition-all"
                  onClick={biographyData.buttonOnClick}
                >
                  {biographyData.buttonText}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Image Placeholder */}
          <div className="relative lg:w-1/3 w-full h-[500px] lg:h-auto bg-brand rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {biographyData.imagePlaceholder}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
