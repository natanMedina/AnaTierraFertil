'use client'

import { SpecialMomentsSection } from '@/components/shared/SpecialMoments'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { siteConfigBase } from '@/config/site'
import { useCreateVisit } from '@/hooks/useRecordVisit'
import {
  getBiographyConfig,
  updateBiographyConfig,
} from '@/services/biographyConfig'
import { useEffect, useState } from 'react'
import { BiographyConfig } from '@/types/biographyConfig'
import { useAdmin } from '@/context/AdminContext'
import { EditableTextArea } from '@/components/shared/EditableTextArea'
import { EditableImage } from '@/components/shared/EditableImage'
import { toast } from 'sonner'
import { uploadBiographyImage } from '@/services/biographyConfig'

const BiographySection = ({
  config,
  isEditMode,
  onUpdate,
  onImageUpdate,
}: {
  config: BiographyConfig | null
  isEditMode: boolean
  onUpdate: (field: keyof BiographyConfig, value: string) => Promise<void>
  onImageUpdate: (field: keyof BiographyConfig, file: File) => Promise<void>
}) => (
  <div className="relative z-10 py-16 bg-white">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row items-stretch gap-12">
        {/* Columna Izquierda - Imagen */}
        <EditableImage
          src={config?.about_photo || '/images/biografia.png'}
          alt="Biografía"
          onImageChange={(file) => onImageUpdate('about_photo', file)}
          isEditMode={isEditMode}
          className="w-full h-full object-cover"
          containerClassName="relative lg:w-1/3 w-full h-[500px] lg:h-auto rounded-lg shadow-lg overflow-hidden"
        />

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
            <EditableTextArea
              value={
                config?.about_description ||
                siteConfigBase.biography.description.join(' ')
              }
              onSave={(value) => onUpdate('about_description', value)}
              isEditMode={isEditMode}
              className="text-gray-700 text-lg leading-relaxed"
              textareaClassName="text-lg min-h-[200px]"
              minRows={8}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

const JourneySection = ({
  config,
  isEditMode,
  onUpdate,
  onImageUpdate,
}: {
  config: BiographyConfig | null
  isEditMode: boolean
  onUpdate: (field: keyof BiographyConfig, value: string) => Promise<void>
  onImageUpdate: (field: keyof BiographyConfig, file: File) => Promise<void>
}) => (
  <div className="relative z-10 py-16 bg-gray-50">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="text-center mb-12">
        <div className="max-w-5xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Mi recorrido
          </h2>
          <EditableTextArea
            value={
              config?.journey_description ||
              siteConfigBase.biography.experiencie.join(' ')
            }
            onSave={(value) => onUpdate('journey_description', value)}
            isEditMode={isEditMode}
            className="text-justify text-gray-700 text-lg leading-relaxed"
            textareaClassName="text-lg min-h-[150px]"
            minRows={6}
            centerButton={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Imagen 1 */}
        <EditableImage
          src={config?.journey_photo_1 || '/images/recorrido1.png'}
          alt="Recorrido 1"
          onImageChange={(file) => onImageUpdate('journey_photo_1', file)}
          isEditMode={isEditMode}
          className="w-full h-full object-cover"
          containerClassName="aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
        />

        {/* Imagen 2 */}
        <EditableImage
          src={config?.journey_photo_2 || '/images/recorrido2.png'}
          alt="Recorrido 2"
          onImageChange={(file) => onImageUpdate('journey_photo_2', file)}
          isEditMode={isEditMode}
          className="w-full h-full object-cover"
          containerClassName="aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
        />

        {/* Imagen 3 */}
        <EditableImage
          src={config?.journey_photo_3 || '/images/recorrido3.png'}
          alt="Recorrido 3"
          onImageChange={(file) => onImageUpdate('journey_photo_3', file)}
          isEditMode={isEditMode}
          className="w-full h-full object-cover"
          containerClassName="aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
)

const SocialSection = ({
  config,
  isEditMode,
  onUpdate,
}: {
  config: BiographyConfig | null
  isEditMode: boolean
  onUpdate: (field: keyof BiographyConfig, value: string) => Promise<void>
}) => (
  <div className="relative py-16 overflow-hidden">
    {/* Fondo con imagen */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/conoce_bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/0"></div>
    </div>

    <div className="relative z-10 container mx-auto px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Imagen de la sección */}
        <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden flex flex-col items-center justify-center p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Conoce un poco más
          </h2>
          <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
            <EditableTextArea
              value={
                config?.social_description ||
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id dolor pellentesque, convallis orci a, aliquam mi. Aenean tristique, ligula eu elementum suscipit, lacus cursus massa, eu cursus diam tellus sed neque. Mauris venenatis gravida sodales. Integer sollicitudin dapibus ornare.'
              }
              onSave={(value) => onUpdate('social_description', value)}
              isEditMode={isEditMode}
              className="w-full text-lg text-gray-700 leading-relaxed text-center"
              textareaClassName="text-lg text-center min-h-[120px] w-[400px]"
              minRows={5}
              centerButton={true}
              maxCharacters={900}
            />
          </div>
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
  const { editMode } = useAdmin()
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

  const handleUpdate = async (field: keyof BiographyConfig, value: string) => {
    if (!biographyConfig) return

    try {
      const updated = await updateBiographyConfig({ [field]: value })
      setBiographyConfig(updated)
      toast.success('Descripción actualizada correctamente')
    } catch (error) {
      console.error('Error al actualizar:', error)
      toast.error('Error al actualizar la descripción')
    }
  }

  const handleImageUpdate = async (
    field: keyof BiographyConfig,
    file: File
  ) => {
    if (!biographyConfig) return

    try {
      // Subir la imagen
      const imageUrl = await uploadBiographyImage(file)
      if (!imageUrl) {
        toast.error('Error al subir la imagen')
        return
      }

      // Actualizar la configuración con la nueva URL
      const updated = await updateBiographyConfig({ [field]: imageUrl })
      setBiographyConfig(updated)
      toast.success('Imagen actualizada correctamente')
    } catch (error) {
      console.error('Error al actualizar la imagen:', error)
      toast.error('Error al actualizar la imagen')
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <div className="relative flex flex-col items-center justify-center min-h-[95vh] text-center px-4 pt-16 overflow-hidden">
          {/* Fondo con imagen */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/biography_bg.png')" }}
          >
            <div className="absolute inset-0"></div>
          </div>

          <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            El arte de acompañar
          </h1>
          {loading ? (
            <p className="relative z-10 max-w-2xl text-lg md:text-xl text-white leading-relaxed">
              Cargando...
            </p>
          ) : (
            <div className="relative z-10 w-full max-w-4xl px-4">
              <EditableTextArea
                value={
                  biographyConfig?.biography_description ||
                  'Soy partera intercultural, doula, educadora en salud materna, profesora de yoga prenatal y consultora en salud ayurveda para la mujer, además socióloga con una maestría en asesoría familiar. Acompaño los procesos de gestación, parto y posparto desde una mirada integral que une los saberes ancestrales, la medicina natural y las prácticas del yoga. Mi labor se centra en promover el autocuidado, la conexión cuerpo-espíritu y el respeto por los ritmos naturales de la vida femenina, creando espacios de acompañamiento educativos y conscientes para mujeres, familias y comunidades.'
                }
                onSave={(value) => handleUpdate('biography_description', value)}
                isEditMode={editMode}
                className="text-lg md:text-xl text-white leading-relaxed text-center"
                textareaClassName="text-lg md:text-xl min-h-[200px] w-full text-white"
                minRows={8}
                centerButton={true}
              />
            </div>
          )}
        </div>
        <BiographySection
          config={biographyConfig}
          isEditMode={editMode}
          onUpdate={handleUpdate}
          onImageUpdate={handleImageUpdate}
        />
        <JourneySection
          config={biographyConfig}
          isEditMode={editMode}
          onUpdate={handleUpdate}
          onImageUpdate={handleImageUpdate}
        />
        <SocialSection
          config={biographyConfig}
          isEditMode={editMode}
          onUpdate={handleUpdate}
        />
        <SpecialMomentsSection />
      </div>
    </div>
  )
}
