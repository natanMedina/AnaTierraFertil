'use client'

import { createBrowserClient } from '@supabase/ssr'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton global
let client: ReturnType<typeof createBrowserClient>

export function getSupabaseBrowserClient() {
  if (!client) {
    client = createBrowserClient(url, anon)
  }
  return client
}
