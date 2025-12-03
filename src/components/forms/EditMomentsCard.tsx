'use client'

import { useState, ChangeEvent, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import {
  updateMoment,
  deleteMoment,
  uploadMomentImage,
  deleteMomentImage,
} from '@/services/moments'
import { Moments } from '@/types/moments'
import { Trash2 } from 'lucide-react'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

interface EditMomentsCardProps {
  isOpen: boolean
  onClose: () => void
  moment: Moments | null
  onSuccess: () => void
}

export function EditMomentsCard({
  isOpen,
  onClose,
  moment,
  onSuccess,
}: EditMomentsCardProps) {
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const MAX_CHARACTERS = 140
  const isOverLimit = description.length > MAX_CHARACTERS

  useEffect(() => {
    if (moment) {
      setDescription(moment.description)
      setImagePreview(moment.photo_url)
    } else {
      setDescription('')
      setImagePreview(null)
    }
    setImageFile(null)
  }, [moment])

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
    if (!moment) return

    if (!description.trim()) {
      toast.error('Por favor ingresa una descripción')
      return
    }

    setIsLoading(true)
    try {
      let photoUrl = moment.photo_url

      // Si hay una nueva imagen, subirla
      if (imageFile) {
        const newPhotoUrl = await uploadMomentImage(imageFile)
        if (!newPhotoUrl) {
          toast.error('Error al subir la imagen')
          setIsLoading(false)
          return
        }

        // Eliminar la imagen anterior
        if (moment.photo_url) {
          await deleteMomentImage(moment.photo_url)
        }

        photoUrl = newPhotoUrl
      }

      // Actualizar el momento
      await updateMoment(moment.id, {
        description: description.trim(),
        photo_url: photoUrl,
      })

      toast.success('Momento actualizado exitosamente')
      onSuccess()
      handleClose()
    } catch (error) {
      console.error('Error al actualizar momento:', error)
      toast.error('Error al actualizar el momento especial')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!moment) return

    setIsLoading(true)
    try {
      const success = await deleteMoment(moment.id)
      if (success) {
        toast.success('Momento eliminado exitosamente')
        onSuccess()
        handleClose()
      } else {
        toast.error('Error al eliminar el momento')
      }
    } catch (error) {
      console.error('Error al eliminar momento:', error)
      toast.error('Error al eliminar el momento especial')
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

  if (!moment) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Editar Momento Especial
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Área de imagen */}
          <div className="relative">
            <label
              htmlFor="edit-moment-image"
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
                  Seleccionar imagen
                </div>
              )}
            </label>
            <input
              id="edit-moment-image"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            {!imagePreview && (
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
              disabled={isLoading || isOverLimit || !imagePreview}
              variant="admin"
              className="flex-1"
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
            <ConfirmDialog
              title="¿Eliminar momento especial?"
              description="Esta acción eliminará el momento de forma permanente."
              confirmText={isLoading ? 'Eliminando...' : 'Eliminar'}
              cancelText="Cancelar"
              onConfirm={handleDelete}
              icon={<Trash2 className="w-5 h-5 text-red-600" />}
              iconBg="bg-red-100"
              trigger={
                <Button
                  variant="admin_destructive"
                  disabled={isLoading}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              }
            />
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
