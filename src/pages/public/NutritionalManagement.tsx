import { Button } from '@/components/ui/button'

export default function NutritionalManagement() {
  return (
    <div className="container py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-primary">Manejo Nutricional</h1>
        <div className="prose prose-lg text-muted-foreground">
          <p>
            A nutrição adequada é a chave para o desenvolvimento do rebanho.
            Oferecemos ferramentas para criar planos nutricionais personalizados
            por categoria animal e época do ano (seca/águas).
          </p>
          <p>
            Gerencie suplementações, creep feeding e receba sugestões de
            formulação de ração com base nos custos atuais das commodities,
            visando o melhor custo-benefício.
          </p>
        </div>
        <div className="flex justify-center pt-8">
          <Button size="lg">Solicitar plano</Button>
        </div>
      </div>
    </div>
  )
}
