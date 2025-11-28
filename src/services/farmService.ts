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
}
