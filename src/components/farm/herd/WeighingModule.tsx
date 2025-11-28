import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { farmService } from '@/services/farmService'
import { Scale, Upload } from 'lucide-react'

interface WeighingModuleProps {
  farmId: string
  onUpdate: () => void
}

export function WeighingModule({ farmId, onUpdate }: WeighingModuleProps) {
  const { toast } = useToast()
  const [manualEntry, setManualEntry] = useState({
    animalId: '',
    weight: '',
    date: new Date().toISOString().split('T')[0],
  })

  const handleManualSubmit = async () => {
    if (!manualEntry.animalId || !manualEntry.weight) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha todos os campos.',
      })
      return
    }

    try {
      // In a real app, we would resolve animalId to internal ID
      // Here we assume animalId is the ID for simplicity or mock logic
      await farmService.recordWeighing(farmId, {
        animalId: '1', // Mocking ID resolution
        weight: Number(manualEntry.weight),
        date: manualEntry.date,
      })
      toast({ title: 'Sucesso', description: 'Pesagem registrada.' })
      setManualEntry({ ...manualEntry, animalId: '', weight: '' })
      onUpdate()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao registrar.',
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Mock CSV processing
      setTimeout(() => {
        toast({
          title: 'Arquivo Processado',
          description: `Importados dados de ${file.name} com sucesso.`,
        })
        onUpdate()
      }, 1500)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5" /> Registro de Pesagem
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual">
          <TabsList className="w-full">
            <TabsTrigger value="manual" className="flex-1">
              Manual
            </TabsTrigger>
            <TabsTrigger value="import" className="flex-1">
              Importar CSV
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data</Label>
                <Input
                  type="date"
                  value={manualEntry.date}
                  onChange={(e) =>
                    setManualEntry({ ...manualEntry, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Brinco do Animal</Label>
                <Input
                  placeholder="Ex: 1050"
                  value={manualEntry.animalId}
                  onChange={(e) =>
                    setManualEntry({ ...manualEntry, animalId: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Peso (kg)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={manualEntry.weight}
                onChange={(e) =>
                  setManualEntry({ ...manualEntry, weight: e.target.value })
                }
              />
            </div>
            <Button onClick={handleManualSubmit} className="w-full">
              Salvar Pesagem
            </Button>
          </TabsContent>

          <TabsContent value="import" className="space-y-4 mt-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Arraste seu arquivo CSV ou clique para selecionar
                </p>
                <p className="text-xs text-muted-foreground">
                  Formato: Data, Brinco, Peso
                </p>
              </div>
              <Input
                type="file"
                accept=".csv"
                className="max-w-xs mx-auto"
                onChange={handleFileUpload}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
