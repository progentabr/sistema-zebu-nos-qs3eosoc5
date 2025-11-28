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

// Reproduction Types
export interface CullingAnimal {
  id: string
  tag: string
  reason: string
  age: number
}

export interface ReproductionPlan {
  breedingSeason: {
    start: string
    end: string
    method: string // e.g., 'IATF + Repasse'
  }
  traditionalWeaning: boolean
  heiferPlan: {
    entryAge: number // months
    entryWeight: number // kg
    target: string
  }
  cullingList: CullingAnimal[]
}

// Herd Types
export interface Animal {
  id: string
  tag: string
  category: string // e.g., 'Vaca Prenhe', 'Bezerro', 'Novilha'
  status: 'active' | 'sold' | 'dead'
  weightHistory: {
    birth?: number
    d30?: number
    d60?: number
    d90?: number
    d205?: number // Weaning
    current: number
    lastWeighingDate: string
  }
}

export interface HerdIndices {
  birthRate: number
  pregnancyRate: number
  mortalityRate: number
  offTakeRate: number // Taxa de desfrute
}

export interface HerdMovement {
  id: string
  date: string
  type: 'entry' | 'exit'
  quantity: number
  description: string
  category: string
}

export interface HerdData {
  animals: Animal[]
  indices: HerdIndices
  movements: HerdMovement[]
}

// Assistance Types
export interface ActivityProposal {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export interface FarmTask {
  id: string
  title: string
  assignee: string
  dueDate: string
  status: 'pending' | 'in_progress' | 'done'
  templateType?: 'daily_check' | 'vaccination' | 'maintenance' | 'custom'
  description?: string
}

export interface CostSummary {
  id: string
  category: string
  amount: number
  date: string
  description: string
}

export interface AssistanceData {
  proposals: ActivityProposal[]
  tasks: FarmTask[]
  costs: CostSummary[]
}
