import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Download, Loader2 } from 'lucide-react'
import { adminService } from '@/services/adminService'

const chartConfig = {
  farms: {
    label: 'Fazendas',
    color: 'hsl(var(--chart-1))',
  },
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [region, setRegion] = useState('all')

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true)
      // GET /api/admin/metrics?months=6
      const data = await adminService.getAdminMetrics(6)
      setMetrics(data)
      setLoading(false)
    }
    fetchMetrics()
  }, [])

  const handleExport = () => {
    if (!metrics) return
    const headers = ['Mês', 'Fazendas']
    const rows = metrics.chartData.map((d: any) => [d.month, d.farms])
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e: any) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'metricas_fazendas.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <div className="flex gap-2">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Região" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Regiões</SelectItem>
              <SelectItem value="co">Centro-Oeste</SelectItem>
              <SelectItem value="se">Sudeste</SelectItem>
              <SelectItem value="s">Sul</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Exportar CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novas Fazendas (6m)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.newFarms}</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fazendas Ativas (6m)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeFarms}</div>
            <p className="text-xs text-muted-foreground">
              Total de fazendas operando
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Crescimento de Fazendas (Acumulado)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <LineChart data={metrics.chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="farms"
                  stroke="var(--color-farms)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
