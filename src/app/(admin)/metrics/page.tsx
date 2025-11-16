'use client'

// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
import { useAdmin } from '@/context/AdminContext'
import {
  getVisitsLastNDays,
  getDailyVisits,
  getMonthlyGrowth,
  getTopSectionLastNDays,
  getMostUsedDeviceLastNDays,
} from '@/services/metrics'
import { MetricsResponse } from '@/types/metrics'
// import { TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

export default function MetricsPage() {
  const { isAdmin, isLoading } = useAdmin()
  const router = useRouter()
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null)

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

  return <pre className="text-black">{JSON.stringify(metrics, null, 2)}</pre>
  /* return (
    <div>
      <div>
        <Card className="border-black w-fit">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {metrics.totals.last7Days}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <TrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  ) */
}
