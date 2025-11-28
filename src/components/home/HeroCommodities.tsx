import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { priceService } from '@/services/priceService'
import { CommodityPrice } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface HeroCommoditiesProps {
  items: string[]
  refreshInterval?: number
}

export function HeroCommodities({
  items,
  refreshInterval = 3600000,
}: HeroCommoditiesProps) {
  const [prices, setPrices] = useState<CommodityPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrices = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await priceService.getCommodityPrices(items)
      setPrices(data)
    } catch (err) {
      setError('Não foi possível carregar as cotações.')
    } finally {
      setLoading(false)
    }
  }, [items])

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchPrices, refreshInterval])

  const getTrendIcon = (variation: number) => {
    if (variation > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (variation < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button variant="outline" onClick={fetchPrices}>
            <RefreshCw className="mr-2 h-4 w-4" /> Tentar novamente
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-6">Cotações Agrícolas</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prices.map((c) => (
              <Card key={c.item} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {c.item}
                  </CardTitle>
                  {getTrendIcon(c.variation)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {c.unit} {c.value.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs font-medium ${
                        c.variation > 0
                          ? 'text-green-600'
                          : c.variation < 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                      }`}
                    >
                      {c.variation > 0 ? '+' : ''}
                      {c.variation}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      vs. ontem
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-4 text-right border-t pt-2">
                    Fonte: {c.source} • {c.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
