export function getDeviceType() {
  if (typeof navigator === 'undefined') return 'desktop' // SSR safety

  const ua = navigator.userAgent.toLowerCase()
  const isMobile =
    /iphone|ipad|android|blackberry|windows phone|opera mini|mobile/.test(ua)

  return isMobile ? 'mobile' : 'desktop'
}
