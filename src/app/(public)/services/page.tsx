'use client'

import { useEffect, useState } from 'react'
import { getServices } from '@/services/services'
import UnderConstruction from '@/components/temp/UnderConstruction.tsx'
import { Service } from '@/types/service'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    const data = await getServices()
    setServices(data)
    console.log(data, services)
  }

  return <UnderConstruction section="Servicios" />
}
