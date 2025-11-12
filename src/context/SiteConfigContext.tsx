// context/SiteConfigContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getSiteConfig } from '@/services/siteConfig'
import { SiteConfig } from '@/types/siteConfig'

interface SiteConfigContextType {
  siteConfig: SiteConfig
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>
  siteConfigLoading: boolean
}

const SiteConfigContext = createContext<SiteConfigContextType | null>(null)

export function SiteConfigProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [siteConfig, setSiteConfig] = useState<any>(null)
  const [siteConfigLoading, setSiteConfigLoading] = useState(true)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await getSiteConfig()
        setSiteConfig(data)
      } catch (err) {
        console.error('Error fetching site config:', err)
      } finally {
        setSiteConfigLoading(false)
      }
    }
    fetchConfig()
  }, [])

  return (
    <SiteConfigContext.Provider
      value={{ siteConfig, setSiteConfig, siteConfigLoading }}
    >
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext)
  if (!context)
    throw new Error('useSiteConfig must be used within a SiteConfigProvider')
  return context
}
