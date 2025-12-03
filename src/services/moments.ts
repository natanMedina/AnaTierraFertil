import { supabase } from '@/lib/supabaseClient'
import { Moments } from '@/types/moments'

export async function getMoments(): Promise<Moments[]> {
  const { data, error } = await supabase
    .from('special_moments')
    .select('*')
    .order('id', { ascending: false })

  if (error) throw new Error(`Error al obtener momentos: ${error.message}`)
  return data || []
}

export async function getMomentById(id: number): Promise<Moments | null> {
  const { data, error } = await supabase
    .from('special_moments')
    .select('*')
    .eq('id', id)
    .single()

  if (error)
    throw new Error(`Error al obtener momento con id ${id}: ${error.message}`)
  return data || null
}

export async function createMoment(
  moment: Omit<Moments, 'id'>
): Promise<Moments> {
  const { data, error } = await supabase
    .from('special_moments')
    .insert([moment])
    .select()
    .single()

  if (error) throw new Error(`Error al crear momento: ${error.message}`)
  return data
}

export async function updateMoment(id: number, moment: Partial<Moments>) {
  const { data, error } = await supabase
    .from('special_moments')
    .update(moment)
    .eq('id', id)
    .select()

  if (error) throw new Error(`Error al actualizar momento: ${error.message}`)
  return data
}

export async function deleteMoment(id: number): Promise<boolean> {
  try {
    // Obtener el momento para acceder a su imagen
    const { data: moment, error: fetchError } = await supabase
      .from('special_moments')
      .select('photo_url')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error al obtener momento antes de eliminar:', fetchError)
      return false
    }

    // Eliminar el registro del momento
    const { error: deleteError } = await supabase
      .from('special_moments')
      .delete()
      .eq('id', id)
    if (deleteError) {
      console.error('Error al eliminar momento:', deleteError)
      return false
    }

    // Si tiene imagen, eliminarla del bucket
    if (moment?.photo_url) {
      await deleteMomentImage(moment.photo_url)
    }

    return true
  } catch (err) {
    console.error('Error general al eliminar momento:', err)
    return false
  }
}

// Funciones para imagenes en el bucket
export async function uploadMomentImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}${Date.now()}.${fileExt}`
  const bucketName = 'special_moments'
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

export async function deleteMomentImage(publicUrl: string): Promise<boolean> {
  try {
    const bucketName = 'special_moments'

    const { data } = supabase.storage.from(bucketName).getPublicUrl('')

    // El path base público del bucket, sin incluir archivos
    const basePublicPath = data.publicUrl.endsWith('/')
      ? data.publicUrl
      : `${data.publicUrl}/`

    // Extraer solo el nombre del archivo a partir de la URL completa
    const filePath = publicUrl.replace(basePublicPath, '')

    if (!filePath || filePath === publicUrl) {
      console.error('❌ No se pudo determinar el path del archivo a eliminar')
      return false
    }

    const { error } = await supabase.storage.from(bucketName).remove([filePath])

    if (error) {
      console.error('Error al eliminar imagen del bucket:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Error general al eliminar imagen:', err)
    return false
  }
}
