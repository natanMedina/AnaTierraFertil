import { supabase } from '@/lib/supabaseClient'
import { BiographyConfig } from '@/types/biographyConfig'

export async function getBiographyConfig() {
  const { data, error } = await supabase
    .from('biography_config')
    .select('*')
    .single()

  if (error) throw error
  return data
}

export async function updateBiographyConfig(updates: Partial<BiographyConfig>) {
  // Obtener la configuración actual para comparar las imágenes
  const currentConfig = await getBiographyConfig()

  // Lista de campos de imágenes
  const imageFields = [
    'about_photo',
    'journey_photo_1',
    'journey_photo_2',
    'journey_photo_3',
  ]

  // Eliminar las imágenes antiguas que están siendo reemplazadas
  for (const field of imageFields) {
    if (
      updates[field as keyof BiographyConfig] &&
      currentConfig[field as keyof BiographyConfig]
    ) {
      const oldImageUrl = currentConfig[
        field as keyof BiographyConfig
      ] as string
      const newImageUrl = updates[field as keyof BiographyConfig] as string

      // Si la URL cambió, eliminar la imagen antigua
      if (oldImageUrl !== newImageUrl && oldImageUrl) {
        try {
          // Extraer el path del storage de la URL
          const urlParts = oldImageUrl.split(
            '/storage/v1/object/public/site_config/'
          )
          if (urlParts.length > 1) {
            const filePath = urlParts[1]
            await supabase.storage.from('site_config').remove([filePath])
          }
        } catch (error) {
          console.error(`Error al eliminar la imagen antigua ${field}:`, error)
          // Continuar con la actualización aunque falle la eliminación
        }
      }
    }
  }

  // Actualizar la configuración
  const { data, error } = await supabase
    .from('biography_config')
    .update(updates)
    .eq('id', 1)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function uploadBiographyImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `biography_${Math.random().toString(36).substring(2, 15)}${Date.now()}.${fileExt}`
  const bucketName = 'site_config'
  const filePath = `${fileName}`

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, { upsert: false })

  if (error) {
    console.error('Error subiendo imagen:', error)
    return null
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)
  return data.publicUrl
}
