import { useEffect, useState } from 'react'
import { getDeviceType } from '@/utils/device'
import { MetricsResponse } from '@/types/metrics'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Escritorio',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Móvil',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export default function MetricsAreaChart({
  visitCharts,
  totals,
}: {
  visitCharts: MetricsResponse['charts']['visits']
  totals: MetricsResponse['totals']
}) {
  const isMobile = getDeviceType().includes('mobile')
  const [timeRange, setTimeRange] = useState('90d')

  // Auto ajustar tiempo en móviles
  useEffect(() => {
    if (isMobile) {
      setTimeRange('7d')
    }
  }, [isMobile])

  // Obtener data según el rango seleccionado
  const selectedData =
    timeRange === '7d'
      ? visitCharts.last7Days
      : timeRange === '30d'
        ? visitCharts.last30Days
        : visitCharts.last90Days

  // Obtener total según el rango seleccionado
  const selectedTotal =
    timeRange === '7d'
      ? totals.last7Days
      : timeRange === '30d'
        ? totals.last30Days
        : totals.last90Days

  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>
            <span>Visitantes totales</span>
          </CardTitle>
          <CardDescription className="flex flex-col gap-3">
            <span className="hidden @[540px]/card:block">
              Total de visitantes por periodo seleccionado
            </span>
            <span>{selectedTotal} visitas</span>
            <span className="@[540px]/card:hidden">Visitantes</span>
          </CardDescription>
        </div>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (value) {
                setTimeRange(value)
              }
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Últimos 30 días</ToggleGroupItem>
            <ToggleGroupItem value="7d">Últimos 7 días</ToggleGroupItem>
          </ToggleGroup>

          {/* Para mobile */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="flex w-40 @[767px]/card:hidden">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d">Últimos 3 meses</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="7d">Últimas 7 días</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={selectedData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopOpacity={1}
                  stopColor="var(--color-desktop)"
                />
                <stop
                  offset="95%"
                  stopOpacity={0.1}
                  stopColor="var(--color-desktop)"
                />
              </linearGradient>

              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopOpacity={0.8}
                  stopColor="var(--color-mobile)"
                />
                <stop
                  offset="95%"
                  stopOpacity={0.1}
                  stopColor="var(--color-mobile)"
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />

            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
