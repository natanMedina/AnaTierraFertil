import { supabase } from '@/lib/supabaseClient'
import { News } from '@/types/news'

export async function getNews(): Promise<News[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('id', { ascending: true })

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
    throw new Error(`Error al obtener servicio con id ${id}: ${error.message}`)
  return data || null
}