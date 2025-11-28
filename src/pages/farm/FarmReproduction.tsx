import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { ReproductionPlanner } from '@/components/farm/reproduction/ReproductionPlanner'
import { WeaningPlanner } from '@/components/farm/reproduction/WeaningPlanner'
import { SelectionDiscardModule } from '@/components/farm/reproduction/SelectionDiscardModule'
import { useToast } from '@/hooks/use-toast'

export default function FarmReproduction() {
  const { farmId } = useParams()
  const { toast } = useToast()

  const handleExport = () => {
    toast({
      title: 'Exportação',
      description: 'Relatório reprodutivo baixado (CSV).',
    })
  }

  if (!farmId) return null

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manejo Reprodutivo</h1>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Exportar Relatório
        </Button>
      </div>

      <Tabs defaultValue="planning" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="planning">Estação & IATF</TabsTrigger>
          <TabsTrigger value="weaning">Desmame</TabsTrigger>
          <TabsTrigger value="culling">Seleção & Descarte</TabsTrigger>
        </TabsList>

        <TabsContent value="planning" className="mt-4">
          <ReproductionPlanner farmId={farmId} />
        </TabsContent>

        <TabsContent value="weaning" className="mt-4">
          <WeaningPlanner farmId={farmId} />
        </TabsContent>

        <TabsContent value="culling" className="mt-4">
          <SelectionDiscardModule farmId={farmId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
