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
import { ScrollArea } from '@/components/ui/scroll-area'

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
    <div className="container mx-auto px-4 py-8">
      {/* Botón volver */}
      <Button
        type="button"
        variant="secondary"
        className="flex items-center gap-2 mb-6"
        onClick={() => router.push('/news')}
        disabled={isSubmitting}
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </Button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white/95 shadow-sm border border-gray-200 rounded-lg overflow-hidden h-64">
          <div className="flex h-full">
            {/* Imagen rectangular a la izquierda - similar a NewsItem */}
            <div className="w-86 h-full flex-shrink-0">
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

            {/* Contenido derecho - similar a NewsItem */}
            <div className="flex-1 flex flex-col min-w-0 h-full p-6">
              {/* Encabezado con título y fecha */}
              <div className="flex flex-col gap-2 mb-4 flex-shrink-0">
                <div className="flex items-start justify-between gap-4">
                  {/* Campo de título */}
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      placeholder="Título de la noticia"
                      value={news.title}
                      onChange={(e) =>
                        setNews({ ...news, title: e.target.value })
                      }
                      disabled={isSubmitting}
                      className="w-full text-xl font-semibold border-none focus:outline-none focus:ring-2 focus:ring-brand px-2 py-1 rounded bg-gray-100 placeholder:text-gray-400"
                    />
                    {validation.errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {validation.errors.title}
                      </p>
                    )}
                  </div>

                  {/* Campo de fecha */}
                  <div className="flex-shrink-0">
                    <input
                      type="date"
                      value={news.date}
                      max={new Date().toISOString().split('T')[0]}
                      onChange={(e) =>
                        setNews({ ...news, date: e.target.value })
                      }
                      disabled={isSubmitting}
                      className="text-sm text-gray-500 border-none rounded px-2 py-1 focus:ring-2 focus:ring-brand bg-gray-100"
                    />
                    {validation.errors.date && (
                      <p className="mt-1 text-sm text-red-600">
                        {validation.errors.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Descripción con ScrollArea similar a NewsItem */}
              <ScrollArea className="flex-1">
                <div className="pr-4">
                  <textarea
                    placeholder="Descripción de la noticia"
                    value={news.description}
                    onChange={(e) =>
                      setNews({ ...news, description: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full min-h-[120px] leading-relaxed border-none focus:outline-none focus:ring-2 focus:ring-brand p-2 rounded bg-gray-100 resize-none placeholder:text-gray-400 overflow-hidden break-all whitespace-pre-wrap"
                    rows={8}
                  />
                  {validation.errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {validation.errors.description}
                    </p>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Botón guardar fuera de la tarjeta */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="admin"
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
    </div>
  )
}
