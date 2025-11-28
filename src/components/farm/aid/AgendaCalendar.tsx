import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FarmTask } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

interface AgendaCalendarProps {
  tasks: FarmTask[]
}

export function AgendaCalendar({ tasks }: AgendaCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const tasksForDate = tasks.filter((task) => {
    if (!date) return false
    return task.dueDate === date.toISOString().split('T')[0]
  })

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calendário</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Tarefas para {date?.toLocaleDateString() || 'Hoje'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasksForDate.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Nenhuma tarefa agendada para este dia.
              </p>
            ) : (
              tasksForDate.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {task.assignee}
                    </p>
                  </div>
                  <Badge
                    variant={
                      task.status === 'done'
                        ? 'default'
                        : task.status === 'in_progress'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {task.status === 'done'
                      ? 'Feito'
                      : task.status === 'in_progress'
                        ? 'Em andamento'
                        : 'Pendente'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
