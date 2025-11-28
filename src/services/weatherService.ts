import { WeatherData, WeatherForecast } from '@/lib/types'

const CACHE_KEY = 'weather_cache'
const DEFAULT_TTL = 30 * 60 * 1000 // 30 minutes

interface CachedData {
  timestamp: number
  data: WeatherData[]
}

// Mock data generator for fallback/simulation
const generateMockWeather = (city: string): WeatherData => {
  const conditions: WeatherData['condition'][] = [
    'sunny',
    'cloudy',
    'rain',
    'storm',
  ]
  const randomCondition =
    conditions[Math.floor(Math.random() * conditions.length)]
  const baseTemp = 20 + Math.floor(Math.random() * 15)

  const forecast: WeatherForecast[] = Array.from({ length: 3 }).map((_, i) => ({
    day: new Date(Date.now() + (i + 1) * 86400000).toLocaleDateString('pt-BR', {
      weekday: 'short',
    }),
    min: baseTemp - 5 + Math.floor(Math.random() * 3),
    max: baseTemp + 5 + Math.floor(Math.random() * 3),
    condition: conditions[Math.floor(Math.random() * conditions.length)],
  }))

  return {
    city,
    temp: baseTemp,
    condition: randomCondition,
    forecast,
    source: 'INMET',
    updatedAt: new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }
}

export const weatherService = {
  async getWeather(
    locations: string[],
    ttl: number = DEFAULT_TTL,
  ): Promise<WeatherData[]> {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { timestamp, data } = JSON.parse(cached) as CachedData
      const now = Date.now()
      if (now - timestamp < ttl) {
        // Filter cache to match requested locations if needed, or just return valid cache
        // For simplicity, if cache exists and is valid, we assume it covers the needs or we refresh if partial.
        // Here we just return cached data if it matches the length, otherwise fetch new.
        if (data.length === locations.length) {
          return data
        }
      }
    }

    // 2. Fetch from API (Mocked)
    // In a real scenario, this would be:
    // const response = await fetch(`/api/weather?locations=${locations.join(',')}`);
    // const data = await response.json();

    // INTEGRATION NOTE: Configure server-side keys in your backend .env
    // INTEGRATION NOTE: Use Supabase Edge Functions or a proxy to call external Weather APIs (e.g., OpenWeatherMap)
    // INTEGRATION NOTE: Store historical data in Supabase 'weather_history' table if needed.

    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate network delay

    try {
      const data = locations.map((city) => generateMockWeather(city))

      // 3. Save to Cache
      const cachePayload: CachedData = {
        timestamp: Date.now(),
        data,
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload))

      return data
    } catch (error) {
      console.error('Failed to fetch weather data', error)
      throw new Error('Could not fetch weather data')
    }
  },
}
