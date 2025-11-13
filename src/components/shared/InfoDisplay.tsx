'use client'

import { useAdmin } from '@/context/AdminContext'
import { Edit, Trash2, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { getYouTubeEmbedUrl } from '@/utils/formatters'
import { deleteProduct } from '@/services/products'
import ConfirmDialog from './ConfirmDialog'
import { ContactDialog } from '@/components/shared/ContactDialog'
import { deleteService } from '@/services/services'

interface PurchaseOption {
  title: string
  buttonText: string
  price: number
}

interface InfoDisplayProps {
  id: number
  title: string
  description: string
  category: string
  photoUrl: string
  videoUrl: string
  purchaseOptions: PurchaseOption[]
  basePath: string
}

export default function InfoDisplay({
  id,
  title,
  description,
  category,
  photoUrl,
  videoUrl,
  purchaseOptions,
  basePath,
}: InfoDisplayProps) {
  const { editMode } = useAdmin()
  const [isDeleting, setIsDeleting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState('')

  const router = useRouter()
  const elemento = basePath.includes('products') ? 'Producto' : 'Servicio'

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const success = basePath.includes('products')
        ? await deleteProduct(id)
        : await deleteService(id)
      if (success) {
        toast.success(`${elemento} eliminado`)
        router.push(basePath)
      } else {
        toast.error(`Error al eliminar el ${elemento.toLowerCase()}`)
      }
    } catch (error) {
      console.error(error)
      toast.warning('Ocurrió un error inesperado')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="w-full flex flex-col min-h-160 md:flex-row bg-white">
      {/* Columna izquierda */}
      <div className="w-full md:w-4/12 px-12 py-10 flex flex-col">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          {title}
        </h1>
        <div className="h-1 w-60 bg-brand mb-6"></div>
        <p className="text-gray-700 leading-relaxed mb-8 overflow-hidden">
          {description}
        </p>
        <p className="text-gray-500 text-sm mt-auto mb-1">
          <span className="font-semibold">Categoría:</span> {category}
        </p>
      </div>

      {/* Columna derecha */}
      <div
        className="relative w-full md:w-8/12 flex flex-col items-center justify-start p-8 bg-green-100 bg-cover bg-center gap-10"
        style={{
          backgroundImage: 'url("/images/detail-bg.jpg")',
        }}
      >
        {/* Botón volver */}
        <div className="absolute flex flex-col top-6 right-6 gap-2">
          <Button
            type="button"
            variant="secondary"
            className="flex items-center ml-auto w-min gap-2 text-white font-bold bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-sm transition"
            onClick={() => router.push(basePath)}
            disabled={isDeleting}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          {editMode && (
            <>
              <Button
                type="button"
                variant="admin"
                onClick={() => router.push(`${basePath}/form/${id}`)}
                disabled={isDeleting}
              >
                <Edit className="w-4 h-4" />
                Editar
              </Button>
              <ConfirmDialog
                title="¿Eliminar registro?"
                description={`Esta acción eliminará el ${elemento.toLowerCase()} de forma permanente.`}
                confirmText={isDeleting ? 'Eliminando...' : 'Eliminar'}
                cancelText="Cancelar"
                onConfirm={handleDelete}
                icon={<Trash2 className="w-5 h-5 text-red-600" />}
                iconBg="bg-red-100"
                trigger={
                  <Button variant="admin_destructive" disabled={isDeleting}>
                    <Trash2 className="w-4 h-4" />
                    Borrar
                  </Button>
                }
              />
            </>
          )}
        </div>

        {/* Video o imagen */}
        <div className="mt-16 w-full flex justify-center">
          {videoUrl ? (
            <div className="aspect-video w-full max-w-xl rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={getYouTubeEmbedUrl(videoUrl).replace(
                  'www.youtube.com',
                  'www.youtube-nocookie.com'
                )}
                title="Video"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : photoUrl ? (
            <img
              src={photoUrl}
              alt={title}
              className="bg-white max-h-80 max-w-full rounded-lg shadow-lg object-contain"
            />
          ) : (
            <div className="flex flex-col justify-center text-center bg-gray-100 h-80 w-2/4 rounded-lg shadow-lg">
              <p className="text-xl text-gray-500 italic">
                Sin multimedia disponible
              </p>
            </div>
          )}
        </div>

        {/* Lista de opciones de compra */}
        <div className="mt-auto flex flex-wrap justify-center gap-15">
          {purchaseOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white/60 backdrop-blur-sm shadow-lg rounded-xl p-6 w-fit min-w-56"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {option.title}
              </h3>
              <p className="text-black text-xl font-bold mb-3">
                ${option.price.toLocaleString() + ' pesos col.'}
              </p>
              <Button
                className="bg-brand hover:bg-brand/80 text-white font-medium px-4 py-2 rounded-md transition"
                onClick={() => {
                  const message = `Hola, quiero pagar y/o saber más información de el ${elemento}: ${title}, que cuesta ${option.price.toLocaleString()} pesos col. por favor.`
                  setSelectedMessage(message)
                  setDialogOpen(true)
                }}
                disabled={isDeleting}
              >
                {option.buttonText}
              </Button>
            </div>
          ))}
        </div>
        {/* Dialogo de contacto */}
        <ContactDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          message={selectedMessage}
        />
      </div>
    </div>
  )
}
