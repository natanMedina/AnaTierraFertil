'use client'

import UnderConstruction from '@/components/temp/UnderConstruction.tsx'
import { useParams } from 'next/navigation'

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id;

  return <UnderConstruction section={"Detalle del producto: " + id} />
}
