'use client'

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
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface HeaderCardsProps {
  metrics: MetricsResponse
}

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

const resolvePathAux = (path: string | null): string => {
  if (!path) return 'No hay datos'
  switch (path) {
    case '/biography':
      return 'Biografía'
    case '/products':
      return 'Productos'
    case '/services':
      return 'Servicios'
    case '/news':
      return 'Novedades'
    default:
      return 'Inicio'
  }
}

const HeaderCards = ({ metrics }: HeaderCardsProps) => {
  const headerCardsInfo = [
    {
      title: 'Visitas totales',
      value: `${metrics.totals.last180Days} visitas`,
      description: (
        <span className="flex gap-2 items-center">
          En aumento <TrendingUp className="size-4" />
        </span>
      ),
      footer: 'Visitantes en los últimos 6 meses',
    },
    {
      title: 'Sección más visitada',
      value: resolvePathAux(metrics.topSection.pathname),
      description: (
        <span className="flex gap-2 items-center">
          {`${metrics.topSection.visits} visitas este mes`}
          <TrendingUp className="size-4" />
        </span>
      ),
      footer: 'Sección más visitada por los usuarios',
    },
    {
      title: 'Dispositivo más usado',
      value: metrics.mostUsedDevice.device.includes('desktop')
        ? 'Escritorio'
        : 'Móvil',
      description: (
        <span className="flex gap-2 items-center">
          {metrics.mostUsedDevice.count} usos este mes{' '}
          <TrendingUp className="size-4" />
        </span>
      ),
      footer: 'Dispositivo más usado por los usuarios',
    },
    {
      title: 'Ratio de crecimiento',
      value: `${metrics.growth.growth}%`,
      description: (
        <span className="flex gap-2 items-center">
          {metrics.growth.growth > 0
            ? '¡Las visitas están creciendo!'
            : 'Las estadísticas pueden mejorar'}
          {metrics.growth.growth > 0 ? (
            <TrendingUp className="size-4" />
          ) : (
            <TrendingDown className="size-4" />
          )}
        </span>
      ),
      footer: 'Crecimiento de visitas en este mes',
    },
  ]

  return (
    <div className="flex flex-row p-10 gap-15 justify-center">
      {headerCardsInfo.map((info, index) => (
        <Card key={index} className="border-brand border-2 w-1/4">
          <CardHeader>
            <CardDescription>{info.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {info.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="font-medium">{info.description}</div>
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

  // return <pre className="text-black">{JSON.stringify(metrics, null, 2)}</pre>
  return (
    <div>
      <HeaderCards metrics={metrics}></HeaderCards>
    </div>
  )
}
