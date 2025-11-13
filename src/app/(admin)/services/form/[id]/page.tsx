import ServiceForm from '@/components/forms/ServiceForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditServicePage({ params }: Props) {
  const { id } = await params
  return <ServiceForm id={Number(id)} />
}
