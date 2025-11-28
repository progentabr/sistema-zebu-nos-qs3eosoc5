import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface HealthCalendarProps {
  onGenerateTasks: (season: 'dry' | 'rainy', date: Date) => void
}

export function HealthCalendar({ onGenerateTasks }: HealthCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [season, setSeason] = useState<'dry' | 'rainy'>('dry')
  const { toast } = useToast()

  const handleSchedule = () => {
    if (date) {
      onGenerateTasks(season, date)
      toast({
        title: 'Agendamento Realizado',
        description: `Tarefas para estação ${season === 'dry' ? 'Seca' : 'Águas'} criadas a partir de ${date.toLocaleDateString()}.`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendário Sanitário</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="space-y-4 flex-1">
          <div className="space-y-2">
            <Label>Definir Início da Estação</Label>
            <Select value={season} onValueChange={(v: any) => setSeason(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dry">Estação Seca</SelectItem>
                <SelectItem value="rainy">Estação das Águas</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Ao definir a data de início, o sistema irá sugerir automaticamente
              os protocolos de vacinação e vermifugação recomendados para o
              período.
            </p>
          </div>
          <Button onClick={handleSchedule} className="w-full">
            Gerar Tarefas da Estação
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
