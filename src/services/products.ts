import { getSupabaseBrowserClient } from '@/lib/supabaseClient'
import { Product } from '@/types/product'

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw new Error(`Error al obtener productos: ${error.message}`)
  return data || []
}

export async function getProductById(id: number): Promise<Product | null> {
  const supabase = getSupabaseBrowserClient()
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
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single()

  if (error) throw new Error(`Error al crear producto: ${error.message}`)
  return data
}

export async function updateProduct(id: number, product: Partial<Product>) {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()

  if (error) throw new Error(`Error al actualizar producto: ${error.message}`)
  return data
}

export async function deleteProduct(id: number): Promise<boolean> {
  const supabase = getSupabaseBrowserClient()
  try {
    // Obtener el producto para acceder a su imagen
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('photo_url')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error al obtener producto antes de eliminar:', fetchError)
      return false
    }

    // Eliminar el registro del producto
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (deleteError) {
      console.error('Error al eliminar producto:', deleteError)
      return false
    }

    // Si tiene imagen, eliminarla del bucket
    if (product?.photo_url) {
      await deleteProductImage(product.photo_url)
    }

    return true
  } catch (err) {
    console.error('Error general al eliminar producto:', err)
    return false
  }
}

// Funciones para imagenes en el bucket
export async function uploadProductImage(file: File): Promise<string | null> {
  const supabase = getSupabaseBrowserClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}${Date.now()}.${fileExt}`
  const bucketName = 'products'
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

export async function deleteProductImage(publicUrl: string): Promise<boolean> {
  const supabase = getSupabaseBrowserClient()
  try {
    const bucketName = 'products'

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

    const { data: removed, error } = await supabase.storage
      .from(bucketName)
      .remove([filePath])
    console.log('REMOVE RESULT:', removed)
    console.log('REMOVE ERROR:', error)

    console.log('basePublicPath =>', basePublicPath)
    console.log('publicUrl =>', publicUrl)
    console.log('filePath =>', filePath)

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
