'use client'

import { useState, ChangeEvent } from 'react'
import { Edit } from 'lucide-react'

interface EditableImageProps {
  src: string
  alt: string
  onImageChange: (file: File) => Promise<void>
  isEditMode: boolean
  className?: string
  containerClassName?: string
}

export function EditableImage({
  src,
  alt,
  onImageChange,
  isEditMode,
  className = '',
  containerClassName = '',
}: EditableImageProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      await onImageChange(file)
    } catch (error) {
      console.error('Error al cargar la imagen:', error)
    } finally {
      setIsUploading(false)
    }
  }

  if (!isEditMode) {
    return (
      <div className={containerClassName}>
        <img src={src} alt={alt} className={className} />
      </div>
    )
  }

  return (
    <div className={`relative ${containerClassName}`}>
      <img src={src} alt={alt} className={className} />
      <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer group">
        <div className="bg-brand text-white px-4 py-2 rounded-lg flex items-center gap-2 group-hover:scale-105 transition-transform">
          <Edit className="w-5 h-5" />
          <span className="font-medium">
            {isUploading ? 'Subiendo...' : 'Cambiar imagen'}
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
          disabled={isUploading}
        />
      </label>
    </div>
  )
}
