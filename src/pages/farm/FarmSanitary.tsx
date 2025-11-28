import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export default function FarmSanitary() {
  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Controle Sanitário</h1>
        <Button>Novo Evento</Button>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Consultar médico-veterinário antes de aplicar qualquer medicamento.
        </AlertDescription>
      </Alert>

      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Calendário Sanitário (Visualização em breve)
      </div>
    </div>
  )
}
