import { useEffect } from 'react'
import { getDeviceType } from '@/utils/device'
import { createVisit } from '@/services/metrics'

export function useCreateVisit() {
  useEffect(() => {
    const pathname = window.location.pathname
    const firstPart = '/' + pathname.split('/')[1]
    const device = getDeviceType()

    createVisit({ device: device, pathname: firstPart })
  }, [])
}
