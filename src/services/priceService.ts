import { CommodityPrice } from '@/lib/types'

const CACHE_KEY = 'prices_cache'
const DEFAULT_TTL = 60 * 60 * 1000 // 1 hour

interface CachedData {
  timestamp: number
  data: CommodityPrice[]
}

// Mock data generator
const generateMockPrice = (item: string): CommodityPrice => {
  let value = 0
  let unit = ''
  let source = ''

  switch (item) {
    case 'arroba_boi':
      value = 230 + Math.random() * 20
      unit = 'R$/@'
      source = 'CEPEA'
      break
    case 'soja':
      value = 115 + Math.random() * 10
      unit = 'R$/sc'
      source = 'Notícias Agrícolas'
      break
    case 'milho':
      value = 50 + Math.random() * 10
      unit = 'R$/sc'
      source = 'Canal Rural'
      break
    default:
      value = 100
      unit = 'R$'
      source = 'Mercado Local'
  }

  return {
    item:
      item === 'arroba_boi'
        ? 'Arroba do Boi'
        : item.charAt(0).toUpperCase() + item.slice(1),
    value: Number(value.toFixed(2)),
    unit,
    variation: Number((Math.random() * 4 - 2).toFixed(2)),
    source,
    date: new Date().toLocaleDateString('pt-BR'),
  }
}

export const priceService = {
  async getCommodityPrices(
    items: string[],
    ttl: number = DEFAULT_TTL,
  ): Promise<CommodityPrice[]> {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { timestamp, data } = JSON.parse(cached) as CachedData
      const now = Date.now()
      if (now - timestamp < ttl) {
        return data
      }
    }

    // 2. Fetch from API (Mocked)
    // In a real scenario:
    // const response = await fetch(`/api/prices?items=${items.join(',')}`);
    // const data = await response.json();

    // INTEGRATION NOTE: Configure server-side keys for commodity APIs (e.g., HG Brasil, CEPEA)
    // INTEGRATION NOTE: Integrate with Supabase 'system.PROGENTA' database to store/retrieve historical prices.

    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

    try {
      const data = items.map((item) => generateMockPrice(item))

      // 3. Save to Cache
      const cachePayload: CachedData = {
        timestamp: Date.now(),
        data,
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload))

      return data
    } catch (error) {
      console.error('Failed to fetch commodity prices', error)
      throw new Error('Could not fetch commodity prices')
    }
  },
}
