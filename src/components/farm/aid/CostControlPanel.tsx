import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CostSummary } from '@/lib/types'
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

interface CostControlPanelProps {
  costs: CostSummary[]
}

const chartConfig = {
  amount: {
    label: 'Valor (R$)',
    color: 'hsl(var(--primary))',
  },
}

export function CostControlPanel({ costs }: CostControlPanelProps) {
  // Aggregate costs by category
  const aggregated = costs.reduce(
    (acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(aggregated).map(([category, amount]) => ({
    category:
      category === 'nutrition'
        ? 'Nutrição'
        : category === 'health'
          ? 'Sanitário'
          : category === 'labor'
            ? 'Mão de Obra'
            : 'Outros',
    amount,
  }))

  const totalCost = costs.reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Custo Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R${' '}
              {totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Despesas por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="amount"
                    fill="var(--color-amount)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
