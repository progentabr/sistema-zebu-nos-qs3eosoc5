import { Hero } from '@/components/home/Hero'
import { HeroWeather } from '@/components/home/HeroWeather'
import { HeroCommodities } from '@/components/home/HeroCommodities'

const weatherLocations = [
  'Brasília',
  'São Paulo',
  'Belo Horizonte',
  'Porto Alegre',
  'Salvador',
]

const commodityItems = ['arroba_boi', 'soja', 'milho']

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <HeroWeather
        locations={weatherLocations}
        refreshInterval={30 * 60 * 1000} // 30 minutes
      />

      <HeroCommodities
        items={commodityItems}
        refreshInterval={60 * 60 * 1000} // 1 hour
      />
    </div>
  )
}
