'use client'

import MetricsAreaChart from '@/components/charts/MetricsAreaChart'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAdmin } from '@/context/AdminContext'
import {
  getVisitsLastNDays,
  getDailyVisits,
  getMonthlyGrowth,
  getTopSectionLastNDays,
  getMostUsedDeviceLastNDays,
} from '@/services/metrics'
import { MetricsResponse } from '@/types/metrics'
import { resolvePath } from '@/utils/formatters'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { JSX, useEffect, useState } from 'react'

async function getMetrics() {
  const now = new Date()

  const last7 = new Date()
  last7.setDate(now.getDate() - 7)

  const last30 = new Date()
  last30.setDate(now.getDate() - 30)

  const last90 = new Date()
  last90.setDate(now.getDate() - 90)

  // Llamada al servicio
  const metrics: MetricsResponse = {
    totals: {
      last7Days: await getVisitsLastNDays(7),
      last30Days: await getVisitsLastNDays(30),
      last90Days: await getVisitsLastNDays(90),
      last180Days: await getVisitsLastNDays(180),
    },

    charts: {
      last7Days: await getDailyVisits(last7, now),
      last30Days: await getDailyVisits(last30, now),
      last90Days: await getDailyVisits(last90, now),
    },

    growth: await getMonthlyGrowth(),
    topSection: await getTopSectionLastNDays(30),
    mostUsedDevice: await getMostUsedDeviceLastNDays(30),
  }
  return metrics
}

const HeaderCards = ({ metrics }: { metrics: MetricsResponse }) => {
  const headerCardsInfo: {
    title: string
    value: string
    description: string
    footer: string
    desc_icon?: JSX.Element
  }[] = [
    {
      title: 'Visitas totales',
      value: `${metrics.totals.last180Days} visitas`,
      description: 'En aumento',
      footer: 'Visitantes en los últimos 6 meses',
    },
    {
      title: 'Sección más visitada',
      value: resolvePath(metrics.topSection.pathname),
      description: `${metrics.topSection.visits} visitas este mes`,
      footer: 'Sección más visitada por los usuarios',
    },
    {
      title: 'Dispositivo más usado',
      value: metrics.mostUsedDevice.device.includes('desktop')
        ? 'Escritorio'
        : 'Móvil',
      description: `${metrics.mostUsedDevice.count} usos este mes`,
      footer: 'Dispositivo más usado por los usuarios',
    },
    {
      title: 'Ratio de crecimiento',
      value: `${metrics.growth.growth}%`,
      description: `${
        metrics.growth.growth > 0
          ? '¡Las visitas están creciendo!'
          : 'Las estadísticas pueden mejorar'
      }`,
      desc_icon:
        metrics.growth.growth > 0 ? (
          <TrendingUp className="size-4" />
        ) : (
          <TrendingDown className="size-4" />
        ),
      footer: 'Crecimiento de visitas en este mes',
    },
  ]

  return (
    <div className="flex flex-row gap-15 justify-center">
      {headerCardsInfo.map((info, index) => (
        <Card key={index} className="border-brand border-2 w-1/4">
          <CardHeader>
            <CardDescription>{info.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {info.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="font-medium flex gap-2 items-center">
              {info.description}
              {info.desc_icon || <TrendingUp className="size-4" />}
            </div>
            <div className="text-muted-foreground">{info.footer}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default function MetricsPage() {
  const { isAdmin, isLoading } = useAdmin()
  const router = useRouter()
  const [metrics, setMetrics] = useState<MetricsResponse>()

  // Redirigir si no es admin
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/')
    }
  }, [isAdmin, isLoading, router])

  // Cargar datos
  useEffect(() => {
    const fetchMetrics = async () => {
      if (isAdmin) {
        const data = await getMetrics()
        setMetrics(data)
      }
    }
    fetchMetrics()
  }, [isAdmin])

  if (isLoading || !metrics)
    return (
      <p className="flex items-center justify-center h-screen font-extrabold">
        Cargando...
      </p>
    )

  return (
    <div>
      <div className="p-10">
        <HeaderCards metrics={metrics}></HeaderCards>
      </div>
      <div className="p-10">
        <MetricsAreaChart charts={metrics.charts} totals={metrics.totals} />
      </div>
      <pre className="text-black">{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  )
}
