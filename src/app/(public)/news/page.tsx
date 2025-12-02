'use client'

import { useState, useEffect } from 'react'
import { Search } from '@/components/shared/Search'
import { NewsItem } from '@/components/item/NewsItem'
import { NewsItemSkeleton } from '@/components/item/NewsItemSkeleton'
import { getNews } from '@/services/news'
import { News } from '@/types/news'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/context/AdminContext'
import { CirclePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useCreateVisit } from '@/hooks/useRecordVisit'

export default function NewsPage() {
  useCreateVisit()
  const { editMode } = useAdmin()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [news, setNews] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

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

  useEffect(() => {
    // Resetear a la primera página cuando cambian los filtros
    setCurrentPage(1)
  }, [searchTerm])

  // Filtrar noticias según el término de búsqueda
  const filteredNews = news.filter((item) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    )
  })

  // Calcular paginación
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNews = filteredNews.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/news_bg.png')" }}
      >
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-8">
        {/* Encabezado */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Novedades
          </h1>
          <div className="flex gap-3 items-center">
            <Search
              placeholder="Buscar novedades ..."
              onSearch={setSearchTerm}
            />
            {/* Botón añadir */}
            {editMode && (
              <Button
                variant="admin"
                onClick={() => router.replace('/news/form')}
                className="whitespace-nowrap"
              >
                Añadir
                <CirclePlus className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Lista de novedades */}
        <div className="flex flex-col gap-5">
          {isLoading ? (
            // Mostrar 6 skeletons mientras carga
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <NewsItemSkeleton key={index} />
            ))
          ) : filteredNews.length === 0 ? (
            <p className="text-center text-gray-600">
              No se encontraron novedades.
            </p>
          ) : (
            paginatedNews.map((item) => (
              <NewsItem
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                imageUrl={item.photo_url}
                date={item.date}
                showActions={editMode}
                onDeleted={(deleteId) => {
                  setNews((prev) => prev.filter((n) => n.id !== deleteId))
                }}
              />
            ))
          )}
        </div>

        {/* Paginación */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((curr) => Math.max(1, curr - 1))
                    }
                    className={
                      currentPage === 1
                        ? 'pointer-events-none opacity-50 select-none'
                        : 'cursor-pointer select-none'
                    }
                  />
                </PaginationItem>

                {pageNumbers.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNumber)}
                      isActive={pageNumber === currentPage}
                      className="cursor-pointer select-none"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((curr) => Math.min(totalPages, curr + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50 select-none'
                        : 'cursor-pointer select-none'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}
