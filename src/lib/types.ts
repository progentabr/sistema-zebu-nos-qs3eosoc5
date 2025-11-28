export type UserRole = 'admin' | 'farm'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  farmIds?: string[] // For farm users
}

export interface Farm {
  id: string
  name: string
  owner: string
  email: string
  phone: string
  address: string
  status: 'active' | 'inactive'
  cnpj: string
  lat?: number
  lng?: number
}

export interface WeatherForecast {
  day: string
  min: number
  max: number
  condition: 'sunny' | 'cloudy' | 'rain' | 'storm'
}

export interface WeatherData {
  city: string
  temp: number
  condition: 'sunny' | 'cloudy' | 'rain' | 'storm'
  forecast: WeatherForecast[]
  source: string
  updatedAt: string
}

export interface CommodityPrice {
  item: string
  value: number
  unit: string
  variation: number
  source: string
  date: string // reference_date
}
