import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { adminService } from '@/services/adminService'
import { farmService } from '@/services/farmService'
import { Farm } from '@/lib/types'
import { PastureDetails } from '@/components/admin/PastureDetails'
import { Loader2 } from 'lucide-react'

export default function AdminPasture() {
  const [farms, setFarms] = useState<Farm[]>([])
  const [selectedFarmId, setSelectedFarmId] = useState<string>('')
  const [pastureData, setPastureData] = useState<any>(null)
  const [loadingFarms, setLoadingFarms] = useState(true)
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    const loadFarms = async () => {
      const response = await adminService.listFarms(1, '')
      setFarms(response.data)
      setLoadingFarms(false)
    }
    loadFarms()
  }, [])

  useEffect(() => {
    if (!selectedFarmId) return

    const loadPastureData = async () => {
      setLoadingData(true)
      const data = await farmService.getFarmPastureData(selectedFarmId)
      setPastureData(data)
      setLoadingData(false)
    }
    loadPastureData()
  }, [selectedFarmId])

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Admin: Manejo de Pastagens</h1>
        <p className="text-muted-foreground">
          Selecione uma fazenda para visualizar e gerenciar os detalhes de
          pastagem.
        </p>
      </div>

      <div className="w-full max-w-sm">
        <Select value={selectedFarmId} onValueChange={setSelectedFarmId}>
          <SelectTrigger>
            <SelectValue
              placeholder={
                loadingFarms ? 'Carregando fazendas...' : 'Selecione a fazenda'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {farms.map((farm) => (
              <SelectItem key={farm.id} value={farm.id}>
                {farm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedFarmId ? (
        loadingData ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : pastureData ? (
          <PastureDetails data={pastureData} />
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Não há dados de pastagem disponíveis para esta fazenda.
            </CardContent>
          </Card>
        )
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Nenhuma fazenda selecionada</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Utilize o seletor acima para carregar os dados.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
