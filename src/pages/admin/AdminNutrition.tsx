import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { farmService } from '@/services/farmService'
import { Farm, NutritionData } from '@/lib/types'
import { NutritionDetails } from '@/components/admin/NutritionDetails'
import { FarmSelector } from '@/components/admin/FarmSelector'
import { Loader2 } from 'lucide-react'

export default function AdminNutrition() {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null)
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null)
  const [loadingData, setLoadingData] = useState(false)

  const loadNutritionData = useCallback(async () => {
    if (!selectedFarm) return
    setLoadingData(true)
    try {
      const data = await farmService.getNutritionPlans(selectedFarm.id)
      setNutritionData(data)
    } catch (error) {
      console.error('Failed to load nutrition data', error)
    } finally {
      setLoadingData(false)
    }
  }, [selectedFarm])

  useEffect(() => {
    if (!selectedFarm) {
      setNutritionData(null)
      return
    }
    loadNutritionData()
  }, [selectedFarm, loadNutritionData])

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Admin: Manejo Nutricional</h1>
        <p className="text-muted-foreground">
          Gerencie planos nutricionais, propostas de ração e suplementação.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Seleção de Fazenda</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <FarmSelector
                onSelect={setSelectedFarm}
                selectedFarmId={selectedFarm?.id}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedFarm ? (
            loadingData ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : nutritionData ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Dados de: {selectedFarm.name}
                </h2>
                <NutritionDetails
                  data={nutritionData}
                  farmId={selectedFarm.id}
                  onUpdate={loadNutritionData}
                />
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Não há dados nutricionais disponíveis.
                </CardContent>
              </Card>
            )
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[300px]">
              <CardContent className="text-center text-muted-foreground">
                <p>Selecione uma fazenda ao lado para ver os detalhes.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
