'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getSiteConfig, updateSiteConfig } from '@/services/siteConfig'
import { SiteConfig } from '@/types/siteConfig'

interface SiteConfigContextType {
  siteConfig: SiteConfig
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>
  siteConfigLoading: boolean
  refreshSiteConfig: () => Promise<void>
  saveSiteConfig: (data: Partial<SiteConfig>) => Promise<void>
}

const SiteConfigContext = createContext<SiteConfigContextType | null>(null)

export function SiteConfigProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [siteConfig, setSiteConfig] = useState<any>(null)
  const [siteConfigLoading, setSiteConfigLoading] = useState(true)

  const refreshSiteConfig = async () => {
    const data = await getSiteConfig()
    setSiteConfig(data)
  }

  const saveSiteConfig = async (data: Partial<SiteConfig>) => {
    const updated = await updateSiteConfig(data)
    setSiteConfig(updated)
  }

  useEffect(() => {
    refreshSiteConfig().finally(() => setSiteConfigLoading(false))
  }, [])

  return (
    <SiteConfigContext.Provider
      value={{
        siteConfig,
        setSiteConfig,
        siteConfigLoading,
        refreshSiteConfig,
        saveSiteConfig,
      }}
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
