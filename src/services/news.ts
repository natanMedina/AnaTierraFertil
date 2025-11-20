import { supabase } from '@/lib/supabaseClient'
import { News } from '@/types/news'

export async function getNews(): Promise<News[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw new Error(`Error al obtener noticias: ${error.message}`)
  return data || []
}

export async function getNewsById(id: number): Promise<News | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (error)
    throw new Error(`Error al obtener noticia con id ${id}: ${error.message}`)
  return data || null
}

export async function createNews(news: Omit<News, 'id'>): Promise<News> {
  const { data, error } = await supabase
    .from('news')
    .insert([news])
    .select()
    .single()

  if (error) throw new Error(`Error al crear noticia: ${error.message}`)
  return data
}

export async function updateNews(id: number, news: Partial<News>) {
  const { data, error } = await supabase
    .from('news')
    .update(news)
    .eq('id', id)
    .select()

  if (error) throw new Error(`Error al actualizar noticia: ${error.message}`)
  return data
}

export async function deleteNews(id: number): Promise<boolean> {
  try {
    // Obtener la noticia para acceder a su imagen
    const { data: news, error: fetchError } = await supabase
      .from('news')
      .select('photo_url')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error al obtener noticia antes de eliminar:', fetchError)
      return false
    }

    // Eliminar el registro de la noticia
    const { error: deleteError } = await supabase
      .from('news')
      .delete()
      .eq('id', id)
    if (deleteError) {
      console.error('Error al eliminar noticia:', deleteError)
      return false
    }

    // Si tiene imagen, eliminarla del bucket
    if (news?.photo_url) {
      await deleteNewsImage(news.photo_url)
    }

    return true
  } catch (err) {
    console.error('Error general al eliminar noticia:', err)
    return false
  }
}

// Funciones para imagenes en el bucket
export async function uploadNewsImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}${Date.now()}.${fileExt}`
  const bucketName = 'news'
  // const folder = 'public'
  // const filePath = `${folder}/${fileName}`
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

export async function deleteNewsImage(publicUrl: string): Promise<boolean> {
  try {
    const bucketName = 'news'

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
