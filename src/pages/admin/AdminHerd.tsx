import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { farmService } from '@/services/farmService'
import { Farm, HerdData } from '@/lib/types'
import { HerdDetails } from '@/components/admin/HerdDetails'
import { FarmSelector } from '@/components/admin/FarmSelector'
import { Loader2 } from 'lucide-react'

export default function AdminHerd() {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null)
  const [herdData, setHerdData] = useState<HerdData | null>(null)
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (!selectedFarm) {
      setHerdData(null)
      return
    }

    const loadData = async () => {
      setLoadingData(true)
      try {
        const data = await farmService.getHerdData(selectedFarm.id)
        setHerdData(data)
      } catch (error) {
        console.error('Failed to load herd data', error)
      } finally {
        setLoadingData(false)
      }
    }
    loadData()
  }, [selectedFarm])

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Admin: Manejo de Rebanho</h1>
        <p className="text-muted-foreground">
          Visualize inventário, pesagens e índices zootécnicos.
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
            ) : herdData ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Dados de: {selectedFarm.name}
                </h2>
                <HerdDetails data={herdData} farmId={selectedFarm.id} />
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Não há dados de rebanho disponíveis.
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
