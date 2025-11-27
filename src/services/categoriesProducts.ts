import { supabase } from '@/lib/supabaseClient'
import { Category } from '@/types/category'

export async function getProductCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories_products')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw new Error(`Error al obtener categorías: ${error.message}`)
  return data || []
}
