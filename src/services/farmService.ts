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
    // Legacy support for AdminPasture
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

  // Herd
  getHerdData: async (farmId: string): Promise<HerdData> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      animals: [
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
      ],
      indices: {
        birthRate: 82.5,
        pregnancyRate: 88.0,
        mortalityRate: 2.1,
        offTakeRate: 22.5,
      },
      movements: [],
    }
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
    ]
  },

  createTask: async (farmId: string, task: Partial<FarmTask>) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...task,
      status: 'pending',
    } as FarmTask
  },

  getAssistanceData: async (farmId: string): Promise<AssistanceData> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const proposals = await farmService.getActivityProposals(farmId)
    return {
      proposals,
      tasks: [
        {
          id: '1',
          title: 'Vacinação Aftosa',
          assignee: 'José (Capataz)',
          dueDate: '2024-05-30',
          status: 'pending',
          templateType: 'vaccination',
        },
      ],
      costs: [],
    }
  },
}
