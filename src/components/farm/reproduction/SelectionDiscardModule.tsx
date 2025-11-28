import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { farmService } from '@/services/farmService'
import { AlertTriangle } from 'lucide-react'

interface SelectionDiscardModuleProps {
  farmId: string
}

export function SelectionDiscardModule({
  farmId,
}: SelectionDiscardModuleProps) {
  const { toast } = useToast()
  const [animalTag, setAnimalTag] = useState('')
  const [reason, setReason] = useState('')

  const handleMarkForCulling = async () => {
    if (!animalTag || !reason) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha o brinco e o motivo.',
      })
      return
    }

    try {
      // Create a task for the team to separate this animal
      await farmService.createTask(farmId, {
        title: `Separar animal ${animalTag} para descarte`,
        description: `Motivo: ${reason}`,
        assignee: 'Equipe de Campo',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'pending',
      })
      toast({
        title: 'Sucesso',
        description: 'Animal marcado e tarefa de separação criada.',
      })
      setAnimalTag('')
      setReason('')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao registrar.',
      })
    }
  }

  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-5 w-5" /> Seleção e Descarte
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Identificação do Animal (Brinco)</Label>
          <Input
            value={animalTag}
            onChange={(e) => setAnimalTag(e.target.value)}
            placeholder="Ex: 1050"
          />
        </div>
        <div className="space-y-2">
          <Label>Justificativa do Descarte</Label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ex: Idade avançada, falha reprodutiva, temperamento..."
          />
        </div>
        <Button
          variant="destructive"
          onClick={handleMarkForCulling}
          className="w-full"
        >
          Marcar para Descarte
        </Button>
      </CardContent>
    </Card>
  )
}
