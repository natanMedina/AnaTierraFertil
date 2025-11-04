'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { getYouTubeEmbedUrl } from '@/utils/formatters'

interface PurchaseOption {
  title: string
  buttonText: string
  price: number
}

interface InfoDisplayProps {
  title: string
  description: string
  category: string
  photoUrl: string
  videoUrl: string
  purchaseOptions: PurchaseOption[]
}

export default function InfoDisplay({
  title,
  description,
  category,
  photoUrl,
  videoUrl,
  purchaseOptions,
}: InfoDisplayProps) {
  return (
    <div className="w-full flex flex-col md:flex-row bg-white">
      {/* Columna izquierda */}
      <div className="w-full md:w-4/12 px-12 py-10 flex flex-col">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          {title}
        </h1>
        <div className="h-1 w-60 bg-brand mb-6"></div>
        <p className="text-gray-700 leading-relaxed mb-8">{description}</p>
        <p className="text-gray-500 text-sm mt-auto mb-1">
          <span className="font-semibold">Categoría:</span> {category}
        </p>
      </div>

      {/* Columna derecha */}
      <div
        className="relative w-full md:w-8/12 flex flex-col items-center justify-start p-8 bg-green-100 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/detail-bg.jpg")',
        }}
      >
        {/* Botón volver */}
        <div className="absolute top-6 right-6">
          <Link
            href="/products"
            className="text-white font-bold bg-red-300 hover:bg-red-500 px-4 py-2 rounded-md text-sm transition"
          >
            ← Volver
          </Link>
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
            <p className="text-gray-500 italic">Sin multimedia disponible</p>
          )}
        </div>

        {/* Lista de opciones de compra */}
        <div className="mt-10 flex flex-wrap justify-center gap-15">
          {purchaseOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white/60 backdrop-blur-sm shadow-lg rounded-xl p-6 w-60"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {option.title}
              </h3>
              <p className="text-black text-xl font-bold mb-3">
                ${option.price.toLocaleString() + ' pesos col.'}
              </p>
              <Button className="bg-brand hover:bg-brand/80 text-white font-medium px-4 py-2 rounded-md transition">
                {option.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
