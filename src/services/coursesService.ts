import { supabase } from '@/lib/supabaseClient'
import { Course } from '@/types/course'

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw new Error(`Error al obtener cursos: ${error.message}`)
  return data || []
}

export async function createCourse(
  course: Omit<Course, 'id'>
): Promise<Course> {
  const { data, error } = await supabase
    .from('courses')
    .insert([course])
    .select()
    .single()

  if (error) throw new Error(`Error al crear curso: ${error.message}`)
  return data
}

export async function updateCourse(id: number, course: Partial<Course>) {
  const { data, error } = await supabase
    .from('courses')
    .update(course)
    .eq('id', id)
    .select()

  if (error) throw new Error(`Error al actualizar curso: ${error.message}`)
  return data
}


export async function deleteCourse(id: number): Promise<boolean> {
  const { error } = await supabase.from('courses').delete().eq('id', id)

  if (error) {
    console.error('Error al eliminar curso:', error)
    return false
  }

  return true
}
