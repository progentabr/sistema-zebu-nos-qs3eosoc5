import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Download, Plus, Save } from 'lucide-react'
import { NutritionData, NutritionProposal } from '@/lib/types'
import { farmService } from '@/services/farmService'
import { useToast } from '@/hooks/use-toast'

interface NutritionDetailsProps {
  data: NutritionData
  farmId: string
  onUpdate: () => void
}

export function NutritionDetails({
  data,
  farmId,
  onUpdate,
}: NutritionDetailsProps) {
  const { toast } = useToast()
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    mixture: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleExport = () => {
    // Mock export functionality
    const content = JSON.stringify(data, null, 2)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nutricao_fazenda_${farmId}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast({
      title: 'Exportação iniciada',
      description: 'O arquivo será baixado em instantes.',
    })
  }

  const handleSaveProposal = async () => {
    if (!newProposal.title || !newProposal.description) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha o título e a descrição.',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await farmService.upsertNutritionProposal(farmId, newProposal)
      toast({
        title: 'Sucesso',
        description: 'Proposta de melhoria salva.',
      })
      setNewProposal({ title: '', description: '', mixture: '' })
      onUpdate()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao salvar proposta.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Tabs defaultValue="plans" className="w-full animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="plans">Planos Nutricionais</TabsTrigger>
          <TabsTrigger value="proposals">Propostas & Ferramentas</TabsTrigger>
        </TabsList>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Exportar PDF/CSV
        </Button>
      </div>

      <TabsContent value="plans" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Planos por Categoria e Estação</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Estação</TableHead>
                  <TableHead>Estratégia</TableHead>
                  <TableHead>Suplementação</TableHead>
                  <TableHead>Creep Feeding</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">
                      {plan.category}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          plan.season === 'rainy' ? 'default' : 'secondary'
                        }
                      >
                        {plan.season === 'rainy'
                          ? 'Águas'
                          : plan.season === 'dry'
                            ? 'Seca'
                            : 'Transição'}
                      </Badge>
                    </TableCell>
                    <TableCell>{plan.strategy}</TableCell>
                    <TableCell>{plan.supplementation}</TableCell>
                    <TableCell>{plan.creepFeeding ? 'Sim' : 'Não'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações de Creep Feeding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{data.creepFeedingInfo}</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="proposals" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Propor Melhoria de Ração</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Título da Proposta
                </label>
                <Input
                  placeholder="Ex: Ajuste Proteico Inverno"
                  value={newProposal.title}
                  onChange={(e) =>
                    setNewProposal({ ...newProposal, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mistura/Fórmula</label>
                <Input
                  placeholder="Ex: 50% Milho, 50% Soja"
                  value={newProposal.mixture}
                  onChange={(e) =>
                    setNewProposal({ ...newProposal, mixture: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Descrição/Justificativa
                </label>
                <Textarea
                  placeholder="Descreva o objetivo desta mudança..."
                  value={newProposal.description}
                  onChange={(e) =>
                    setNewProposal({
                      ...newProposal,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <Button
                className="w-full"
                onClick={handleSaveProposal}
                disabled={isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" /> Salvar Proposta
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Propostas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.proposals.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma proposta registrada.
                  </p>
                ) : (
                  data.proposals.map((prop) => (
                    <div
                      key={prop.id}
                      className="border rounded-md p-3 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm">{prop.title}</h4>
                        <Badge variant="outline">{prop.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {prop.createdAt}
                      </p>
                      <p className="text-sm">{prop.description}</p>
                      {prop.mixture && (
                        <div className="bg-muted p-2 rounded text-xs font-mono">
                          {prop.mixture}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
