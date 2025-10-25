'use client'

import { useEffect, useState } from 'react'
import { getCourses, createCourse, updateCourse, deleteCourse } from '@/services/coursesService'
import { Course } from '@/types/course'

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [form, setForm] = useState<Omit<Course, 'id'>>({
    title: '',
    description: '',
    price: 0,
    photo: '',
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // Load courses
  useEffect(() => {
    fetchCourses()
  }, [])

  async function fetchCourses() {
    const data = await getCourses()
    setCourses(data)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.description) return alert('Completa los campos')
    setLoading(true)
    try {
      await createCourse(form)
      await fetchCourses()
      setForm({ title: '', description: '', price: 0, photo: '' })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleEdit(course: Course) {
    setEditingId(course.id!)
    setForm({
      title: course.title,
      description: course.description,
      price: course.price,
      photo: course.photo,
    })
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (!editingId) return
    setLoading(true)
    try {
      await updateCourse(editingId, form)
      setEditingId(null)
      setForm({ title: '', description: '', price: 0, photo: '' })
      await fetchCourses()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este curso?')) return
    setLoading(true)
    try {
      await deleteCourse(id)
      await fetchCourses()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestión de Cursos</h1>

      {/* Formulario */}
      <form
        onSubmit={editingId ? handleUpdate : handleCreate}
        className="space-y-3 border p-4 rounded-md bg-gray-50"
      >
        <h2 className="font-semibold">
          {editingId ? 'Editar curso' : 'Crear nuevo curso'}
        </h2>
        <input
          type="text"
          placeholder="Título"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Descripción"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="URL de la imagen (por ahora manual)"
          value={form.photo}
          onChange={e => setForm({ ...form, photo: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading
            ? 'Guardando...'
            : editingId
            ? 'Actualizar curso'
            : 'Crear curso'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setForm({ title: '', description: '', price: 0, photo: '' })
            }}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de cursos */}
      <div className="space-y-4">
        {courses.map(course => (
          <div
            key={course.id}
            className="border p-4 rounded-md flex justify-between items-start bg-white"
          >
            <div>
              <h2 className="font-semibold text-lg">{course.title}</h2>
              <p className="text-sm text-gray-700">{course.description}</p>
              <p className="font-medium mt-1">${course.price}</p>
              {course.photo && (
                <img
                  src={course.photo}
                  alt={course.title}
                  className="mt-2 w-32 h-20 object-cover rounded"
                />
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(course)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(course.id!)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
