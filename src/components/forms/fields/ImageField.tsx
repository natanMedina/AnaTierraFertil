import { ChangeEvent } from 'react'

export default function ImageField({
  imagePreview,
  onImageSelect,
  error,
}: {
  imagePreview?: string
  onImageSelect: (file: File, previewUrl: string) => void
  error?: string
}) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return

    onImageSelect(file, URL.createObjectURL(file))
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow">
      <label className="w-60 h-60 rounded-2xl flex items-center justify-center bg-gray-200 cursor-pointer overflow-hidden">
        {imagePreview ? (
          <img
            src={imagePreview}
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
      {error && <p className="text-center form-field-error">{error}</p>}
    </div>
  )
}
