import NewsForm from '@/components/forms/NewsForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100/50 to-blue-50">
      <NewsForm id={Number(id)} />
    </div>
  )
}
