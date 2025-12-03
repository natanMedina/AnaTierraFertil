'use client'

import { useState, ChangeEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { createMoment, uploadMomentImage } from '@/services/moments'
import { Moments } from '@/types/moments'

interface MomentsCardProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (newMoment: Moments) => void
}

export function MomentsCard({ isOpen, onClose, onSuccess }: MomentsCardProps) {
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const MAX_CHARACTERS = 140
  const isOverLimit = description.length > MAX_CHARACTERS

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    if (!description.trim()) {
      toast.error('Por favor ingresa una descripción')
      return
    }

    if (!imageFile) {
      toast.error('Por favor selecciona una imagen')
      return
    }

    setIsLoading(true)
    try {
      // Subir la imagen primero
      const photoUrl = await uploadMomentImage(imageFile)
      if (!photoUrl) {
        toast.error('Error al subir la imagen')
        return
      }

      // Crear el momento con la URL de la imagen
      const newMoment = await createMoment({
        description: description.trim(),
        photo_url: photoUrl,
      })

      toast.success('Momento especial creado exitosamente')
      onSuccess(newMoment)
      handleClose()
    } catch (error) {
      console.error('Error al crear momento:', error)
      toast.error('Error al crear el momento especial')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setDescription('')
    setImageFile(null)
    setImagePreview(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Crear Momento Especial
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Área de imagen */}
          <div className="relative">
            <label
              htmlFor="moment-image"
              className="block w-full h-64 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-300 transition-colors"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                  Inserte imagen
                </div>
              )}
            </label>
            <input
              id="moment-image"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            {!imageFile && (
              <p className="text-red-600 text-sm font-semibold mt-2">
                * La imagen es obligatoria
              </p>
            )}
          </div>

          {/* Campo de descripción */}
          <div>
            <Textarea
              placeholder="Descripción..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[60px] resize-none bg-white border-gray-300"
            />
            <div className="flex justify-between items-center mt-1 text-sm">
              <span
                className={`${isOverLimit ? 'text-red-600 font-semibold' : 'text-gray-500'}`}
              >
                {description.length}/{MAX_CHARACTERS} caracteres
              </span>
              {isOverLimit && (
                <span className="text-red-600 font-semibold">
                  Máximo de caracteres excedido
                </span>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-2">
            <Button
              onClick={handleSave}
              disabled={isLoading || isOverLimit || !imageFile}
              variant="admin"
              className="flex-1"
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button
              onClick={handleClose}
              variant="outline"
              disabled={isLoading}
              className="flex-1 bg-gray-300 hover:bg-gray-400 border-none"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
