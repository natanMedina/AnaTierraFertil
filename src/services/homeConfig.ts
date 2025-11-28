import { supabase } from '@/lib/supabaseClient'
import { HomeConfig } from '@/types/HomeConfig'

export async function getHomeConfig() {
  const { data, error } = await supabase
    .from('home_config')
    .select('*')
    .single()

  if (error) throw error
  return data
}

export async function updateHomeConfig(updates: Partial<HomeConfig>) {
  // Obtener la configuración actual para comparar las imágenes
  const currentConfig = await getHomeConfig()

  // Lista de campos de imágenes
  const imageFields = ['about_photo']

  // Eliminar las imágenes antiguas que están siendo reemplazadas
  for (const field of imageFields) {
    if (
      updates[field as keyof HomeConfig] &&
      currentConfig[field as keyof HomeConfig]
    ) {
      const oldImageUrl = currentConfig[field as keyof HomeConfig] as string
      const newImageUrl = updates[field as keyof HomeConfig] as string

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
    .from('home_config')
    .update(updates)
    .eq('id', 1)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function uploadHomeImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `home_${Math.random().toString(36).substring(2, 15)}${Date.now()}.${fileExt}`
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
