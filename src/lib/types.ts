export type UserRole = 'admin' | 'farm'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  farmIds?: string[]
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
  date: string
}

// Pasture Types
export interface Pasture {
  id: string
  name: string
  area: number // ha
  capacity: number // UA/ha
  status: 'Ocupado' | 'Descanso' | 'Vedado' | 'Manutenção'
  polygonGeojson?: string
  productivity: {
    msPerHa: number
    lastMeasurement: string
  }
  schedule: {
    date: string
    action: string
    animalCount: number
  }[]
  maintenance: {
    id: string
    item: string
    status: 'pending' | 'done'
    date: string
  }[]
  creepFeeding: boolean
  vedacao?: {
    startDate: string
    endDate: string
    active: boolean
  }
}

// Nutrition Types
export interface NutritionPlan {
  id: string
  category: string
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

export interface CreepFeedingRecord {
  id: string
  date: string
  product: string
  amount: number // kg
  cost: number
  paddockId?: string
}

export interface NutritionData {
  plans: NutritionPlan[]
  proposals: NutritionProposal[]
  creepFeedingInfo: string
  records?: CreepFeedingRecord[]
}

// Sanitary Types
export interface HealthProtocol {
  id: string
  type: 'vaccination' | 'deworming' | 'tick_control' | 'exam'
  name: string
  date: string
  season?: 'dry' | 'rainy'
  status: 'pending' | 'done' | 'delayed'
  observation?: string
  recurring?: boolean
}

export interface HealthRecord {
  id: string
  date: string
  animalId?: string
  product: string
  dose: string
  cost: number
  notes: string
}

export interface SanitaryData {
  adoptedControl: string
  protocols: HealthProtocol[]
  observations: string
  records?: HealthRecord[]
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
    method: string
  }
  traditionalWeaning: boolean
  heiferPlan: {
    entryAge: number
    entryWeight: number
    target: string
  }
  cullingList: CullingAnimal[]
}

// Herd Types
export interface Animal {
  id: string
  tag: string
  category: string
  status: 'active' | 'sold' | 'dead'
  weightHistory: {
    birth?: number
    d30?: number
    d60?: number
    d90?: number
    d205?: number
    current: number
    lastWeighingDate: string
  }
}

export interface HerdIndices {
  birthRate: number
  pregnancyRate: number
  mortalityRate: number
  offTakeRate: number
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
