'use client'

import { useState } from 'react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { MetricsResponse } from '@/types/metrics'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

const chartConfig = {
  desktop: {
    label: 'Escritorio',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Móvil',
    color: 'var(--chart-2)',
  },
}

export default function SectionRadarLabelChart({
  sectionCharts,
}: {
  sectionCharts: MetricsResponse['charts']['sections']
}) {
  const [timeRange, setTimeRange] = useState<string>('90')

  const selectedData =
    timeRange === '7'
      ? sectionCharts.last7Days
      : timeRange === '30'
        ? sectionCharts.last30Days
        : sectionCharts.last90Days

  return (
    <Card className="relative pb-6">
      <CardHeader>
        <CardTitle>Visitas por sección</CardTitle>
        <CardDescription>
          Datos basados en los últimos {timeRange} días
        </CardDescription>
        <CardAction className="absolute right-0 mr-7">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (value) {
                setTimeRange(value)
              }
            }}
            variant="outline"
            className="*:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30">Últimos 30 días</ToggleGroupItem>
            <ToggleGroupItem value="7">Últimos 7 días</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[450px]">
          <RadarChart
            data={selectedData}
            // margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <PolarAngleAxis
              dataKey="section"
              tick={({ x, y, textAnchor, index, ...props }) => {
                const item = selectedData[index]

                return (
                  <text
                    x={x}
                    y={y}
                    dy={-9}
                    textAnchor={textAnchor}
                    fontSize={13}
                    fontWeight={500}
                    {...props}
                  >
                    <tspan>{item.desktop}</tspan>
                    <tspan className="fill-muted-foreground">/</tspan>
                    <tspan>{item.mobile}</tspan>
                    <tspan
                      x={x}
                      dy={'1rem'}
                      fontSize={10}
                      className="fill-muted-foreground"
                    >
                      {item.section}
                    </tspan>
                  </text>
                )
              }}
            />

            <PolarGrid />

            <Radar
              name="mobile"
              dataKey="mobile"
              fill="var(--color-mobile)"
              fillOpacity={0.5}
              dot={{
                r: 3,
                fillOpacity: 0.4,
              }}
            />

            <Radar
              name="desktop"
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.5}
              dot={{
                r: 3,
                fillOpacity: 0.4,
              }}
            />

            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
