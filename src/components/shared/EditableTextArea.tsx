'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Edit, Check, X } from 'lucide-react'

interface EditableTextAreaProps {
  value: string
  onSave: (newValue: string) => Promise<void>
  isEditMode: boolean
  className?: string
  textareaClassName?: string
  minRows?: number
  centerButton?: boolean
  buttonMargin?: string
  maxCharacters?: number
}

export function EditableTextArea({
  value,
  onSave,
  isEditMode,
  className = '',
  textareaClassName = '',
  minRows = 3,
  centerButton = false,
  buttonMargin = 'mt-2',
  maxCharacters,
}: EditableTextAreaProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isSaving, setIsSaving] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isOverLimit = maxCharacters ? editValue.length > maxCharacters : false

  // Auto-ajustar altura del textarea
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [isEditing, editValue])

  const handleEdit = () => {
    setEditValue(value)
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (editValue.trim() === '') return

    setIsSaving(true)
    try {
      await onSave(editValue)
      setIsEditing(false)
    } catch (error) {
      console.error('Error al guardar:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  if (!isEditMode) {
    return <div className={`whitespace-pre-wrap ${className}`}>{value}</div>
  }

  if (isEditing) {
    return (
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className={`${textareaClassName} overflow-hidden resize-none`}
          rows={minRows}
          disabled={isSaving}
        />
        {maxCharacters && (
          <div className="flex justify-center mt-1 text-sm">
            <span
              className={`${isOverLimit ? 'text-red-600 font-semibold' : 'text-gray-500'}`}
            >
              {editValue.length}/{maxCharacters} caracteres
            </span>
          </div>
        )}
        <div
          className={`flex gap-2 ${buttonMargin} ${centerButton ? 'justify-center' : ''}`}
        >
          <Button
            onClick={handleSave}
            disabled={isSaving || editValue.trim() === '' || isOverLimit}
            size="sm"
            className="bg-admin hover:bg-admin/80 text-white"
          >
            <Check className="w-4 h-4 mr-1" />
            {isSaving ? 'Guardando...' : 'Guardar'}
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isSaving}
            size="sm"
            variant="outline"
          >
            <X className="w-4 h-4 mr-1" />
            Cancelar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className={`whitespace-pre-wrap ${className}`}>{value}</div>
      <div className={centerButton ? 'flex justify-center' : ''}>
        <Button
          onClick={handleEdit}
          size="sm"
          className={`${buttonMargin} bg-admin hover:bg-admin/80 text-white`}
        >
          <Edit className="w-4 h-4 mr-1" />
          Editar
        </Button>
      </div>
    </div>
  )
}
