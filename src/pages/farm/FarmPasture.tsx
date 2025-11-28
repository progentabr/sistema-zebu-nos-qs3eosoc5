import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PastureMap } from '@/components/farm/pasture/PastureMap'
import { PastureListTable } from '@/components/farm/pasture/PastureListTable'
import { PastureDetailPanel } from '@/components/farm/pasture/PastureDetailPanel'
import { PastureCalculatorModal } from '@/components/farm/pasture/PastureCalculatorModal'
import { farmService } from '@/services/farmService'
import { Pasture } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'
import { Calculator, Plus } from 'lucide-react'

export default function FarmPasture() {
  const { farmId } = useParams()
  const { toast } = useToast()
  const [pastures, setPastures] = useState<Pasture[]>([])
  const [selectedPasture, setSelectedPasture] = useState<Pasture | null>(null)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  const loadPastures = useCallback(async () => {
    if (!farmId) return
    const data = await farmService.getPastures(farmId)
    setPastures(data)
  }, [farmId])

  useEffect(() => {
    if (farmId) {
      loadPastures()
    }
  }, [farmId, loadPastures])

  const handleAddPasture = async (pasture: Partial<Pasture>) => {
    if (!farmId) return
    try {
      await farmService.savePasture(farmId, pasture)
      toast({ title: 'Sucesso', description: 'Pasto adicionado.' })
      loadPastures()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao salvar.',
      })
    }
  }

  const handleUpdatePasture = async (pasture: Pasture) => {
    if (!farmId) return
    try {
      await farmService.savePasture(farmId, pasture)
      setSelectedPasture(pasture)
      toast({ title: 'Sucesso', description: 'Pasto atualizado.' })
      loadPastures()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao atualizar.',
      })
    }
  }

  const handleSaveCalculation = async (capacity: number, msPerHa: number) => {
    if (!selectedPasture || !farmId) return
    const updated = {
      ...selectedPasture,
      capacity,
      productivity: {
        ...selectedPasture.productivity,
        msPerHa,
        lastMeasurement: new Date().toISOString(),
      },
    }
    await handleUpdatePasture(updated)
  }

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manejo de Pastagens</h1>
        {selectedPasture && (
          <Button variant="outline" onClick={() => setIsCalculatorOpen(true)}>
            <Calculator className="mr-2 h-4 w-4" /> Calculadora
          </Button>
        )}
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsList>
          <TabsTrigger value="map">Mapa & Lista</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedPasture}>
            Detalhes do Piquete
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PastureMap pastures={pastures} onAddPasture={handleAddPasture} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Lista de Piquetes</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedPasture(null)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <PastureListTable
                pastures={pastures}
                onSelect={(p) => {
                  setSelectedPasture(p)
                  const tabs = document.querySelector('[role="tablist"]')
                  const detailsTab = tabs?.querySelector(
                    '[data-state="inactive"][value="details"]',
                  ) as HTMLElement
                  if (detailsTab) detailsTab.click()
                }}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          {selectedPasture ? (
            <PastureDetailPanel
              pasture={selectedPasture}
              onUpdate={handleUpdatePasture}
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Selecione um pasto para ver os detalhes.
            </div>
          )}
        </TabsContent>
      </Tabs>

      {selectedPasture && (
        <PastureCalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
          pasture={selectedPasture}
          onSave={handleSaveCalculation}
        />
      )}
    </div>
  )
}
