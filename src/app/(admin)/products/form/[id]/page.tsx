import ProductForm from '@/components/forms/ProductForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  return <ProductForm id={Number(id)} />
}
