import { getSupabaseBrowserClient } from '@/lib/supabaseClient'
import { SiteConfig } from '@/types/siteConfig'

export async function getSiteConfig() {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .single()

  if (error) throw error
  return data
}

export async function updateSiteConfig(updates: Partial<SiteConfig>) {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('site_config')
    .update(updates)
    .eq('id', 1)
    .select()
    .single()

  if (error) throw error
  return data
}
