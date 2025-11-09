'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  getProductById,
  createProduct,
  updateProduct,
  uploadProductImage,
  deleteProductImage,
} from '@/services/products'
import { Product } from '@/types/product'
import { useAdmin } from '@/context/AdminContext'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import FormSkeleton from './FormSkeleton'
import { validateProduct } from '@/utils/validations'
import ImageField from './fields/ImageField'
import VideoField from './fields/VideoField'
import TextField from './fields/TextField'
import TextAreaField from './fields/TextAreaField'
import NumberField from './fields/NumberField'

interface ProductFormProps {
  id?: number
}

export default function ProductForm({ id }: ProductFormProps) {
  const router = useRouter()
  const { isAdmin, isLoading } = useAdmin()
  const [validation, setValidation] = useState({
    errors: {
      name: '',
      description: '',
      category: '',
      price: '',
      photo_url: '',
      video_url: '',
    },
    isValid: false,
  })

  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    category: '',
    price: 0,
    photo_url: '',
    video_url: '',
  })
  const [localImagePreview, setLocalImagePreview] = useState<
    string | undefined
  >(undefined)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [isProductLoaded, setIsProductLoaded] = useState(!id)
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
          if (data.photo_url) setLocalImagePreview(data.photo_url)
        }
      }
      setIsProductLoaded(true)
    }
    fetchProduct()
  }, [id, isAdmin])

  useEffect(() => {
    if (isProductLoaded)
      setValidation(validateProduct(product, localImagePreview))
  }, [product, localImagePreview])

  useEffect(
    () => () =>
      localImagePreview ? URL.revokeObjectURL(localImagePreview) : undefined,
    []
  )

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
    if (!isAdmin || !validation.isValid) return

    setIsSubmitting(true)

    try {
      const oldImageUrl = product.photo_url // guardar la imagen actual antes de editar
      let uploadedUrl: string | null = oldImageUrl

      // 1) Si hay imagen nueva -> subirla y obtener URL
      if (selectedImageFile) {
        uploadedUrl = await uploadImageAndGetUrl()

        if (!uploadedUrl) {
          toast.error('Error al subir la nueva imagen')
          setIsSubmitting(false)
          return
        }

        setProduct((prev) => ({
          ...prev,
          photo_url: uploadedUrl || oldImageUrl,
        }))
        toast.success('Nueva imagen subida correctamente')
      }

      // 2) Preparar payload final
      const payload: Omit<Product, 'id'> = {
        ...product,
        photo_url: uploadedUrl || oldImageUrl,
      }

      // 3) Crear o actualizar producto
      const success = id
        ? await updateProduct(Number(id), payload)
        : await createProduct(payload)

      if (success) {
        toast.success(id ? 'Producto actualizado' : 'Producto creado')

        // Si se actualizó y se cambió la imagen, eliminar la anterior
        if (
          id &&
          selectedImageFile &&
          oldImageUrl &&
          oldImageUrl !== uploadedUrl
        ) {
          try {
            await deleteProductImage(oldImageUrl)
          } catch (deleteErr) {
            console.warn(
              '⚠️ No se pudo eliminar la imagen anterior:',
              deleteErr
            )
          }
        }

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

  if (isLoading) return <FormSkeleton />

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row w-full bg-white"
    >
      {/* COLUMNA IZQUIERDA */}
      <div className="w-full md:w-4/12 px-12 py-10 flex flex-col gap-6">
        {/* Nombre */}
        <TextField
          label="Nombre"
          placeholder="Nombre del producto"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          error={validation.errors.name}
        />

        <div className="h-1 w-60 bg-brand mb-6"></div>

        {/* Descripción */}
        <TextAreaField
          label="Descripción"
          placeholder="Descripción del producto"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          error={validation.errors.description}
        />

        {/* Categoría */}
        <div className="mt-auto">
          <TextField
            label="Categoría"
            placeholder="Categoría del producto"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            error={validation.errors.category}
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
          <ImageField
            imagePreview={localImagePreview}
            onImageSelect={(file: File, previewUrl: string) => {
              setSelectedImageFile(file)
              setLocalImagePreview(previewUrl)
            }}
            error={validation.errors.photo_url}
          />

          {/* Video */}
          <VideoField
            video_url={product.video_url}
            onChange={(e) =>
              setProduct({
                ...product,
                video_url: e.target.value,
              })
            }
            error={validation.errors.video_url}
          />
        </div>

        {/* Cuadro inferior con precio */}
        <div className="mt-10 mx-auto w-64">
          <NumberField
            label="Precio (pesos col.)"
            placeholder="Valor en pesos (COP)"
            value={product.price}
            min={0}
            max={10 ** 6}
            onChange={(e) => {
              setProduct({
                ...product,
                price: Number(e.target.value),
              })
            }}
            error={validation.errors.price}
          />
        </div>

        {/* Botón guardar */}
        <Button
          type="submit"
          className="absolute bottom-6 right-6 admin-btn admin-btn--primary w-40 mx-auto mt-10"
          disabled={isSubmitting || !validation.isValid}
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
