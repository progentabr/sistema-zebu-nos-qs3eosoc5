import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import { AnimalsIdentificationTable } from '@/components/farm/herd/AnimalsIdentificationTable'
import { WeighingModule } from '@/components/farm/herd/WeighingModule'
import { ZootecnicalIndicesPanel } from '@/components/farm/herd/ZootecnicalIndicesPanel'
import { MovementRegister } from '@/components/farm/herd/MovementRegister'
import { farmService } from '@/services/farmService'
import { HerdData } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'

export default function FarmHerd() {
  const { farmId } = useParams()
  const { toast } = useToast()
  const [herdData, setHerdData] = useState<HerdData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    if (!farmId) return
    setLoading(true)
    try {
      const data = await farmService.getHerdData(farmId)
      setHerdData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [farmId])

  const handleExport = () => {
    toast({
      title: 'Exportação',
      description: 'Ficha zootécnica baixada (PDF).',
    })
  }

  if (!farmId) return null

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manejo do Rebanho</h1>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Exportar Ficha
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : herdData ? (
        <Tabs defaultValue="indices" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="indices" className="py-2">
              Índices
            </TabsTrigger>
            <TabsTrigger value="animals" className="py-2">
              Animais
            </TabsTrigger>
            <TabsTrigger value="weighing" className="py-2">
              Pesagem
            </TabsTrigger>
            <TabsTrigger value="movement" className="py-2">
              Movimentação
            </TabsTrigger>
          </TabsList>

          <TabsContent value="indices" className="mt-4">
            <ZootecnicalIndicesPanel indices={herdData.indices} />
          </TabsContent>

          <TabsContent value="animals" className="mt-4">
            <AnimalsIdentificationTable animals={herdData.animals} />
          </TabsContent>

          <TabsContent value="weighing" className="mt-4">
            <WeighingModule farmId={farmId} onUpdate={loadData} />
          </TabsContent>

          <TabsContent value="movement" className="mt-4">
            <MovementRegister farmId={farmId} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Erro ao carregar dados.
        </div>
      )}
    </div>
  )
}
