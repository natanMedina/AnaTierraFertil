'use client'

import { useState, useEffect } from 'react'
import { Search } from '@/components/shared/Search'
import { NewsItem } from '@/components/item/NewsItem'
import { getNews } from '@/services/news'
import { News } from '@/types/news'

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [news, setNews] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getNews()
        setNews(data)
      } finally {
        setIsLoading(false)
      }
    }
    fetchNews()
  }, [])

  // Filtrar noticias según el término de búsqueda
  const filteredNews = news.filter((item) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100/50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-12 py-8">
        {/* Encabezado */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Novedades
          </h1>
          <Search placeholder="Buscar novedades ..." onSearch={setSearchTerm} />
        </div>

        {/* Lista de novedades */}
        <div className="flex flex-col gap-5">
          {isLoading ? (
            <p className="text-center text-gray-600">Cargando novedades...</p>
          ) : filteredNews.length === 0 ? (
            <p className="text-center text-gray-600">
              No se encontraron novedades.
            </p>
          ) : (
            filteredNews.map((item) => (
              <NewsItem
                key={item.id}
                title={item.title}
                description={item.description}
                imageUrl={item.photo_url}
                className="px-4 py-4"
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
