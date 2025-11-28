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
import { siteConfigBase } from '@/config/site'
import { useCreateVisit } from '@/hooks/useRecordVisit'
import { getBiographyConfig } from '@/services/biographyConfig'
import { useEffect, useState } from 'react'
import { BiographyConfig } from '@/types/biographyConfig'

const BiographySection = () => (
  <div className="relative z-10 py-16 bg-white">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row items-stretch gap-12">
        {/* Columna Izquierda - Imagen */}
        <div className="relative lg:w-1/3 w-full h-[500px] lg:h-auto rounded-lg shadow-lg overflow-hidden">
          <img
            src="/images/biografia.png"
            alt="Biografía"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Columna Derecha - Contenido de Texto */}
        <Card className="lg:w-2/3 p-8 shadow-lg rounded-lg">
          <CardHeader className="pb-6">
            <CardTitle className="text-4xl font-bold text-gray-800 mb-4">
              {siteConfigBase.biography.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {siteConfigBase.biography.name} -{' '}
              <span className="text-brand font-medium">
                {siteConfigBase.homeBiography.username}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 text-lg leading-relaxed">
            {siteConfigBase.biography.description.map((paragraph, index) => (
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
          {siteConfigBase.biography.experiencie.map((paragraph, index) => (
            <p key={index} className="text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Imagen 1 */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
          <img
            src="/images/recorrido1.png"
            alt="Recorrido 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Imagen 2 */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
          <img
            src="/images/recorrido2.png"
            alt="Recorrido 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Imagen 3 */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
          <img
            src="/images/recorrido3.png"
            alt="Recorrido 3"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
)

const SocialSection = () => (
  <div className="relative z-10 py-16 bg-brand-light">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Imagen de la sección */}
        <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden flex flex-col items-center justify-center p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Conoce un poco más
          </h2>
          <p className="max-w-2xl text-lg text-gray-700 leading-relaxed text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            id dolor pellentesque, convallis orci a, aliquam mi. Aenean
            tristique, ligula eu elementum suscipit, lacus cursus massa, eu
            cursus diam tellus sed neque. Mauris venenatis gravida sodales.
            Integer sollicitudin dapibus ornare.
          </p>
        </div>

        {/* Íconos de redes sociales */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
          {/* Instagram */}
          <a
            href={siteConfigBase.redes.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110">
              <img
                src="/instagram-svgrepo-com.svg"
                alt="Instagram"
                width={48}
                height={48}
              />
            </div>
            <span className="text-lg font-medium text-gray-800 group-hover:text-brand transition-colors">
              {siteConfigBase.homeBiography.username}
            </span>
          </a>

          {/* Blog */}
          <a
            href={siteConfigBase.redes.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110">
              <img
                src="/blogger-round-svgrepo-com.svg"
                alt="Blog"
                width={48}
                height={48}
              />
            </div>
            <span className="text-lg font-medium text-gray-800 group-hover:text-brand transition-colors">
              Explora mi blog
            </span>
          </a>

          {/* Linktree */}
          <a
            href={siteConfigBase.redes.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110">
              <img
                src="/linktree-svgrepo-com.svg"
                alt="Linktree"
                width={48}
                height={48}
              />
            </div>
            <span className="text-lg font-medium text-gray-800 group-hover:text-brand transition-colors">
              Linktree
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default function BiographyPage() {
  useCreateVisit()
  const [biographyConfig, setBiographyConfig] =
    useState<BiographyConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBiographyConfig = async () => {
      try {
        const data = await getBiographyConfig()
        setBiographyConfig(data)
      } catch (error) {
        console.error('Error al cargar la configuración de biografía:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBiographyConfig()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[95vh] text-center px-4 pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            El arte de acompañar
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-700 leading-relaxed">
            {loading
              ? 'Cargando...'
              : biographyConfig?.biography_description ||
                'Soy partera intercultural, doula, educadora en salud materna, profesora de yoga prenatal y consultora en salud ayurveda para la mujer, además socióloga con una maestría en asesoría familiar. Acompaño los procesos de gestación, parto y posparto desde una mirada integral que une los saberes ancestrales, la medicina natural y las prácticas del yoga. Mi labor se centra en promover el autocuidado, la conexión cuerpo-espíritu y el respeto por los ritmos naturales de la vida femenina, creando espacios de acompañamiento educativos y conscientes para mujeres, familias y comunidades.'}
          </p>
        </div>
        <BiographySection />
        <JourneySection />
        <SocialSection />
        <SpecialMomentsSection />
      </div>
    </div>
  )
}
