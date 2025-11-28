import { Farm } from '@/lib/types'
import { mockFarms } from '@/services/mockService'

// Mock data for metrics
const mockMetrics = {
  newFarms: 12,
  activeFarms: 45,
  chartData: [
    { month: 'Jan', farms: 10 },
    { month: 'Fev', farms: 15 },
    { month: 'Mar', farms: 22 },
    { month: 'Abr', farms: 30 },
    { month: 'Mai', farms: 38 },
    { month: 'Jun', farms: 45 },
  ],
}

export const adminService = {
  // GET /api/admin/metrics?months=6
  getAdminMetrics: async (months: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockMetrics
  },

  listFarms: async (page: number, search: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    let filtered = [...mockFarms]
    if (search) {
      const s = search.toLowerCase()
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(s) ||
          f.address.toLowerCase().includes(s) ||
          f.phone.includes(s),
      )
    }
    return {
      data: filtered,
      total: filtered.length,
      page,
      totalPages: 1,
    }
  },

  upsertFarm: async (farm: Partial<Farm>) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      ...farm,
      id: farm.id || Math.random().toString(36).substr(2, 9),
      status: farm.status || 'active',
    } as Farm
  },

  deactivateFarm: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return true
  },
}
