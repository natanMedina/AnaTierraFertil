import { supabase } from '@/lib/supabaseClient'
import { Category } from '@/types/category'

export async function getServiceCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories_services')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw new Error(`Error al obtener categorías: ${error.message}`)
  return data || []
}

export async function getServiceCategoryById(
  id: number
): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories_services')
    .select('*')
    .eq('id', id)
    .single()

  if (error)
    throw new Error(`Error al obtener categoría con id ${id}: ${error.message}`)
  return data || null
}
