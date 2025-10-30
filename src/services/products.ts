import { supabase } from '@/lib/supabaseClient'
import { Product } from '@/types/product'

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw new Error(`Error al obtener productos: ${error.message}`)
  return data || []
}

export async function getProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error)
    throw new Error(`Error al obtener producto con id ${id}: ${error.message}`)
  return data || null
}

export async function createProduct(
  product: Omit<Product, 'id'>
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single()

  if (error) throw new Error(`Error al crear producto: ${error.message}`)
  return data
}

export async function updateProduct(id: number, product: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()

  if (error) throw new Error(`Error al actualizar producto: ${error.message}`)
  return data
}

export async function deleteProduct(id: number): Promise<boolean> {
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    console.error('Error al eliminar producto:', error)
    return false
  }

  return true
}
