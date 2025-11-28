import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { farmService } from '@/services/farmService'
import { Farm } from '@/lib/types'
import { PastureDetails } from '@/components/admin/PastureDetails'
import { FarmSelector } from '@/components/admin/FarmSelector'
import { Loader2 } from 'lucide-react'

export default function AdminPasture() {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null)
  const [pastureData, setPastureData] = useState<any>(null)
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (!selectedFarm) {
      setPastureData(null)
      return
    }

    const loadPastureData = async () => {
      setLoadingData(true)
      try {
        const data = await farmService.getFarmPastureData(selectedFarm.id)
        setPastureData(data)
      } catch (error) {
        console.error('Failed to load pasture data', error)
      } finally {
        setLoadingData(false)
      }
    }
    loadPastureData()
  }, [selectedFarm])

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Admin: Manejo de Pastagens</h1>
        <p className="text-muted-foreground">
          Selecione uma fazenda para visualizar e gerenciar os detalhes de
          pastagem, capacidade de suporte e divisões.
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
            ) : pastureData ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Dados de: {selectedFarm.name}
                </h2>
                <PastureDetails data={pastureData} />
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Não há dados de pastagem disponíveis para esta fazenda.
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
