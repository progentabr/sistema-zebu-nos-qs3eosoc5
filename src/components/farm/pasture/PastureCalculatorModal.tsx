import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pasture } from '@/lib/types'

interface PastureCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  pasture: Pasture
  onSave: (capacity: number, msPerHa: number) => void
}

export function PastureCalculatorModal({
  isOpen,
  onClose,
  pasture,
  onSave,
}: PastureCalculatorModalProps) {
  const [msPerHa, setMsPerHa] = useState(pasture.productivity.msPerHa || 4000)
  const [consumption, setConsumption] = useState(4500) // kg MS/ano/UA (aprox 10-12kg/dia)

  const capacity = (pasture.area * msPerHa) / consumption
  const capacityPerHa = capacity / pasture.area

  const handleSave = () => {
    onSave(Number(capacityPerHa.toFixed(2)), msPerHa)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calculadora de Capacidade de Suporte</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Produtividade Estimada (kg MS/ha/ano)</Label>
            <Input
              type="number"
              value={msPerHa}
              onChange={(e) => setMsPerHa(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Baseado em amostragem ou histórico.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Consumo Anual por UA (kg MS)</Label>
            <Input
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              1 UA (450kg) consome aprox. 2-2.5% do PV em MS.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-md space-y-2">
            <div className="flex justify-between">
              <span>Área do Pasto:</span>
              <span className="font-bold">{pasture.area} ha</span>
            </div>
            <div className="flex justify-between">
              <span>Capacidade Total:</span>
              <span className="font-bold">{capacity.toFixed(1)} UA</span>
            </div>
            <div className="flex justify-between text-primary">
              <span>Capacidade por Hectare:</span>
              <span className="font-bold">
                {capacityPerHa.toFixed(2)} UA/ha
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Cálculo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
