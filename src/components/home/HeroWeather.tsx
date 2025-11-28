import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CloudSun,
  CloudRain,
  Sun,
  CloudLightning,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { weatherService } from '@/services/weatherService'
import { WeatherData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface HeroWeatherProps {
  locations: string[]
  refreshInterval?: number // in milliseconds
}

export function HeroWeather({
  locations,
  refreshInterval = 1800000,
}: HeroWeatherProps) {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await weatherService.getWeather(locations)
      setWeatherData(data)
    } catch (err) {
      setError('Não foi possível carregar a previsão do tempo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()

    const interval = setInterval(() => {
      fetchWeather()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [JSON.stringify(locations), refreshInterval])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />
      case 'storm':
        return <CloudLightning className="h-6 w-6 text-purple-500" />
      case 'cloudy':
        return <CloudSun className="h-6 w-6 text-gray-500" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  if (error) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button variant="outline" onClick={fetchWeather}>
            <RefreshCw className="mr-2 h-4 w-4" /> Tentar novamente
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-muted/30 border-y">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Previsão do Tempo</h2>
          <span className="text-xs text-muted-foreground hidden sm:inline-block">
            Atualizado periodicamente
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex w-max space-x-4 p-1">
              {weatherData.map((w) => (
                <Card key={w.city} className="w-[280px] shrink-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {w.city}
                    </CardTitle>
                    {getWeatherIcon(w.condition)}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{w.temp}°C</span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {w.condition === 'sunny'
                          ? 'Ensolarado'
                          : w.condition === 'rain'
                            ? 'Chuvoso'
                            : w.condition === 'storm'
                              ? 'Tempestade'
                              : 'Nublado'}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {w.forecast.map((day, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="font-medium w-8">{day.day}</span>
                          <div className="flex gap-2 text-muted-foreground">
                            <span>Min {day.min}°</span>
                            <span>Max {day.max}°</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-2 border-t flex justify-between items-center">
                      <span className="text-[10px] text-muted-foreground">
                        Fonte: {w.source}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {w.updatedAt}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </section>
  )
}
