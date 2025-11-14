'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  getNewsById,
  createNews,
  updateNews,
  uploadNewsImage,
  deleteNewsImage,
} from '@/services/news'
import { News } from '@/types/news'
import { useAdmin } from '@/context/AdminContext'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import FormSkeleton from './FormSkeleton'
import { validateNews } from '@/utils/validations'
import ImageField from './fields/ImageField'
import TextField from './fields/TextField'
import TextAreaField from './fields/TextAreaField'

interface NewsFormProps {
  id?: number
}

export default function NewsForm({ id }: NewsFormProps) {
  const router = useRouter()
  const { isAdmin, isLoading } = useAdmin()
  const [validation, setValidation] = useState({
    errors: {
      title: '',
      description: '',
      photo_url: '',
      date: '',
    },
    isValid: false,
  })

  const [news, setNews] = useState<Omit<News, 'id'>>({
    title: '',
    description: '',
    photo_url: '',
    date: new Date().toISOString().split('T')[0], // Fecha actual por defecto
  })
  const [localImagePreview, setLocalImagePreview] = useState<
    string | undefined
  >(undefined)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [isNewsLoaded, setIsNewsLoaded] = useState(!id)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirigir si no es admin
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/')
    }
  }, [isAdmin, isLoading, router])

  // Cargar datos si hay id
  useEffect(() => {
    const fetchNews = async () => {
      if (id && isAdmin) {
        const data = await getNewsById(Number(id))
        if (data) {
          setNews(data)
          if (data.photo_url) setLocalImagePreview(data.photo_url)
        }
      }
      setIsNewsLoaded(true)
    }
    fetchNews()
  }, [id, isAdmin])

  useEffect(() => {
    if (isNewsLoaded) setValidation(validateNews(news, localImagePreview))
  }, [news, localImagePreview, isNewsLoaded])

  useEffect(
    () => () =>
      localImagePreview ? URL.revokeObjectURL(localImagePreview) : undefined,
    []
  )

  const uploadImageAndGetUrl = async (): Promise<string | null> => {
    if (!selectedImageFile) {
      // no hay nuevo archivo -> mantener news.photo_url actual
      return news.photo_url || null
    }

    // subir archivo al storage
    try {
      const uploadedUrl = await uploadNewsImage(selectedImageFile)
      if (!uploadedUrl) {
        throw new Error('No se obtuvo URL tras la subida')
      }
      return uploadedUrl
    } catch (err) {
      console.error('Error subiendo imagen:', err)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin || !validation.isValid) return

    setIsSubmitting(true)

    try {
      const oldImageUrl = news.photo_url // guardar la imagen actual antes de editar
      let uploadedUrl: string | null = oldImageUrl

      // 1) Si hay imagen nueva -> subirla y obtener URL
      if (selectedImageFile) {
        uploadedUrl = await uploadImageAndGetUrl()

        if (!uploadedUrl) {
          toast.error('Error al subir la nueva imagen')
          setIsSubmitting(false)
          return
        }

        setNews((prev) => ({
          ...prev,
          photo_url: uploadedUrl || oldImageUrl,
        }))
        toast.success('Nueva imagen subida correctamente')
      }

      // 2) Preparar payload final
      const payload: Omit<News, 'id'> = {
        ...news,
        photo_url: uploadedUrl || oldImageUrl,
      }

      // 3) Crear o actualizar noticia
      const success = id
        ? await updateNews(Number(id), payload)
        : await createNews(payload)

      if (success) {
        toast.success(id ? 'Noticia actualizada' : 'Noticia creada')

        // Si se actualizó y se cambió la imagen, eliminar la anterior
        if (
          id &&
          selectedImageFile &&
          oldImageUrl &&
          oldImageUrl !== uploadedUrl
        ) {
          try {
            await deleteNewsImage(oldImageUrl)
          } catch (deleteErr) {
            console.warn(
              '⚠️ No se pudo eliminar la imagen anterior:',
              deleteErr
            )
          }
        }

        router.push('/news')
      } else {
        toast.error('Error al guardar la noticia')
      }
    } catch (err) {
      console.error(err)
      toast.error('Ocurrió un error inesperado')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <FormSkeleton />

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row w-full bg-white"
    >
      {/* COLUMNA IZQUIERDA */}
      <div className="w-full md:w-4/12 px-12 py-10 flex flex-col gap-6">
        {/* Título */}
        <TextField
          label="Título"
          placeholder="Título de la noticia"
          value={news.title}
          onChange={(e) => setNews({ ...news, title: e.target.value })}
          error={validation.errors.title}
          disabled={isSubmitting}
        />

        <div className="h-1 w-60 bg-brand mb-6"></div>

        {/* Descripción */}
        <TextAreaField
          label="Descripción"
          placeholder="Descripción de la noticia"
          value={news.description}
          onChange={(e) => setNews({ ...news, description: e.target.value })}
          error={validation.errors.description}
          disabled={isSubmitting}
        />

        {/* Fecha */}
        <div className="mt-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha
          </label>
          <input
            type="date"
            value={news.date}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setNews({ ...news, date: e.target.value })}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {validation.errors.date && (
            <p className="mt-1 text-sm text-red-600">
              {validation.errors.date}
            </p>
          )}
        </div>
      </div>

      {/* COLUMNA DERECHA */}
      <div
        className="relative w-full md:w-8/12 flex flex-col p-6 bg-green-100 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/form-bg.jpg')",
        }}
      >
        {/* Botón volver */}
        <div className="absolute flex flex-col top-6 right-6 gap-2">
          <Button
            type="button"
            variant="secondary"
            className="flex items-center ml-auto w-min gap-2 text-white font-bold bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-sm transition"
            onClick={() => router.push('/news')}
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Imagen centrada */}
        <div className="flex justify-center items-center flex-1 mt-20">
          <ImageField
            imagePreview={localImagePreview}
            onImageSelect={(file: File, previewUrl: string) => {
              setSelectedImageFile(file)
              setLocalImagePreview(previewUrl)
            }}
            error={validation.errors.photo_url}
            disabled={isSubmitting}
          />
        </div>

        {/* Botón guardar */}
        <Button
          type="submit"
          variant="admin"
          className="absolute bottom-6 right-6 w-40 mx-auto"
          disabled={isSubmitting || !validation.isValid}
        >
          {isSubmitting
            ? 'Guardando...'
            : id
              ? 'Guardar cambios'
              : 'Crear noticia'}
        </Button>
      </div>
    </form>
  )
}
