import {
  NutritionData,
  SanitaryData,
  NutritionProposal,
  ReproductionPlan,
  HerdData,
  AssistanceData,
  FarmTask,
  Pasture,
  NutritionPlan,
  CreepFeedingRecord,
  HealthProtocol,
  HealthRecord,
  ActivityProposal,
  ReproductionEvent,
  Animal,
  HerdMovement,
  CostSummary,
  TaskTemplate,
} from '@/lib/types'

// Mock Data Store
let mockPastures: Pasture[] = [
  {
    id: '1',
    name: 'Pasto 1',
    area: 15,
    capacity: 1.2,
    status: 'Ocupado',
    productivity: { msPerHa: 4500, lastMeasurement: '2024-05-15' },
    schedule: [
      { date: '2024-06-01', action: 'Entrada Lote A', animalCount: 20 },
    ],
    maintenance: [
      {
        id: 'm1',
        item: 'Adubação de cobertura',
        status: 'pending',
        date: '2024-09-01',
      },
    ],
    creepFeeding: true,
    vedacao: { startDate: '', endDate: '', active: false },
  },
  {
    id: '2',
    name: 'Pasto 2',
    area: 20,
    capacity: 1.0,
    status: 'Descanso',
    productivity: { msPerHa: 5000, lastMeasurement: '2024-04-10' },
    schedule: [],
    maintenance: [],
    creepFeeding: false,
    vedacao: { startDate: '2024-05-01', endDate: '2024-08-01', active: true },
  },
]

let mockNutritionPlans: NutritionPlan[] = [
  {
    id: '1',
    category: 'Bezerros',
    season: 'dry',
    strategy: 'Creep Feeding',
    supplementation: 'Ração 18% PB',
    creepFeeding: true,
  },
  {
    id: '2',
    category: 'Matrizes',
    season: 'dry',
    strategy: 'Manutenção',
    supplementation: 'Sal Ureado',
    creepFeeding: false,
  },
]

let mockHealthProtocols: HealthProtocol[] = [
  {
    id: '1',
    type: 'vaccination',
    name: 'Febre Aftosa',
    date: '2024-05-01',
    status: 'done',
    observation: 'Campanha oficial Maio',
  },
  {
    id: '2',
    type: 'deworming',
    name: 'Vermifugação Estratégica',
    date: '2024-05-10',
    season: 'dry',
    status: 'done',
    observation: 'Entrada da seca',
  },
]

let mockAnimals: Animal[] = [
  {
    id: '1',
    tag: 'BR-001',
    category: 'Vaca Prenhe',
    status: 'active',
    weightHistory: {
      birth: 32,
      d205: 190,
      current: 450,
      lastWeighingDate: '2024-05-01',
    },
  },
  {
    id: '2',
    tag: 'BR-002',
    category: 'Novilha',
    status: 'active',
    weightHistory: {
      birth: 30,
      d205: 180,
      current: 320,
      lastWeighingDate: '2024-05-10',
    },
  },
  {
    id: '3',
    tag: 'BR-003',
    category: 'Bezerro',
    status: 'active',
    weightHistory: {
      birth: 35,
      current: 120,
      lastWeighingDate: '2024-05-20',
    },
  },
]

let mockTasks: FarmTask[] = [
  {
    id: '1',
    title: 'Vacinação Aftosa',
    assignee: 'José (Capataz)',
    dueDate: '2024-05-30',
    status: 'pending',
    templateType: 'vaccination',
  },
]

let mockCosts: CostSummary[] = [
  {
    id: '1',
    category: 'nutrition',
    amount: 1500.0,
    date: '2024-05-01',
    description: 'Compra de Sal Mineral',
  },
  {
    id: '2',
    category: 'health',
    amount: 450.0,
    date: '2024-05-05',
    description: 'Vacinas',
  },
]

