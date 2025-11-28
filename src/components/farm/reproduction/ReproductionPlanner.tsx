import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Calendar } from '@/components/ui/calendar'
import { useToast } from '@/hooks/use-toast'
import { farmService } from '@/services/farmService'
import { CalendarRange, Calculator, ArrowRight } from 'lucide-react'

interface ReproductionPlannerProps {
  farmId: string
}

export function ReproductionPlanner({ farmId }: ReproductionPlannerProps) {
  const { toast } = useToast()
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [method, setMethod] = useState('iatf')
  const [cowCount, setCowCount] = useState(100)
  const [bullCount, setBullCount] = useState(4)
  const [heiferTargetWeight, setHeiferTargetWeight] = useState(300)
  const [heiferTargetAge, setHeiferTargetAge] = useState(24)

  const ratio = Math.round(cowCount / (bullCount || 1))
  const ratioStatus = ratio <= 25 ? 'Excelente' : ratio <= 40 ? 'Bom' : 'Ruim'

  const handleSchedule = async () => {
    if (!startDate || !endDate) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Selecione as datas de início e fim.',
      })
      return
    }

    try {
      await farmService.scheduleReproductionEvents(farmId, [
        {
          type: method as any,
          date: startDate.toISOString(),
          description: `Início da Estação de Monta (${method.toUpperCase()})`,
        },
        {
          type: 'diagnosis',
          date: endDate.toISOString(),
          description: 'Fim da Estação / Diagnóstico',
        },
      ])
      toast({
        title: 'Sucesso',
        description: 'Eventos reprodutivos agendados.',
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
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarRange className="h-5 w-5" /> Planejamento da Estação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Método Reprodutivo</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iatf">IATF + Repasse</SelectItem>
                <SelectItem value="natural">Monta Natural</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Início</Label>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <Label>Fim Previsto</Label>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                className="rounded-md border"
              />
            </div>
          </div>
          <Button onClick={handleSchedule} className="w-full">
            Agendar Estação
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" /> Simulador Touro:Vaca
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total de Vacas</Label>
                <Input
                  type="number"
                  value={cowCount}
                  onChange={(e) => setCowCount(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Total de Touros</Label>
                <Input
                  type="number"
                  value={bullCount}
                  onChange={(e) => setBullCount(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Relação Atual:</span>
                <span className="text-2xl font-bold">1:{ratio}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium">Status:</span>
                <span
                  className={`font-bold ${
                    ratioStatus === 'Ruim'
                      ? 'text-red-500'
                      : ratioStatus === 'Bom'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                  }`}
                >
                  {ratioStatus}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entrada de Novilhas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Peso Alvo (kg)</Label>
                <Input
                  type="number"
                  value={heiferTargetWeight}
                  onChange={(e) =>
                    setHeiferTargetWeight(Number(e.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Idade Alvo (meses)</Label>
                <Input
                  type="number"
                  value={heiferTargetAge}
                  onChange={(e) => setHeiferTargetAge(Number(e.target.value))}
                />
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Calcular Projeção <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
