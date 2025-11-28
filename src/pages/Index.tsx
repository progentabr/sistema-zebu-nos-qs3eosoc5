import { Hero } from '@/components/home/Hero'
import { HeroWeather } from '@/components/home/HeroWeather'
import { HeroCommodities } from '@/components/home/HeroCommodities'

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HeroWeather />
      <HeroCommodities />
    </div>
  )
}
