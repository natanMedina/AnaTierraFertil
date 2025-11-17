import { useEffect } from 'react'
import { getDeviceType } from '@/utils/device'
import { createVisit } from '@/services/metrics'

export function useCreateVisit() {
  useEffect(() => {
    const pathname = window.location.pathname
    const device = getDeviceType()

    createVisit({ device: device, pathname: pathname })
    console.log('Visita creada: ', pathname, device)
  }, [])
}
