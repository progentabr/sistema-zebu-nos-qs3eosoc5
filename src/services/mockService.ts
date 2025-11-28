import { CommodityPrice, Farm, WeatherData } from '@/lib/types'

export const mockWeather: WeatherData[] = [
  {
    city: 'Brasília',
    temp: 28,
    condition: 'sunny',
    forecast: [{ day: 'Amanhã', min: 18, max: 29 }],
    source: 'INMET',
    updatedAt: '10:00',
  },
  {
    city: 'São Paulo',
    temp: 22,
    condition: 'rain',
    forecast: [{ day: 'Amanhã', min: 16, max: 23 }],
    source: 'Climatempo',
    updatedAt: '10:05',
  },
  {
    city: 'Belo Horizonte',
    temp: 26,
    condition: 'cloudy',
    forecast: [{ day: 'Amanhã', min: 19, max: 28 }],
    source: 'INMET',
    updatedAt: '10:10',
  },
]

export const mockCommodities: CommodityPrice[] = [
  {
    item: 'Arroba do Boi',
    value: 235.5,
    unit: 'R$/@',
    variation: 1.2,
    source: 'CEPEA',
    date: '28/11',
  },
  {
    item: 'Soja',
    value: 120.0,
    unit: 'R$/sc',
    variation: -0.5,
    source: 'Notícias Agrícolas',
    date: '28/11',
  },
  {
    item: 'Milho',
    value: 55.3,
    unit: 'R$/sc',
    variation: 0.0,
    source: 'Canal Rural',
    date: '28/11',
  },
]

export const mockFarms: Farm[] = [
  {
    id: '1',
    name: 'Fazenda Santa Fé',
    owner: 'João Silva',
    email: 'joao@santafe.com',
    phone: '(34) 99999-9999',
    address: 'Rodovia BR-050, Km 100, Uberaba-MG',
    status: 'active',
    cnpj: '12.345.678/0001-90',
  },
  {
    id: '2',
    name: 'Fazenda Boa Esperança',
    owner: 'Maria Oliveira',
    email: 'maria@esperanca.com',
    phone: '(67) 98888-8888',
    address: 'Estrada Vicinal 4, Campo Grande-MS',
    status: 'active',
    cnpj: '98.765.432/0001-10',
  },
]
