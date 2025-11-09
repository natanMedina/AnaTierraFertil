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
import { CheckCircleIcon } from 'lucide-react'

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
          <CardContent className="space-y-4 text-gray-700 text-base leading-tight">
            <p>
              Soy partera intercultural, socióloga con maestría en Asesoría
              Familiar, y acompañante de procesos femeninos desde una mirada
              integral que une la sabiduría ancestral y el conocimiento
              contemporáneo.
            </p>

            <p>
              Acompaño a mujeres en todas las etapas de su vida —menarquia,
              embarazo, parto, posparto y climaterio— con prácticas de salud
              natural y holística, que incluyen:
            </p>

            <ul className="space-y-2 pl-5">
              {/* Cada item en su propio li con flex para alinear el icono y el texto */}
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-brand flex-shrink-0 mt-1" />
                <span>
                  Consultoría en salud Ayurveda y autocuidado femenino.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-brand flex-shrink-0 mt-1" />
                <span>
                  Ginecología natural y acompañamiento en salud sexual y
                  reproductiva.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-brand flex-shrink-0 mt-1" />
                <span>
                  Masaje terapéutico desde la Medicina Tradicional China y el
                  Masaje Tradicional Tailandés (como profesora internacional).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-brand flex-shrink-0 mt-1" />
                <span>
                  Yoga prenatal e integral, con enfoque en energía femenina y
                  embarazo consciente.
                </span>
              </li>
            </ul>

            <p>
              Soy cofundadora de la Asociación Parir Cali, y desde el 2013
              acompaño partos en casa con el equipo Aluna Nacer. También soy
              cofundadora de Matricarias Tejido de Mujeres en Boyacá, espacios
              que promueven la partería, la salud femenina y los saberes
              comunitarios.
            </p>

            <p>
              Mi propósito es ofrecer un acompañamiento integral, amoroso y
              respetuoso, que honre la sabiduría del cuerpo femenino y su
              conexión con la naturaleza en cada etapa de la vida.
            </p>
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
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Mi recorrido</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          id dolor pellentesque, convallis orci a, aliquam mi.
        </p>
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
            Conoce a Ana
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet...
          </p>
        </div>
        <BiographySection />
        <JourneySection />
        <SpecialMomentsSection />
      </div>
    </div>
  )
}
