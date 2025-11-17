export type DeviceType = 'mobile' | 'desktop'

export interface MetricRow {
  id: number
  created_at: string
  pathname: string
  device: DeviceType
}

export interface ChartData {
  date: string
  total: number
  mobile: number
  desktop: number
}

export interface SectionChartData {
  section: string
  pathname: string
  desktop: number
  mobile: number
}

export interface Totals {
  last7Days: number
  last30Days: number
  last90Days: number
  last180Days: number
}

export interface Growth {
  current: number
  previous: number
  growth: number
}

export interface TopSection {
  pathname: string | null
  visits: number
}

export interface MostUsedDevice {
  device: string
  count: number
}

export interface MetricsResponse {
  totals: Totals
  charts: {
    visits: {
      last7Days: ChartData[]
      last30Days: ChartData[]
      last90Days: ChartData[]
    }
    sections: {
      last7Days: SectionChartData[]
      last30Days: SectionChartData[]
      last90Days: SectionChartData[]
    }
  }
  growth: Growth
  topSection: TopSection
  mostUsedDevice: MostUsedDevice
}
