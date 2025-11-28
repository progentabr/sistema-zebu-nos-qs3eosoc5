import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, CalendarCheck, DollarSign, Lightbulb } from 'lucide-react'
import { AssistanceData, FarmTask } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'
import { farmService } from '@/services/farmService'

interface AssistanceDetailsProps {
  data: AssistanceData
  farmId: string
  onUpdate: () => void
}

export function AssistanceDetails({
  data,
  farmId,
  onUpdate,
}: AssistanceDetailsProps) {
  const { toast } = useToast()
  const [newTask, setNewTask] = useState<Partial<FarmTask>>({
    title: '',
    assignee: '',
    dueDate: '',
    templateType: 'custom',
  })
  const [isCreatingTask, setIsCreatingTask] = useState(false)

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.assignee || !newTask.dueDate) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha todos os campos da tarefa.',
      })
      return
    }

    setIsCreatingTask(true)
    try {
      await farmService.createTask(farmId, newTask)
      toast({
        title: 'Sucesso',
        description: 'Tarefa criada e agendada.',
      })
      setNewTask({
        title: '',
        assignee: '',
        dueDate: '',
        templateType: 'custom',
      })
      onUpdate()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao criar tarefa.',
      })
    } finally {
      setIsCreatingTask(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="proposals">Propostas de Atividade</TabsTrigger>
          <TabsTrigger value="tasks">Agenda & Tarefas</TabsTrigger>
          <TabsTrigger value="costs">Controle de Custos</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" /> Propostas de
                Melhoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.proposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="flex items-start justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{proposal.title}</h4>
                        <Badge
                          variant={
                            proposal.priority === 'high'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {proposal.priority === 'high' ? 'Alta' : 'Normal'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {proposal.description}
                      </p>
                      <p className="text-xs text-muted-foreground pt-1">
                        Criado em:{' '}
                        {new Date(proposal.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {proposal.status === 'pending' ? 'Pendente' : 'Aprovado'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4 mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" /> Nova Tarefa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Modelo</label>
                  <Select
                    value={newTask.templateType}
                    onValueChange={(v: any) =>
                      setNewTask({ ...newTask, templateType: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Personalizado</SelectItem>
                      <SelectItem value="vaccination">Vacinação</SelectItem>
                      <SelectItem value="daily_check">Ronda Diária</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título</label>
                  <Input
                    placeholder="Ex: Consertar cerca do pasto 2"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Responsável</label>
                    <Input
                      placeholder="Nome do funcionário"
                      value={newTask.assignee}
                      onChange={(e) =>
                        setNewTask({ ...newTask, assignee: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data Limite</label>
                    <Input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCreateTask}
                  disabled={isCreatingTask}
                >
                  Agendar Tarefa
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5" /> Agenda da Equipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {data.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {task.assignee} •{' '}
                          {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        className={
                          task.status === 'done'
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }
                      >
                        {task.status === 'done' ? 'Concluído' : 'Pendente'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" /> Resumo de Custos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Valor (R$)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.costs.map((cost) => (
                    <TableRow key={cost.id}>
                      <TableCell>
                        {new Date(cost.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{cost.category}</TableCell>
                      <TableCell>{cost.description}</TableCell>
                      <TableCell className="text-right font-mono">
                        {cost.amount.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">
                      {data.costs
                        .reduce((acc, curr) => acc + curr.amount, 0)
                        .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
