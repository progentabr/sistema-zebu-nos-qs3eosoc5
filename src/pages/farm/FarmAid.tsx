import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ActivityProposalsTable } from '@/components/farm/aid/ActivityProposalsTable'
import { AgendaCalendar } from '@/components/farm/aid/AgendaCalendar'
import { CostControlPanel } from '@/components/farm/aid/CostControlPanel'
import { DailyTasksForm } from '@/components/farm/aid/DailyTasksForm'
import { AIAssistantWidget } from '@/components/farm/aid/AIAssistantWidget'
import { farmService } from '@/services/farmService'
import { AssistanceData } from '@/lib/types'
import { Loader2 } from 'lucide-react'

export default function FarmAid() {
  const { farmId } = useParams()
  const [data, setData] = useState<AssistanceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (!farmId) return
      setLoading(true)
      try {
        const result = await farmService.getAssistanceData(farmId)
        setData(result)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [farmId])

  if (!farmId) return null

  return (
    <div className="container py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold">Auxílio no Gerenciamento</h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="agenda" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-auto">
                <TabsTrigger value="agenda" className="py-2">
                  Agenda
                </TabsTrigger>
                <TabsTrigger value="proposals" className="py-2">
                  Propostas
                </TabsTrigger>
                <TabsTrigger value="costs" className="py-2">
                  Custos
                </TabsTrigger>
                <TabsTrigger value="tasks" className="py-2">
                  Rotina
                </TabsTrigger>
              </TabsList>

              <TabsContent value="agenda" className="mt-4">
                <AgendaCalendar tasks={data.tasks} />
              </TabsContent>

              <TabsContent value="proposals" className="mt-4">
                <ActivityProposalsTable proposals={data.proposals} />
              </TabsContent>

              <TabsContent value="costs" className="mt-4">
                <CostControlPanel costs={data.costs} />
              </TabsContent>

              <TabsContent value="tasks" className="mt-4">
                <DailyTasksForm />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <AIAssistantWidget />
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Erro ao carregar dados.
        </div>
      )}
    </div>
  )
}
