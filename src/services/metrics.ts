// services/metricsService.ts
// import { supabase } from '@/lib/supabaseClient'
import { getSupabaseBrowserClient } from '@/lib/supabaseClient'
import {
  ChartData,
  DeviceType,
  Growth,
  MetricRow,
  MostUsedDevice,
  SectionChartData,
  TopSection,
} from '@/types/metrics'
import { resolvePath } from '@/utils/formatters'

export async function createVisit({
  pathname,
  device,
}: {
  pathname: string
  device: 'mobile' | 'desktop'
}) {
  const supabase = getSupabaseBrowserClient()
  const { error } = await supabase
    .from('metrics')
    .insert([{ pathname, device }])

  if (error) throw error
}

// =========================
// LECTURA / REPORTES
// =========================

/**
 * Obtener métricas en un rango de fechas
 */
export async function getMetricsByRange(
  start: Date,
  end: Date
): Promise<MetricRow[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .gte('created_at', start.toISOString())
    .lte('created_at', end.toISOString())
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function getDailyVisits(
  start: Date,
  end: Date
): Promise<ChartData[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('metrics')
    .select('created_at, device')

    // cualquier motor postgres permite truncar fecha
    .gte('created_at', start.toISOString())
    .lte('created_at', end.toISOString())

  if (error) throw error

  // agregación manual en JS
  const map: Record<
    string,
    { total: number; mobile: number; desktop: number }
  > = {}

  for (const row of data) {
    const day = row.created_at.split('T')[0]

    if (!map[day]) {
      map[day] = { total: 0, mobile: 0, desktop: 0 }
    }

    const device: DeviceType = row.device
    map[day].total++
    map[day][device]++
  }

  // convierte el map a array ordenado listo para Recharts
  return Object.keys(map)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((date) => ({
      date,
      ...map[date],
    }))
}

export async function getVisitsLastNDays(days: number): Promise<number> {
  const supabase = getSupabaseBrowserClient()
  const start = new Date()
  start.setDate(start.getDate() - days)

  const { data, error } = await supabase
    .from('metrics')
    .select('created_at')
    .gte('created_at', start.toISOString())

  if (error) throw error
  return data.length
}

export async function getTopSectionLastNDays(
  days: number
): Promise<TopSection> {
  const supabase = getSupabaseBrowserClient()
  const start = new Date()
  start.setDate(start.getDate() - days)

  const { data, error } = await supabase
    .from('metrics')
    .select('pathname')
    .gte('created_at', start.toISOString())

  if (error) throw error

  const counts: Record<string, number> = {}

  for (const row of data) {
    counts[row.pathname] = (counts[row.pathname] || 0) + 1
  }

  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]

  return top
    ? { pathname: top[0], visits: top[1] }
    : { pathname: null, visits: 0 }
}

export async function getMostUsedDeviceLastNDays(
  days: number
): Promise<MostUsedDevice> {
  const supabase = getSupabaseBrowserClient()
  const start = new Date()
  start.setDate(start.getDate() - days)

  const { data, error }: { data: MetricRow[]; error: any } = await supabase
    .from('metrics')
    .select('device')
    .gte('created_at', start.toISOString())

  if (error) throw error

  const mobile = data.filter((d) => d.device === 'mobile').length
  const desktop = data.filter((d) => d.device === 'desktop').length

  return mobile > desktop
    ? { device: 'mobile', count: mobile }
    : { device: 'desktop', count: desktop }
}

export async function getMonthlyGrowth(): Promise<Growth> {
  const now = new Date()

  const startThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  const visitsThis = await getMetricsByRange(startThisMonth, now)
  const visitsLast = await getMetricsByRange(startLastMonth, endLastMonth)

  const growth =
    visitsLast.length === 0
      ? 100
      : ((visitsThis.length - visitsLast.length) / visitsLast.length) * 100

  return {
    current: visitsThis.length,
    previous: visitsLast.length,
    growth: Math.round(growth),
  }
}

const SECTIONS = ['/', '/biography', '/products', '/services', '/news']

export async function getSectionVisitsLastNDays(
  days: number
): Promise<SectionChartData[]> {
  const supabase = getSupabaseBrowserClient()
  const start = new Date()
  start.setDate(start.getDate() - days)

  const { data, error }: { data: MetricRow[]; error: any } = await supabase
    .from('metrics')
    .select('pathname, device')
    .gte('created_at', start.toISOString())

  if (error) throw error

  // Inicializar conteos
  const map: Record<string, { desktop: number; mobile: number }> = {}

  SECTIONS.forEach((section) => {
    map[section] = { desktop: 0, mobile: 0 }
  })

  // Contar datos
  for (const row of data) {
    const path = SECTIONS.includes(row.pathname) ? row.pathname : '/'
    const device = row.device === 'mobile' ? 'mobile' : 'desktop'
    map[path][device]++
  }

  // Convertir a array
  return SECTIONS.map((path) => ({
    pathname: path,
    section: resolvePath(path),
    desktop: map[path].desktop,
    mobile: map[path].mobile,
  }))
}
