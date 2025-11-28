import { Button } from '@/components/ui/button'

export default function FarmReproduction() {
  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manejo Reprodutivo</h1>
        <Button>Planejar Estação</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-2">Índices Reprodutivos</h3>
          <p className="text-sm text-muted-foreground">
            Dados indisponíveis no momento.
          </p>
        </div>
      </div>
    </div>
  )
}
