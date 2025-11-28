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
import { Textarea } from '@/components/ui/textarea'
import { HealthRecord } from '@/lib/types'

interface HealthRecordModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (record: Partial<HealthRecord>) => void
}

export function HealthRecordModal({
  isOpen,
  onClose,
  onSave,
}: HealthRecordModalProps) {
  const [formData, setFormData] = useState<Partial<HealthRecord>>({
    date: new Date().toISOString().split('T')[0],
    product: '',
    dose: '',
    cost: 0,
    notes: '',
    animalId: '',
  })

  const handleSubmit = () => {
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Tratamento Individual</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>ID Animal (Opcional)</Label>
              <Input
                placeholder="Brinco/Nome"
                value={formData.animalId}
                onChange={(e) =>
                  setFormData({ ...formData, animalId: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Produto</Label>
            <Input
              placeholder="Nome do medicamento"
              value={formData.product}
              onChange={(e) =>
                setFormData({ ...formData, product: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Dose</Label>
              <Input
                placeholder="Ex: 5ml"
                value={formData.dose}
                onChange={(e) =>
                  setFormData({ ...formData, dose: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Custo (R$)</Label>
              <Input
                type="number"
                value={formData.cost}
                onChange={(e) =>
                  setFormData({ ...formData, cost: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Salvar Registro</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
