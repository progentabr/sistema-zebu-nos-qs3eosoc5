import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { farmService } from '@/services/farmService'
import { Farm, ReproductionPlan } from '@/lib/types'
import { ReproductionDetails } from '@/components/admin/ReproductionDetails'
import { FarmSelector } from '@/components/admin/FarmSelector'
import { Loader2 } from 'lucide-react'

export default function AdminReproduction() {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null)
  const [reproductionData, setReproductionData] =
    useState<ReproductionPlan | null>(null)
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (!selectedFarm) {
      setReproductionData(null)
      return
    }

    const loadData = async () => {
      setLoadingData(true)
      try {
        const data = await farmService.getReproductionPlan(selectedFarm.id)
        setReproductionData(data)
      } catch (error) {
        console.error('Failed to load reproduction data', error)
      } finally {
        setLoadingData(false)
      }
    }
    loadData()
  }, [selectedFarm])

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Admin: Manejo Reprodutivo</h1>
        <p className="text-muted-foreground">
          Gerencie estações de monta, IATF e descartes reprodutivos.
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
            ) : reproductionData ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Dados de: {selectedFarm.name}
                </h2>
                <ReproductionDetails
                  data={reproductionData}
                  farmId={selectedFarm.id}
                />
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Não há dados reprodutivos disponíveis.
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
