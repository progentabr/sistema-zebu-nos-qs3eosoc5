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

export interface NutritionPlan {
  id: string
  category: string // e.g., 'Bezerros', 'Matrizes'
  season: 'dry' | 'rainy' | 'transition'
  strategy: string
  supplementation: string
  creepFeeding: boolean
}

export interface NutritionProposal {
  id: string
  title: string
  description: string
  mixture: string
  createdAt: string
  status: 'proposed' | 'approved' | 'rejected'
}

export interface NutritionData {
  plans: NutritionPlan[]
  proposals: NutritionProposal[]
  creepFeedingInfo: string
}

export interface HealthProtocol {
  id: string
  type: 'vaccination' | 'deworming' | 'tick_control' | 'exam'
  name: string
  date: string
  season?: 'dry' | 'rainy'
  status: 'pending' | 'done' | 'delayed'
  observation?: string
}

export interface SanitaryData {
  adoptedControl: string
  protocols: HealthProtocol[]
  observations: string
}
