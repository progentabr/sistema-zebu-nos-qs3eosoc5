import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FarmNutrition() {
  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manejo Nutricional</h1>
        <Button>Novo Plano</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Planos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Nenhum plano ativo.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sugestões de Formulação</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Gerar Sugestão (IA)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
