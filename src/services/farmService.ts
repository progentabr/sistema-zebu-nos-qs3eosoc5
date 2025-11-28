import { NutritionData, SanitaryData, NutritionProposal } from '@/lib/types'

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
}
