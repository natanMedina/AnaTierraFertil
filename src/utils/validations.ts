import { Product } from '@/types/product'
import { getYouTubeEmbedUrl } from '@/utils/formatters'

// expresión regular para URLs de YouTube (youtu.be o youtube.com)
const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}(&.*)?$/

export function validateProduct(
  product: Omit<Product, 'id'>,
  localImagePreview?: string
) {
  const errors = {
    name: '',
    description: '',
    category: '',
    price: '',
    photo_url: '',
    video_url: '',
  }

  // Nombre
  if (!product.name.trim()) {
    errors.name = 'El nombre es obligatorio'
  } else if (product.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres'
  } else if (product.name.trim().length > 100) {
    errors.name = 'El nombre no puede tener más de 100 caracteres'
  }

  // Descripción
  if (!product.description.trim()) {
    errors.description = 'La descripción es obligatoria'
  } else if (product.description.trim().length > 500) {
    errors.description = 'La descripción no puede tener más de 500 caracteres'
  }

  // Categoría
  if (!product.category.trim()) {
    errors.category = 'La categoría es obligatoria'
  }

  // Imagen
  if (!localImagePreview) {
    errors.photo_url = 'La imagen es obligatoria'
  }

  // Precio
  if (!product.price || product.price <= 1) {
    errors.price = 'Ingrese un valor mayor a 1'
  } else if (!Number.isInteger(product.price)) {
    errors.price = 'Ingrese un número sin . ,'
  } else if (product.price > 10 ** 7) {
    errors.price = 'Ingrese un valor menor'
  }

  // Video
  if (product.video_url && product.video_url.trim() !== '') {
    if (!YOUTUBE_REGEX.test(product.video_url.trim())) {
      errors.video_url = 'Debe ser un enlace válido de YouTube'
    } else if (!getYouTubeEmbedUrl(product.video_url.trim())) {
      errors.video_url = 'El enlace de YouTube no es válido'
    }
  }

  const isValid = Object.values(errors).every((e) => e === '')
  return { errors, isValid }
}
