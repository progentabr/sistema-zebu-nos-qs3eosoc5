import { Button } from '@/components/ui/button'

export default function ReproductiveManagement() {
  return (
    <div className="container py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-primary">Manejo Reprodutivo</h1>
        <div className="prose prose-lg text-muted-foreground">
          <p>
            Maximize os índices reprodutivos com controle total sobre a estação
            de monta e IATF. Acompanhe taxas de prenhez, natalidade e planeje o
            descarte estratégico de matrizes.
          </p>
        </div>
        <div className="flex justify-center pt-8">
          <Button size="lg">Ver ferramentas</Button>
        </div>
      </div>
    </div>
  )
}
