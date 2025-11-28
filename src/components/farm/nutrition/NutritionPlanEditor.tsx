import { useState, useEffect } from 'react'
import { NutritionPlan } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NutritionPlanEditorProps {
  plan?: NutritionPlan
  onSave: (plan: Partial<NutritionPlan>) => void
  onCancel: () => void
}

export function NutritionPlanEditor({
  plan,
  onSave,
  onCancel,
}: NutritionPlanEditorProps) {
  const [formData, setFormData] = useState<Partial<NutritionPlan>>({
    category: '',
    season: 'dry',
    strategy: '',
    supplementation: '',
    creepFeeding: false,
  })

  useEffect(() => {
    if (plan) {
      setFormData(plan)
    }
  }, [plan])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {plan ? 'Editar Plano' : 'Novo Plano Nutricional'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Categoria Animal</Label>
            <Input
              placeholder="Ex: Bezerros, Matrizes"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Estação</Label>
            <Select
              value={formData.season}
              onValueChange={(v: any) =>
                setFormData({ ...formData, season: v })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dry">Seca</SelectItem>
                <SelectItem value="rainy">Águas</SelectItem>
                <SelectItem value="transition">Transição</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Estratégia</Label>
          <Input
            placeholder="Ex: Manutenção de peso, Ganho moderado"
            value={formData.strategy}
            onChange={(e) =>
              setFormData({ ...formData, strategy: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Suplementação</Label>
          <Input
            placeholder="Ex: Sal Mineral 80g P, Proteinado 0.1%"
            value={formData.supplementation}
            onChange={(e) =>
              setFormData({ ...formData, supplementation: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Label>Utiliza Creep Feeding?</Label>
          <Switch
            checked={formData.creepFeeding}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, creepFeeding: checked })
            }
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(formData)}>Salvar Plano</Button>
        </div>
      </CardContent>
    </Card>
  )
}
