export default function ProductsPage() {
  return (
    <div>
      <h1>Admin: Productos</h1>
      <p>Página de Productos</p>
    </div>
  )
}

// 'use client'

// import { useEffect, useState } from 'react'
// import {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from '@/services/products'
// import { Product } from '@/types/product'

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [form, setForm] = useState<Omit<Product, 'id'>>({
//     name: '',
//     description: '',
//     category: '',
//     price: 0,
//     photo_url: '',
//     video_url: '',
//   })
//   const [editingId, setEditingId] = useState<number | null>(null)
//   const [loading, setLoading] = useState(false)

//   // Load products
//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   async function fetchProducts() {
//     const data = await getProducts()
//     setProducts(data)
//     console.log(data)
//   }

//   async function handleCreate(e: React.FormEvent) {
//     e.preventDefault()
//     if (!form.name || !form.description) return alert('Completa los campos')
//     setLoading(true)
//     try {
//       await createProduct(form)
//       await fetchProducts()
//       setForm({
//         name: '',
//         description: '',
//         category: '',
//         price: 0,
//         photo_url: '',
//         video_url: '',
//       })
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function handleEdit(product: Product) {
//     setEditingId(product.id!)
//     setForm({
//       name: product.name ?? '',
//       description: product.description ?? '',
//       category: product.category ?? '',
//       price: product.price ?? 0,
//       photo_url: product.photo_url ?? '',
//       video_url: product.video_url ?? '',
//     })
//   }

//   async function handleUpdate(e: React.FormEvent) {
//     e.preventDefault()
//     if (!editingId) return
//     setLoading(true)
//     try {
//       await updateProduct(editingId, form)
//       setEditingId(null)
//       setForm({
//         name: '',
//         description: '',
//         category: '',
//         price: 0,
//         photo_url: '',
//         video_url: '',
//       })
//       await fetchProducts()
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function handleDelete(id: number) {
//     if (!confirm('¿Seguro que quieres eliminar este producto?')) return
//     setLoading(true)
//     try {
//       await deleteProduct(id)
//       await fetchProducts()
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Gestión de Productos</h1>

//       {/* Formulario */}
//       <form
//         onSubmit={editingId ? handleUpdate : handleCreate}
//         className="space-y-3 border p-4 rounded-md bg-gray-50"
//       >
//         <h2 className="font-semibold">
//           {editingId ? 'Editar producto' : 'Crear nuevo producto'}
//         </h2>

//         <input
//           type="text"
//           placeholder="Título"
//           value={form.name ?? ''}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="border p-2 rounded w-full"
//         />

//         <textarea
//           placeholder="Descripción"
//           value={form.description ?? ''}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="border p-2 rounded w-full"
//         />

//         <input
//           type="text"
//           placeholder="Categoría"
//           value={form.category ?? ''}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//           className="border p-2 rounded w-full"
//         />

//         <input
//           type="number"
//           placeholder="Precio"
//           value={form.price ?? 0}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               price: parseFloat(e.target.value) || 0,
//             })
//           }
//           className="border p-2 rounded w-full"
//         />

//         <input
//           type="text"
//           placeholder="URL de la imagen (por ahora manual)"
//           value={form.photo_url ?? ''}
//           onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
//           className="border p-2 rounded w-full"
//         />

//         <input
//           type="text"
//           placeholder="URL del video"
//           value={form.video_url ?? ''}
//           onChange={(e) => setForm({ ...form, video_url: e.target.value })}
//           className="border p-2 rounded w-full"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {loading
//             ? 'Guardando...'
//             : editingId
//               ? 'Actualizar producto'
//               : 'Crear producto'}
//         </button>

//         {editingId && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditingId(null)
//               setForm({
//                 name: '',
//                 description: '',
//                 category: '',
//                 price: 0,
//                 photo_url: '',
//                 video_url: '',
//               })
//             }}
//             className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//           >
//             Cancelar
//           </button>
//         )}
//       </form>

//       {/* Lista de productos */}
//       <div className="space-y-4">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="border p-4 rounded-md flex justify-between items-start bg-white"
//           >
//             <div>
//               <h2 className="font-semibold text-lg">{product.name}</h2>
//               <p className="text-sm text-gray-700">{product.description}</p>
//               <h2 className="text-sm">{product.category}</h2>
//               <p className="font-medium mt-1">${product.price}</p>
//               <p className="text-sm text-gray-700">{product.video_url}</p>
//               {product.photo_url && (
//                 <img
//                   src={product.photo_url}
//                   alt={product.name}
//                   className="mt-2 w-32 h-20 object-cover rounded"
//                 />
//               )}
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleEdit(product)}
//                 className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//               >
//                 Editar
//               </button>
//               <button
//                 onClick={() => handleDelete(product.id!)}
//                 className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//               >
//                 Eliminar
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
