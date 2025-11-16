import { Product } from '@/types/product'
import { Service } from '@/types/service'
import { News } from '@/types/news'
import { SiteConfig } from '@/types/siteConfig'
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

export function validateService(
  service: Omit<Service, 'id'>,
  localImagePreview?: string
) {
  const errors = {
    name: '',
    description: '',
    category: '',
    price: '',
    photo_url: '',
    video_url: '',
    price_live_class: '',
  }

  // Nombre
  if (!service.name.trim()) {
    errors.name = 'El nombre es obligatorio'
  } else if (service.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres'
  } else if (service.name.trim().length > 100) {
    errors.name = 'El nombre no puede tener más de 100 caracteres'
  }

  // Descripción
  if (!service.description.trim()) {
    errors.description = 'La descripción es obligatoria'
  } else if (service.description.trim().length > 500) {
    errors.description = 'La descripción no puede tener más de 500 caracteres'
  }

  // Categoría
  if (!service.category.trim()) {
    errors.category = 'La categoría es obligatoria'
  }

  // Imagen
  if (!localImagePreview) {
    errors.photo_url = 'La imagen es obligatoria'
  }

  // Precio compra
  if (!service.price || service.price <= 1) {
    errors.price = 'Ingrese un valor mayor a 1'
  } else if (!Number.isInteger(service.price)) {
    errors.price = 'Ingrese un número sin . ,'
  } else if (service.price > 10 ** 7) {
    errors.price = 'Ingrese un valor menor'
  }

  // Precio clases en vivo
  if (!service.price_live_class) {
  } else if (service.price_live_class <= 1) {
    errors.price_live_class = 'Ingrese un valor mayor a 1'
  } else if (!Number.isInteger(service.price_live_class)) {
    errors.price_live_class = 'Ingrese un número sin . ,'
  } else if (service.price_live_class > 10 ** 7) {
    errors.price_live_class = 'Ingrese un valor menor'
  }

  // Video
  if (service.video_url && service.video_url.trim() !== '') {
    if (!YOUTUBE_REGEX.test(service.video_url.trim())) {
      errors.video_url = 'Debe ser un enlace válido de YouTube'
    } else if (!getYouTubeEmbedUrl(service.video_url.trim())) {
      errors.video_url = 'El enlace de YouTube no es válido'
    }
  }

  const isValid = Object.values(errors).every((e) => e === '')
  return { errors, isValid }
}

export function validateSiteConfig(localSiteConfig: Omit<SiteConfig, 'id'>) {
  const errors = {
    // contact_username: '',
    contact_whatsapp: '',
  }

  // Contacto: Username
  // const usernameRegex = /^@([a-zA-Z][a-zA-Z0-9_-]*)(\.[a-zA-Z0-9_-]+)*$/
  // if (!localSiteConfig.contact_username.trim()) {
  //   errors.contact_username = 'El username es obligatorio'
  // } else if (!usernameRegex.test(localSiteConfig.contact_username)) {
  //   errors.contact_username = 'Formato no válido. Ejemplo: @juan.nombrepagina'
  // } else if (localSiteConfig.contact_username.trim().length < 3) {
  //   errors.contact_username = 'El username debe tener al menos 3 caracteres'
  // } else if (localSiteConfig.contact_username.trim().length > 40) {
  //   errors.contact_username = 'El username no puede tener más de 40 caracteres'
  // }

  // Contacto: Whatsapp
  const cellphoneRegex = /^\d{10}$/
  if (!localSiteConfig.contact_whatsapp.trim()) {
    errors.contact_whatsapp = 'El WhatsApp es obligatorio'
  } else if (!cellphoneRegex.test(localSiteConfig.contact_whatsapp)) {
    errors.contact_whatsapp = 'Número no válido. Debe tener 10 dígitos'
  }

  const isValid = Object.values(errors).every((e) => e === '')
  return { errors, isValid }
}

export function validateNews(
  news: Omit<News, 'id'>,
  localImagePreview?: string
) {
  const errors = {
    title: '',
    description: '',
    photo_url: '',
    date: '',
  }

  // Título
  if (!news.title.trim()) {
    errors.title = 'El título es obligatorio'
  } else if (news.title.trim().length < 3) {
    errors.title = 'El título debe tener al menos 3 caracteres'
  } else if (news.title.trim().length > 100) {
    errors.title = 'El título no puede tener más de 100 caracteres'
  }

  // Descripción
  if (!news.description.trim()) {
    errors.description = 'La descripción es obligatoria'
  } else if (news.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres'
  } else if (news.description.trim().length > 1000) {
    errors.description = 'La descripción no puede tener más de 1000 caracteres'
  }

  // Imagen
  if (!localImagePreview) {
    errors.photo_url = 'La imagen es obligatoria'
  }

  // Fecha
  if (!news.date) {
    errors.date = 'La fecha es obligatoria'
  } else {
    const selectedDate = new Date(news.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate > today) {
      errors.date = 'La fecha no puede ser futura'
    }
  }

  const isValid = Object.values(errors).every((e) => e === '')
  return { errors, isValid }
}
