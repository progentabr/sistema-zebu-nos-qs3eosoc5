import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { farmService } from '@/services/farmService'
import { TaskTemplate } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'

export function DailyTasksForm() {
  const { toast } = useToast()
  const [templates, setTemplates] = useState<TaskTemplate[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const loadTemplates = async () => {
      const data = await farmService.getDailyTaskTemplates()
      setTemplates(data)
    }
    loadTemplates()
  }, [])

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId)

  const handleSave = () => {
    toast({
      title: 'Tarefa Registrada',
      description: 'Execução diária salva com sucesso.',
    })
    setChecklist({})
    setSelectedTemplateId('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Rotina Diária</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Selecione a Rotina</Label>
          <Select
            value={selectedTemplateId}
            onValueChange={setSelectedTemplateId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {templates.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTemplate && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              {selectedTemplate.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Checkbox
                    id={`item-${idx}`}
                    checked={checklist[item] || false}
                    onCheckedChange={(c) =>
                      setChecklist({ ...checklist, [item]: !!c })
                    }
                  />
                  <Label htmlFor={`item-${idx}`}>{item}</Label>
                </div>
              ))}
            </div>
            <Button onClick={handleSave} className="w-full">
              Registrar Execução
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
