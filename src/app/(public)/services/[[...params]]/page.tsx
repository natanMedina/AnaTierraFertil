'use client'

import { useParams } from 'next/navigation'
import ServicesPage from './ServicesPage'
import ServiceDetailPage from './ServiceDetailPage'

export default function ServicesSection() {
  const param = useParams().params?.[0]
  const isId = !isNaN(Number(param))
  if (isId) {
    return ServiceDetailPage(Number(param))
  } else {
    return ServicesPage(param)
  }
}
