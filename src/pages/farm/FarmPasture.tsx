import { MapPlaceholder } from '@/components/ui/map-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FarmPasture() {
  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manejo de Pastagens</h1>
        <Button>Nova Demarcação</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapPlaceholder className="h-[500px] w-full bg-muted rounded-lg" />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Piquete</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Selecione uma área no mapa para ver detalhes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cálculo de Capacidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <span className="font-semibold">Área Total:</span> - ha
              </div>
              <Button variant="outline" className="w-full">
                Calcular MS/ha
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