export const farmService = {
  // Pasture Methods
  getPastures: async (farmId: string): Promise<Pasture[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return mockPastures
  },

  savePasture: async (farmId: string, pasture: Partial<Pasture>) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    if (pasture.id) {
      mockPastures = mockPastures.map((p) =>
        p.id === pasture.id ? { ...p, ...pasture } : p,
      )
    } else {
      const newPasture = {
        ...pasture,
        id: Math.random().toString(36).substr(2, 9),
        schedule: [],
        maintenance: [],
        productivity: { msPerHa: 0, lastMeasurement: new Date().toISOString() },
      } as Pasture
      mockPastures.push(newPasture)
    }
    return pasture
  },

  getFarmPastureData: async (farmId: string) => {
    const pastures = await farmService.getPastures(farmId)
    return {
      paddocks: pastures,
      productivity: {
        msPerHa: 4500,
        lastMeasurement: '2024-05-15',
      },
      schedule: pastures.flatMap((p) =>
        p.schedule.map((s) => ({ ...s, paddock: p.name })),
      ),
      maintenance: pastures.flatMap((p) => p.maintenance),
      creepFeeding: pastures.some((p) => p.creepFeeding),
      rotationPlan: 'Rotacionado intensivo com 30 dias de descanso.',
      vedacao: {
        startDate: '2024-05-01',
        endDate: '2024-08-01',
        paddocks: pastures.filter((p) => p.vedacao?.active).map((p) => p.name),
      },
    }
  },

  // Nutrition Methods
  getNutritionPlans: async (farmId: string): Promise<NutritionData> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      plans: mockNutritionPlans,
      proposals: [],
      creepFeedingInfo:
        'Estruturas de Creep Feeding disponíveis. Consumo médio de 0.5% PV.',
      records: [],
    }
  },

  saveNutritionPlan: async (farmId: string, plan: Partial<NutritionPlan>) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (plan.id) {
      mockNutritionPlans = mockNutritionPlans.map((p) =>
        p.id === plan.id ? { ...p, ...plan } : p,
      )
    } else {
      mockNutritionPlans.push({
        ...plan,
        id: Math.random().toString(36).substr(2, 9),
      } as NutritionPlan)
    }
  },

  upsertNutritionProposal: async (
    farmId: string,
    proposal: Partial<NutritionProposal>,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...proposal,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'proposed',
    }
  },

  saveCreepFeedingRecord: async (
    farmId: string,
    record: Partial<CreepFeedingRecord>,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { ...record, id: Math.random().toString(36).substr(2, 9) }
  },

  // Sanitary Methods
  getHealthProtocols: async (farmId: string): Promise<SanitaryData> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      adoptedControl:
        'Controle estratégico de parasitas com base em OPG e calendário oficial de vacinação.',
      protocols: mockHealthProtocols,
      observations: 'Rebanho com bom estado sanitário geral.',
      records: [],
    }
  },

  saveHealthProtocol: async (
    farmId: string,
    protocol: Partial<HealthProtocol>,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (protocol.id) {
      mockHealthProtocols = mockHealthProtocols.map((p) =>
        p.id === protocol.id ? { ...p, ...protocol } : p,
      )
    } else {
      mockHealthProtocols.push({
        ...protocol,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
      } as HealthProtocol)
    }
  },

  recordHealthAction: async (farmId: string, record: Partial<HealthRecord>) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { ...record, id: Math.random().toString(36).substr(2, 9) }
  },

  // Reproduction
  getReproductionPlan: async (farmId: string): Promise<ReproductionPlan> => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return {
      breedingSeason: {
        start: '2024-11-01',
        end: '2025-02-28',
        method: 'IATF (3 protocolos) + Repasse com Touros',
      },
      traditionalWeaning: true,
      heiferPlan: {
        entryAge: 24,
        entryWeight: 320,
        target: 'Entrada na estação de monta 2025',
      },
      cullingList: [
        {
          id: '1',
          tag: 'BR-1020',
          reason: 'Idade avançada / Falha dentição',
          age: 12,
        },
      ],
    }
  },

  scheduleReproductionEvents: async (
    farmId: string,
    events: Partial<ReproductionEvent>[],
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return events.map((e) => ({
      ...e,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
    }))
  },

  // Herd
  getHerdData: async (farmId: string): Promise<HerdData> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      animals: mockAnimals,
      indices: {
        birthRate: 82.5,
        pregnancyRate: 88.0,
        mortalityRate: 2.1,
        offTakeRate: 22.5,
        averageDailyGain: 0.65,
      },
      movements: [],
    }
  },

  recordWeighing: async (
    farmId: string,
    weighing: { animalId: string; weight: number; date: string },
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    mockAnimals = mockAnimals.map((a) => {
      if (a.id === weighing.animalId) {
        return {
          ...a,
          weightHistory: {
            ...a.weightHistory,
            current: weighing.weight,
            lastWeighingDate: weighing.date,
          },
        }
      }
      return a
    })
    return true
  },

  getZootIndexes: async (farmId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      birthRate: 82.5,
      pregnancyRate: 88.0,
      mortalityRate: 2.1,
      offTakeRate: 22.5,
      averageDailyGain: 0.65,
    }
  },

  registerMovement: async (farmId: string, movement: Partial<HerdMovement>) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { ...movement, id: Math.random().toString(36).substr(2, 9) }
  },

  // Assistance
  getActivityProposals: async (farmId: string): Promise<ActivityProposal[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return [
      {
        id: '1',
        title: 'Reforma de Cochos - Pasto 3',
        description:
          'Os cochos estão danificados e precisam de reparo antes da seca.',
        priority: 'high',
        status: 'pending',
        createdAt: '2024-05-25',
      },
      {
        id: '2',
        title: 'Compra de Sal Mineral',
        description: 'Estoque baixo, previsão de término em 15 dias.',
        priority: 'medium',
        status: 'pending',
        createdAt: '2024-05-26',
      },
    ]
  },

  createTask: async (farmId: string, task: Partial<FarmTask>) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      ...task,
      status: 'pending',
    } as FarmTask
    mockTasks.push(newTask)
    return newTask
  },

  getAssistanceData: async (farmId: string): Promise<AssistanceData> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const proposals = await farmService.getActivityProposals(farmId)
    return {
      proposals,
      tasks: mockTasks,
      costs: mockCosts,
    }
  },

  getCosts: async (farmId: string): Promise<CostSummary[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockCosts
  },

  saveCost: async (farmId: string, cost: Partial<CostSummary>) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newCost = {
      ...cost,
      id: Math.random().toString(36).substr(2, 9),
    } as CostSummary
    mockCosts.push(newCost)
    return newCost
  },

  getDailyTaskTemplates: async (): Promise<TaskTemplate[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [
      {
        id: '1',
        title: 'Ronda Diária',
        items: [
          'Verificar cochos',
          'Verificar bebedouros',
          'Contagem de animais',
          'Verificar cercas',
        ],
      },
      {
        id: '2',
        title: 'Manutenção de Cerca',
        items: [
          'Verificar tensão dos fios',
          'Trocar isoladores quebrados',
          'Limpar aceiro',
        ],
      },
    ]
  },
}
