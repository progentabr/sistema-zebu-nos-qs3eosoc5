import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NutritionPlansTable } from '@/components/farm/nutrition/NutritionPlansTable'
import { NutritionPlanEditor } from '@/components/farm/nutrition/NutritionPlanEditor'
import { FormulationSuggestor } from '@/components/farm/nutrition/FormulationSuggestor'
import { CreepFeedingModule } from '@/components/farm/nutrition/CreepFeedingModule'
import { farmService } from '@/services/farmService'
import { NutritionPlan } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'
import { Plus } from 'lucide-react'

export default function FarmNutrition() {
  const { farmId } = useParams()
  const { toast } = useToast()
  const [plans, setPlans] = useState<NutritionPlan[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingPlan, setEditingPlan] = useState<NutritionPlan | undefined>(
    undefined,
  )

  const loadPlans = useCallback(async () => {
    if (!farmId) return
    const data = await farmService.getNutritionPlans(farmId)
    setPlans(data.plans)
  }, [farmId])

  useEffect(() => {
    if (farmId) loadPlans()
  }, [farmId, loadPlans])

  const handleSavePlan = async (plan: Partial<NutritionPlan>) => {
    if (!farmId) return
    try {
      await farmService.saveNutritionPlan(farmId, plan)
      toast({ title: 'Sucesso', description: 'Plano salvo.' })
      setIsEditing(false)
      loadPlans()
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao salvar.',
      })
    }
  }

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manejo Nutricional</h1>
        {!isEditing && (
          <Button
            onClick={() => {
              setEditingPlan(undefined)
              setIsEditing(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Plano
          </Button>
        )}
      </div>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList>
          <TabsTrigger value="plans">Planos Nutricionais</TabsTrigger>
          <TabsTrigger value="tools">Ferramentas & Creep</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="mt-4">
          {isEditing ? (
            <NutritionPlanEditor
              plan={editingPlan}
              onSave={handleSavePlan}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <NutritionPlansTable
              plans={plans}
              onEdit={(plan) => {
                setEditingPlan(plan)
                setIsEditing(true)
              }}
            />
          )}
        </TabsContent>

        <TabsContent value="tools" className="mt-4 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormulationSuggestor />
            {farmId && <CreepFeedingModule farmId={farmId} />}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
