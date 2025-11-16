import { useEffect } from 'react'
// import { createVisit } from '@/services/metrics'

function getDeviceType() {
  const ua = navigator.userAgent.toLowerCase()
  const isMobile =
    /iphone|ipad|android|blackberry|windows phone|opera mini|mobile/.test(ua)

  return isMobile ? 'mobile' : 'desktop'
}

export function useCreateVisit() {
  useEffect(() => {
    const pathname = window.location.pathname
    const device = getDeviceType()

    // createVisit({ device: device, pathname: pathname })
    console.log('Visita creada: ', pathname, device)
  }, [])
}
