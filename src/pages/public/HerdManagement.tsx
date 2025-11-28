import { Button } from '@/components/ui/button'

export default function HerdManagement() {
  return (
    <div className="container py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-primary">Manejo do Rebanho</h1>
        <div className="prose prose-lg text-muted-foreground">
          <p>
            Tenha o controle individual de cada animal. Registre pesagens,
            identifique animais, acompanhe o ganho de peso diário (GMD) e gere
            índices zootécnicos precisos para tomada de decisão.
          </p>
        </div>
        <div className="flex justify-center pt-8">
          <Button size="lg">Cadastre sua fazenda</Button>
        </div>
      </div>
    </div>
  )
}
