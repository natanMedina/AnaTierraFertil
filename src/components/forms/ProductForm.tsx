'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  getProductById,
  createProduct,
  updateProduct,
  uploadProductImage,
} from '@/services/products'
import { Product } from '@/types/product'
import { useAdmin } from '@/context/AdminContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { getYouTubeEmbedUrl } from '@/utils/formatters'
import FormSkeleton from '../shared/FormSkeleton'

interface ProductFormProps {
  id?: number
}

export default function ProductForm({ id }: ProductFormProps) {
  const router = useRouter()
  const { isAdmin, isLoading } = useAdmin()
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    category: '',
    price: 0,
    photo_url: '',
    video_url: '',
  })
  const [localImagePreview, setLocalImagePreview] = useState<string | null>(
    null
  )
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [videoLink, setVideoLink] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirigir si no es admin
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/')
    }
  }, [isAdmin, isLoading, router])

  // Cargar datos si hay id
  useEffect(() => {
    const fetchProduct = async () => {
      if (id && isAdmin) {
        const data = await getProductById(Number(id))
        if (data) {
          setProduct(data)
          setVideoLink(data.video_url || '')
          if (data.photo_url) setLocalImagePreview(data.photo_url)
        }
      }
    }
    fetchProduct()
  }, [id, isAdmin])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return

    // liberar preview anterior si era object URL
    if (localImagePreview && localImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(localImagePreview)
    }

    const previewUrl = URL.createObjectURL(file)
    setLocalImagePreview(previewUrl)
    setSelectedImageFile(file)
  }

  const uploadImageAndGetUrl = async (): Promise<string | null> => {
    if (!selectedImageFile) {
      // no hay nuevo archivo -> mantener product.photo_url actual
      return product.photo_url || null
    }

    // subir archivo al storage
    try {
      const uploadedUrl = await uploadProductImage(selectedImageFile)
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
    if (!isAdmin) return
    setIsSubmitting(true)

    try {
      // 1) Si hay imagen nueva -> subirla y obtener URL
      let finalPhotoUrl = product.photo_url
      if (selectedImageFile) {
        toast('Subiendo imagen...', { id: 'upload-start' })
        const uploadedUrl = await uploadImageAndGetUrl()
        if (!uploadedUrl) {
          toast.error('Error al subir la imagen')
          setIsSubmitting(false)
          return
        }
        finalPhotoUrl = uploadedUrl
        // actualizamos el producto local con la url resultante
        setProduct((prev) => ({ ...prev, photo_url: uploadedUrl }))
        toast.success('Imagen subida correctamente')
      }

      // 2) Preparar payload final
      const payload: Omit<Product, 'id'> = {
        ...product,
        photo_url: finalPhotoUrl,
        video_url: videoLink || product.video_url || '',
      }

      // 3) Crear o actualizar producto
      const success = id
        ? await updateProduct(Number(id), payload)
        : await createProduct(payload)

      if (success) {
        toast.success(id ? 'Producto actualizado' : 'Producto creado')
        router.push(id ? `/products/${id}` : '/products')
      } else {
        toast.error('Error al guardar el producto')
      }
    } catch (err) {
      console.error(err)
      toast.error('Ocurrió un error inesperado')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading)
    return (
      <FormSkeleton/>
    )

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row w-full bg-white"
    >
      {/* COLUMNA IZQUIERDA */}
      <div className="w-full md:w-4/12 px-12 py-10 flex flex-col gap-6">
        {/* Nombre */}
        <div className="flex flex-col gap-2">
          <label>Nombre</label>
          <Input
            placeholder="Nombre del producto"
            className="text-xl font-semibold"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        {/* Línea separadora */}
        <div className="h-1 w-60 bg-brand mb-6"></div>

        {/* Descripción */}
        <div className="flex flex-col gap-2">
          <label>Descripción</label>
          <Textarea
            placeholder="Descripción del producto"
            className="h-48 resize-none"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>

        {/* Categoría */}
        <div className="flex flex-col mt-auto gap-2">
          <label>Categoría</label>
          <Input
            placeholder="Categoría del producto"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />
        </div>
      </div>

      {/* COLUMNA DERECHA */}
      <div
        className="relative  w-full md:w-8/12 flex flex-col p-6 bg-green-100 bg-cover bg-center"
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
            onClick={() => router.push(id ? `/products/${id}` : '/products')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Cuadros de imagen y video */}
        <div className="flex justify-center gap-10 mt-20">
          {/* Imagen */}
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow">
            <label className="w-60 h-60 rounded-2xl flex items-center justify-center bg-gray-200 cursor-pointer overflow-hidden">
              {localImagePreview ? (
                <img
                  src={localImagePreview}
                  alt="Imagen"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-500">Seleccionar Imagen</span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <label className="max-w-sm text-center p-2 border-2 border-gray-200 rounded-sm text-gray-400 text-sm">
              Pulse la Imagen para cambiarla
            </label>
          </div>

          {/* Video */}
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow">
            <div className="w-60 h-60 rounded-2xl flex flex-col items-center justify-center bg-gray-200 overflow-hidden">
              {videoLink && getYouTubeEmbedUrl(videoLink) ? (
                <iframe
                  src={getYouTubeEmbedUrl(videoLink)!}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <span className="text-gray-500">Video</span>
              )}
              {/* Campo para link de YouTube */}
            </div>
            <Input
              placeholder="Enlace de YouTube"
              className="max-w-sm text-center"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
          </div>
        </div>

        {/* Cuadro inferior con precio */}
        <div className="mt-10 mx-auto w-64 bg-white rounded-2xl shadow p-4 flex flex-col items-center gap-3">
          <label>{'Precio (pesos col.)'}</label>
          <Input
            placeholder="Valor en pesos (COP)"
            type="number"
            min={0}
            max={15000000}
            className="text-center font-bold text-lg"
            value={product.price === 0 ? '' : product.price}
            onChange={(e) => {
              setProduct({
                ...product,
                price: Number(e.target.value),
              })
            }}
          />
        </div>

        {/* Botón guardar */}
        <Button
          type="submit"
          className="absolute bottom-6 right-6 admin-btn admin-btn--primary w-40 mx-auto mt-10"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Guardando...'
            : id
              ? 'Guardar cambios'
              : 'Crear producto'}
        </Button>
      </div>
    </form>
  )
}
