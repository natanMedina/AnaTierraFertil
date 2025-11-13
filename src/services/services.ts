import { supabase } from '@/lib/supabaseClient'
import { Service } from '@/types/service'

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw new Error(`Error al obtener servicios: ${error.message}`)
  return data || []
}

export async function getServiceById(id: number): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()

  if (error)
    throw new Error(`Error al obtener servicio con id ${id}: ${error.message}`)
  return data || null
}

export async function createService(
  service: Omit<Service, 'id'>
): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single()

  if (error) throw new Error(`Error al crear servicio: ${error.message}`)
  return data
}

export async function updateService(id: number, service: Partial<Service>) {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()

  if (error) throw new Error(`Error al actualizar servicio: ${error.message}`)
  return data
}

export async function deleteService(id: number): Promise<boolean> {
  try {
    // Obtener el servicio para acceder a su imagen
    const { data: service, error: fetchError } = await supabase
      .from('services')
      .select('photo_url')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error al obtener servicio antes de eliminar:', fetchError)
      return false
    }

    // Eliminar el registro del servicio
    const { error: deleteError } = await supabase
      .from('services')
      .delete()
      .eq('id', id)
    if (deleteError) {
      console.error('Error al eliminar servicio:', deleteError)
      return false
    }

    // Si tiene imagen, eliminarla del bucket
    if (service?.photo_url) {
      await deleteServiceImage(service.photo_url)
    }

    return true
  } catch (err) {
    console.error('Error general al eliminar servicio:', err)
    return false
  }
}

// Funciones para imagenes en el bucket
export async function uploadServiceImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}${Date.now()}.${fileExt}`
  const bucketName = 'services'
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

export async function deleteServiceImage(publicUrl: string): Promise<boolean> {
  try {
    const bucketName = 'services'

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
