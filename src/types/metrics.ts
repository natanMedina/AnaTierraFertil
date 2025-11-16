export type DeviceType = 'mobile' | 'desktop'

export interface MetricRow {
  id: number
  created_at: string
  pathname: string
  device: DeviceType
}
