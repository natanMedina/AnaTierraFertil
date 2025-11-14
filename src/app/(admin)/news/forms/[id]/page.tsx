import NewsForm from '@/components/forms/NewsForm'

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const idNum = Number(params.id)
  return <NewsForm id={idNum} />
}
