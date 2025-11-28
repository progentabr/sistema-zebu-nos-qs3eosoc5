import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PastureManagement() {
  return (
    <div className="container py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-primary">
          Manejo das Pastagens
        </h1>
        <div className="prose prose-lg text-muted-foreground">
          <p>
            O manejo eficiente das pastagens é fundamental para a produtividade
            da pecuária zebuína. Nossas ferramentas permitem a identificação
            precisa de áreas através de mapas interativos, cálculo de capacidade
            de suporte (MS/ha) e planejamento de rodízio de piquetes.
          </p>
          <p>
            Com o sistema, você pode monitorar a altura do pasto, planejar
            períodos de descanso e otimizar a lotação animal, garantindo a
            sustentabilidade e a rentabilidade do seu negócio.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Capacidade de Suporte</CardTitle>
            </CardHeader>
            <CardContent>
              Calcule a quantidade ideal de animais por hectare baseada na
              produção de matéria seca.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pastejo Rotacionado</CardTitle>
            </CardHeader>
            <CardContent>
              Planeje a divisão de piquetes e períodos de descanso para
              maximizar o aproveitamento.
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button size="lg">Cadastre sua fazenda</Button>
          <Button size="lg" variant="outline">
            Calcule agora
          </Button>
        </div>
      </div>
    </div>
  )
}
