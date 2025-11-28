import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HealthProtocolsTable } from '@/components/farm/sanitary/HealthProtocolsTable'
import { HealthCalendar } from '@/components/farm/sanitary/HealthCalendar'
import { HealthRecordModal } from '@/components/farm/sanitary/HealthRecordModal'
import { farmService } from '@/services/farmService'
import { HealthProtocol, HealthRecord } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'
import { AlertTriangle, Plus, Syringe } from 'lucide-react'

export default function FarmSanitary() {
  const { farmId } = useParams()
  const { toast } = useToast()
  const [protocols, setProtocols] = useState<HealthProtocol[]>([])
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false)

  useEffect(() => {
    if (farmId) loadData()
  }, [farmId])

  const loadData = async () => {
    if (!farmId) return
    const data = await farmService.getHealthProtocols(farmId)
    setProtocols(data.protocols)
  }

  const handleGenerateTasks = async (season: 'dry' | 'rainy', date: Date) => {
    if (!farmId) return
    // Mock generating protocols based on season
    const newProtocol: Partial<HealthProtocol> = {
      type: season === 'dry' ? 'deworming' : 'tick_control',
      name: season === 'dry' ? 'Vermifugação Seca' : 'Controle Carrapatos',
      date: date.toISOString().split('T')[0],
      season,
      status: 'pending',
    }
    await farmService.saveHealthProtocol(farmId, newProtocol)
    loadData()
  }

  const handleSaveRecord = async (record: Partial<HealthRecord>) => {
    if (!farmId) return
    try {
      await farmService.recordHealthAction(farmId, record)
      toast({ title: 'Sucesso', description: 'Tratamento registrado.' })
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao registrar.',
      })
    }
  }

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Controle Sanitário</h1>
        <Button onClick={() => setIsRecordModalOpen(true)}>
          <Syringe className="mr-2 h-4 w-4" /> Registrar Tratamento
        </Button>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Consultar médico-veterinário antes de aplicar qualquer medicamento ou
          protocolo.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="protocols" className="w-full">
        <TabsList>
          <TabsTrigger value="protocols">Protocolos & Vacinas</TabsTrigger>
          <TabsTrigger value="calendar">Calendário & Planejamento</TabsTrigger>
        </TabsList>

        <TabsContent value="protocols" className="mt-4">
          <HealthProtocolsTable protocols={protocols} />
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <HealthCalendar onGenerateTasks={handleGenerateTasks} />
        </TabsContent>
      </Tabs>

      <HealthRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        onSave={handleSaveRecord}
      />
    </div>
  )
}
