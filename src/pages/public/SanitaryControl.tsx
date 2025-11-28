import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export default function SanitaryControl() {
  return (
    <div className="container py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-primary">Controle Sanitário</h1>
        <div className="prose prose-lg text-muted-foreground">
          <p>
            Mantenha a saúde do seu rebanho em dia com nosso calendário
            sanitário inteligente. Controle vacinações, vermifugações e
            tratamentos contra carrapatos de forma organizada.
          </p>
        </div>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription>
            Consultar médico-veterinário antes de aplicar qualquer medicamento
            ou protocolo.
          </AlertDescription>
        </Alert>

        <div className="flex justify-center pt-8">
          <Button size="lg">Cadastre sua fazenda</Button>
        </div>
      </div>
    </div>
  )
}
