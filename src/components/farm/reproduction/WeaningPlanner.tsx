import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { farmService } from '@/services/farmService'
import { Baby } from 'lucide-react'

interface WeaningPlannerProps {
  farmId: string
}

export function WeaningPlanner({ farmId }: WeaningPlannerProps) {
  const { toast } = useToast()
  const [weaningDate, setWeaningDate] = useState('')
  const [checklist, setChecklist] = useState({
    paddockPrepared: false,
    vaccinesReady: false,
    identificationReady: false,
    staffScheduled: false,
  })

  const handleSavePlan = async () => {
    if (!weaningDate) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Defina a data do desmame.',
      })
      return
    }
    try {
      await farmService.scheduleReproductionEvents(farmId, [
        {
          type: 'weaning',
          date: weaningDate,
          description: 'Desmame Tradicional',
          status: 'pending',
        },
      ])
      toast({
        title: 'Sucesso',
        description: 'Desmame agendado com sucesso.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao agendar.',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Baby className="h-5 w-5" /> Planejamento de Desmame
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Data Prevista para Separação</Label>
          <Input
            type="date"
            value={weaningDate}
            onChange={(e) => setWeaningDate(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base">Checklist Pré-Desmame</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="paddock"
              checked={checklist.paddockPrepared}
              onCheckedChange={(c) =>
                setChecklist({ ...checklist, paddockPrepared: !!c })
              }
            />
            <Label htmlFor="paddock">Pasto de destino vedado/preparado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vaccines"
              checked={checklist.vaccinesReady}
              onCheckedChange={(c) =>
                setChecklist({ ...checklist, vaccinesReady: !!c })
              }
            />
            <Label htmlFor="vaccines">Vacinas (Clostridioses) compradas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="id"
              checked={checklist.identificationReady}
              onCheckedChange={(c) =>
                setChecklist({ ...checklist, identificationReady: !!c })
              }
            />
            <Label htmlFor="id">Brincos de identificação conferidos</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="staff"
              checked={checklist.staffScheduled}
              onCheckedChange={(c) =>
                setChecklist({ ...checklist, staffScheduled: !!c })
              }
            />
            <Label htmlFor="staff">Equipe de curral agendada</Label>
          </div>
        </div>

        <Button onClick={handleSavePlan} className="w-full">
          Confirmar Planejamento
        </Button>
      </CardContent>
    </Card>
  )
}
