'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  getProductById,
  createProduct,
  updateProduct,
} from '@/services/products'
import { Product } from '@/types/product'
import { useAdmin } from '@/context/AdminContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

interface ProductFormProps {
  id?: number
}

export default function ProductForm({ id }: ProductFormProps) {
  const router = useRouter()
  const { isAdmin, isLoading } = useAdmin()
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    category: '',
    price: 0,
    photo_url: '',
    video_url: '',
  })

  // Redirigir si no es admin, después de cargar
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/')
    }
  }, [isAdmin, isLoading, router])

  useEffect(() => {
    const fetchProduct = async () => {
      if (id && isAdmin) {
        const data = await getProductById(Number(id))
        if (data) setProduct(data)
      }
    }
    fetchProduct()
  }, [id, isAdmin])

  if (isLoading) {
    return <p className="text-center text-gray-500">Cargando...</p>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin) return

    const success = id
      ? await updateProduct(Number(id), product)
      : await createProduct(product)

    if (success) {
      toast.success(id ? 'Producto actualizado' : 'Producto creado')
      router.push('/products')
    } else {
      toast.error('Error al guardar el producto')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        {id ? 'Editar producto' : 'Nuevo producto'}
      </h2>

      <Input
        placeholder="Nombre"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <Input
        placeholder="Precio"
        type="number"
        value={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
      />
      <Input
        placeholder="Descripción"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <Input
        placeholder="URL de imagen"
        value={product.photo_url}
        onChange={(e) => setProduct({ ...product, photo_url: e.target.value })}
      />

      <Button type="submit" className="admin-btn">
        {id ? 'Guardar cambios' : 'Crear producto'}
      </Button>
    </form>
  )
}
