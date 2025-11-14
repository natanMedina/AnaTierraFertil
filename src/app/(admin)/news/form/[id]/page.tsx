import NewsForm from '@/components/forms/NewsForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params
  return <NewsForm id={Number(id)} />
}
