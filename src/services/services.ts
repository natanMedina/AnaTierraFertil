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
