import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HerdIndices } from '@/lib/types'
import { TrendingUp, Activity, Skull, Baby } from 'lucide-react'

interface ZootecnicalIndicesPanelProps {
  indices: HerdIndices
}

export function ZootecnicalIndicesPanel({
  indices,
}: ZootecnicalIndicesPanelProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Taxa de Natalidade
          </CardTitle>
          <Baby className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{indices.birthRate}%</div>
          <p className="text-xs text-muted-foreground">
            Bezerros nascidos / Vacas expostas
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Prenhez</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{indices.pregnancyRate}%</div>
          <p className="text-xs text-muted-foreground">
            Diagnósticos positivos / Total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mortalidade</CardTitle>
          <Skull className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {indices.mortalityRate}%
          </div>
          <p className="text-xs text-muted-foreground">
            Total de óbitos / Rebanho médio
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">GMD Médio</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {indices.averageDailyGain} kg
          </div>
          <p className="text-xs text-muted-foreground">
            Ganho Médio Diário Global
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
