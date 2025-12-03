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
import { siteConfigBase } from '@/config/site'
import { SpecialMomentsSection } from '@/components/shared/SpecialMoments'
import { useCreateVisit } from '@/hooks/useRecordVisit'
import {
  getHomeConfig,
  updateHomeConfig,
  uploadHomeImage,
} from '@/services/homeConfig'
import { useEffect, useState } from 'react'
import { HomeConfig } from '@/types/HomeConfig'
import { useAdmin } from '@/context/AdminContext'
import { EditableTextArea } from '@/components/shared/EditableTextArea'
import { EditableImage } from '@/components/shared/EditableImage'
import { toast } from 'sonner'

// Componente para la sección hero
const HeroSection = ({
  config,
  isEditMode,
  onUpdate,
}: {
  config: HomeConfig | null
  isEditMode: boolean
  onUpdate: (field: keyof HomeConfig, value: string) => Promise<void>
}) => (
  <div className="relative flex items-center min-h-screen overflow-hidden">
    {/* Fondo con imagen */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/home_bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
    </div>

    <div className="relative z-10 container mx-auto px-6 lg:px-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-brand"></div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-black">
            {siteConfigBase.name}
          </h1>
        </div>
        <div className="mb-8">
          <EditableTextArea
            value={
              config?.hero_section_description ||
              'Acompañamiento integral en salud femenina, cuidado prenatal y bienestar natural, con un enfoque personalizado y holístico para cada etapa de tu vida.'
            }
            onSave={(value) => onUpdate('hero_section_description', value)}
            isEditMode={isEditMode}
            className="text-lg lg:text-xl text-black font-bold max-w-2xl leading-relaxed"
            textareaClassName="text-lg lg:text-xl min-h-[100px] w-full text-black font-bold"
            minRows={4}
            buttonMargin="mt-6"
          />
        </div>
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
              className="border-white text-white bg-transparent px-8 py-3 text-base font-medium hover:border-brand hover:bg-brand hover:text-white transition-all"
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
  iconColor?: string
}

// Componente para una tarjeta de servicio
const ServiceCard = ({ title, description, iconColor }: ServiceCardProps) => {
  const isHexColor = iconColor?.startsWith('#')

  return (
    <Card className="text-center h-80 flex flex-col justify-center">
      <CardHeader className="pb-2 pt-4">
        <div
          className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${!isHexColor ? iconColor || 'bg-brand' : ''}`}
          style={isHexColor ? { backgroundColor: iconColor } : undefined}
        >
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <CardTitle className="text-xl font-bold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

// Componente para la sección de servicios
const ServicesSection = () => (
  <div className="relative z-10 py-16 bg-gray-50">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          {siteConfigBase.sections.services.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {siteConfigBase.sections.services.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <ServiceCard
          title="Cuidado Prenatal"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          iconColor="bg-brand"
        />
        <ServiceCard
          title="Terapias Naturales"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          iconColor="#7ca5b6"
        />
        <ServiceCard
          title="Yoga Prenatal"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          iconColor="#67a4d8"
        />
        <ServiceCard
          title="Cursos Educativos"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          iconColor="bg-admin"
        />
      </div>
      <div className="text-center">
        <Button
          size="lg"
          className="bg-brand text-white px-8 py-3 text-base font-medium hover:opacity-90 transition-opacity"
        >
          <Link href={'/survey'}>
            {siteConfigBase.sections.services.ctaButton}
          </Link>
        </Button>
      </div>
    </div>
  </div>
)

// Componente para la sección de biografía
const BiographySection = ({
  config,
  isEditMode,
  onUpdate,
  onImageUpdate,
}: {
  config: HomeConfig | null
  isEditMode: boolean
  onUpdate: (field: keyof HomeConfig, value: string) => Promise<void>
  onImageUpdate: (field: keyof HomeConfig, file: File) => Promise<void>
}) => (
  <div className="relative z-10 py-16 bg-white">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row items-stretch gap-12">
        {/* Columna Izquierda - Contenido de Texto */}
        <Card className="lg:w-2/3 p-8 shadow-lg rounded-lg">
          <CardHeader className="pb-6">
            <CardTitle className="text-4xl font-bold text-gray-800 mb-4">
              {siteConfigBase.homeBiography.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {siteConfigBase.homeBiography.name} -{' '}
              <span className="text-brand font-medium">
                {siteConfigBase.homeBiography.username}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <EditableTextArea
              value={
                config?.about_description ||
                siteConfigBase.homeBiography.descriptionP1.join('\n\n')
              }
              onSave={(value) => onUpdate('about_description', value)}
              isEditMode={isEditMode}
              className="text-gray-700 text-lg leading-relaxed"
              textareaClassName="text-lg min-h-[200px]"
              minRows={8}
            />
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
        <EditableImage
          src={config?.about_photo || '/images/AnaInicio.jpg'}
          alt="Biografía"
          onImageChange={(file) => onImageUpdate('about_photo', file)}
          isEditMode={isEditMode}
          className="w-full h-full object-cover"
          containerClassName="relative lg:w-1/3 w-full h-[500px] lg:h-auto rounded-lg shadow-lg overflow-hidden"
        />
      </div>
    </div>
  </div>
)

// Componente principal
export default function Home() {
  useCreateVisit()
  const { editMode } = useAdmin()
  const [homeConfig, setHomeConfig] = useState<HomeConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeConfig = async () => {
      try {
        const data = await getHomeConfig()
        setHomeConfig(data)
      } catch (error) {
        console.error('Error al cargar la configuración del home:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeConfig()
  }, [])

  const handleUpdate = async (field: keyof HomeConfig, value: string) => {
    if (!homeConfig) return

    try {
      const updated = await updateHomeConfig({ [field]: value })
      setHomeConfig(updated)
      toast.success('Descripción actualizada correctamente')
    } catch (error) {
      console.error('Error al actualizar:', error)
      toast.error('Error al actualizar la descripción')
    }
  }

  const handleImageUpdate = async (field: keyof HomeConfig, file: File) => {
    if (!homeConfig) return

    try {
      const imageUrl = await uploadHomeImage(file)
      if (!imageUrl) {
        toast.error('Error al subir la imagen')
        return
      }

      const updated = await updateHomeConfig({ [field]: imageUrl })
      setHomeConfig(updated)
      toast.success('Imagen actualizada correctamente')
    } catch (error) {
      console.error('Error al actualizar la imagen:', error)
      toast.error('Error al actualizar la imagen')
    }
  }

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <HeroSection
        config={homeConfig}
        isEditMode={editMode}
        onUpdate={handleUpdate}
      />
      <ServicesSection />
      <BiographySection
        config={homeConfig}
        isEditMode={editMode}
        onUpdate={handleUpdate}
        onImageUpdate={handleImageUpdate}
      />
      <SpecialMomentsSection />
    </div>
  )
}
