import {
  NutritionData,
  SanitaryData,
  NutritionProposal,
  ReproductionPlan,
  HerdData,
  AssistanceData,
  FarmTask,
} from '@/lib/types'

export const farmService = {
  getFarmPastureData: async (farmId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      paddocks: [
        { id: 1, name: 'Pasto 1', area: 15, capacity: 1.2, status: 'Ocupado' },
        { id: 2, name: 'Pasto 2', area: 20, capacity: 1.0, status: 'Descanso' },
        { id: 3, name: 'Pasto 3', area: 12, capacity: 1.5, status: 'Vedado' },
      ],
      productivity: {
        msPerHa: 4500,
        lastMeasurement: '2024-05-15',
      },
      schedule: [
        { date: '2024-06-01', action: 'Entrada Lote A', paddock: 'Pasto 2' },
        { date: '2024-06-15', action: 'Saída Lote B', paddock: 'Pasto 1' },
      ],
      maintenance: [
        {
          item: 'Adubação de cobertura',
          status: 'pending',
          date: '2024-09-01',
        },
        { item: 'Controle de invasoras', status: 'done', date: '2024-04-10' },
      ],
      creepFeeding: true,
      rotationPlan: 'Rotacionado intensivo com 30 dias de descanso.',
      vedacao: {
        startDate: '2024-05-01',
        endDate: '2024-08-01',
        paddocks: ['Pasto 3'],
      },
    }
  },

  getNutritionPlans: async (farmId: string): Promise<NutritionData> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      plans: [
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
        {
          id: '3',
          category: 'Recria',
          season: 'rainy',
          strategy: 'Ganho de Peso',
          supplementation: 'Sal Mineral 80g P',
          creepFeeding: false,
        },
      ],
      proposals: [
        {
          id: '1',
          title: 'Ajuste Proteico Seca',
          description: 'Aumentar ureia para lote de fundo.',
          mixture: 'Milho 60%, Farelo Soja 30%, Núcleo 10%',
          createdAt: '2024-05-20',
          status: 'proposed',
        },
      ],
      creepFeedingInfo:
        'Estruturas de Creep Feeding disponíveis nos pastos 1, 2 e 4. Consumo médio de 0.5% PV.',
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

  getHealthProtocols: async (farmId: string): Promise<SanitaryData> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      adoptedControl:
        'Controle estratégico de parasitas com base em OPG e calendário oficial de vacinação.',
      protocols: [
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
          type: 'vaccination',
          name: 'Brucelose',
          date: '2024-06-15',
          status: 'pending',
          observation: 'Fêmeas de 3 a 8 meses',
        },
        {
          id: '3',
          type: 'deworming',
          name: 'Vermifugação Estratégica',
          date: '2024-05-10',
          season: 'dry',
          status: 'done',
          observation: 'Entrada da seca',
        },
        {
          id: '4',
          type: 'tick_control',
          name: 'Banho Carrapaticida',
          date: '2024-10-15',
          season: 'rainy',
          status: 'pending',
          observation: 'Início das águas',
        },
      ],
      observations:
        'Rebanho com bom estado sanitário geral. Atenção para casos isolados de tristeza parasitária no lote de compra recente.',
    }
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
        {
          id: '2',
          tag: 'BR-3044',
          reason: 'Vazia por 2 estações consecutivas',
          age: 6,
        },
        {
          id: '3',
          tag: 'BR-5012',
          reason: 'Problema de casco crônico',
          age: 5,
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
        {
          id: '2',
          tag: 'BR-002',
          category: 'Novilha',
          status: 'active',
          weightHistory: {
            birth: 30,
            d205: 185,
            current: 310,
            lastWeighingDate: '2024-05-01',
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
            lastWeighingDate: '2024-05-15',
          },
        },
        {
          id: '4',
          tag: 'BR-004',
          category: 'Touro',
          status: 'active',
          weightHistory: {
            birth: 38,
            d205: 210,
            current: 850,
            lastWeighingDate: '2024-04-20',
          },
        },
      ],
      indices: {
        birthRate: 82.5,
        pregnancyRate: 88.0,
        mortalityRate: 2.1,
        offTakeRate: 22.5,
      },
      movements: [
        {
          id: '1',
          date: '2024-05-10',
          type: 'entry',
          quantity: 15,
          description: 'Compra de Bezerros',
          category: 'Bezerro',
        },
        {
          id: '2',
          date: '2024-04-20',
          type: 'exit',
          quantity: 10,
          description: 'Venda de Vacas Descarte',
          category: 'Vaca',
        },
      ],
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
      {
        id: '2',
        title: 'Ajuste de Lotação',
        description:
          'Reduzir carga animal no módulo 2 devido à baixa pluviosidade.',
        priority: 'medium',
        status: 'approved',
        createdAt: '2024-05-20',
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
        {
          id: '2',
          title: 'Ronda Semanal',
          assignee: 'Pedro',
          dueDate: '2024-05-28',
          status: 'done',
          templateType: 'daily_check',
        },
      ],
      costs: [
        {
          id: '1',
          category: 'Nutrição',
          amount: 15000,
          date: '2024-05-01',
          description: 'Compra de Sal Mineral',
        },
        {
          id: '2',
          category: 'Sanitário',
          amount: 3500,
          date: '2024-05-05',
          description: 'Vacinas e Vermífugos',
        },
        {
          id: '3',
          category: 'Mão de Obra',
          amount: 8000,
          date: '2024-05-05',
          description: 'Pagamento Mensal',
        },
      ],
    }
  },
}
