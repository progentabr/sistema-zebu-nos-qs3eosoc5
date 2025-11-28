import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockWeather } from '@/services/mockService'
import { CloudSun, CloudRain, Sun } from 'lucide-react'

export function HeroWeather() {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />
      case 'cloudy':
        return <CloudSun className="h-6 w-6 text-gray-500" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-6">Previsão do Tempo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockWeather.map((w) => (
            <Card key={w.city}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{w.city}</CardTitle>
                {getWeatherIcon(w.condition)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{w.temp}°C</div>
                <p className="text-xs text-muted-foreground">
                  {w.forecast[0].day}: Min {w.forecast[0].min}° / Max{' '}
                  {w.forecast[0].max}°
                </p>
                <p className="text-[10px] text-muted-foreground mt-2 text-right">
                  Fonte: {w.source}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
