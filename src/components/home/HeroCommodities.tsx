import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockCommodities } from '@/services/mockService'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function HeroCommodities() {
  const getTrendIcon = (variation: number) => {
    if (variation > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (variation < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  return (
    <section className="py-12">
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-6">Cotações Agrícolas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCommodities.map((c) => (
            <Card key={c.item}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{c.item}</CardTitle>
                {getTrendIcon(c.variation)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {c.unit} {c.value.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Variação: {c.variation > 0 ? '+' : ''}
                  {c.variation}%
                </p>
                <p className="text-[10px] text-muted-foreground mt-2 text-right">
                  Fonte: {c.source} ({c.date})
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
