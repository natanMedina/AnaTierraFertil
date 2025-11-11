'use client'

import { SpecialMomentsSection } from '@/components/shared/SpecialMoments'
import { Background } from '@/components/shared/Background'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { siteConfig } from '@/config/site'

const BiographySection = () => (
  <div className="relative z-10 py-16 bg-white">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row items-stretch gap-12">
        {/* Columna Izquierda - Imagen */}
        <div className="relative lg:w-1/3 w-full h-[500px] lg:h-auto bg-brand rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
          <span className="text-white text-2xl font-bold">Foto aquí</span>
        </div>

        {/* Columna Derecha - Contenido de Texto */}
        <Card className="lg:w-2/3 p-8 shadow-lg rounded-lg">
          <CardHeader className="pb-6">
            <CardTitle className="text-4xl font-bold text-gray-800 mb-4">
              {siteConfig.biography.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {siteConfig.biography.name} -{' '}
              <span className="text-brand font-medium">
                {siteConfig.contact.username}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 text-lg leading-relaxed">
            {siteConfig.biography.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

const JourneySection = () => (
  <div className="relative z-10 py-16 bg-gray-50">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="text-center mb-12">
        <div className="max-w-5xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Mi recorrido
          </h2>
          {siteConfig.biography.experiencie.map((paragraph, index) => (
            <p key={index} className="text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Placeholder 1 */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-brand flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">Imagen 1</span>
        </div>

        {/* Placeholder 2 */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-brand flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">Imagen 2</span>
        </div>

        {/* Placeholder 3 */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-brand flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">Imagen 3</span>
        </div>
      </div>
    </div>
  </div>
)

export default function BiographyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[95vh] text-center px-4 pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            El arte de acompañar
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-700 leading-relaxed">
            Soy partera intercultural, doula, educadora en salud materna,
            profesora de yoga prenatal y consultora en salud ayurveda para la
            mujer, además socióloga con una maestría en asesoría familiar.
            Acompaño los procesos de gestación, parto y posparto desde una
            mirada integral que une los saberes ancestrales, la medicina natural
            y las prácticas del yoga. Mi labor se centra en promover el
            autocuidado, la conexión cuerpo-espíritu y el respeto por los ritmos
            naturales de la vida femenina, creando espacios de acompañamiento
            educativos y conscientes para mujeres, familias y comunidades.
          </p>
        </div>
        <BiographySection />
        <JourneySection />
        <SpecialMomentsSection />
      </div>
    </div>
  )
}
