import { Button } from '@/components/ui/button'

export default function FarmHerd() {
  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manejo do Rebanho</h1>
        <Button>Registrar Pesagem</Button>
      </div>
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Tabela de Animais (Visualização em breve)
      </div>
    </div>
  )
}
