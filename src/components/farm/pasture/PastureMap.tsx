import { useState } from 'react'
import { MapPlaceholder } from '@/components/ui/map-placeholder'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, MapPin } from 'lucide-react'
import { Pasture } from '@/lib/types'

interface PastureMapProps {
  pastures: Pasture[]
  onAddPasture: (pasture: Partial<Pasture>) => void
}

export function PastureMap({ pastures, onAddPasture }: PastureMapProps) {
  const [isDrawing, setIsDrawing] = useState(false)

  const handleSimulateDraw = () => {
    setIsDrawing(true)
    // Simulate drawing delay
    setTimeout(() => {
      const newPasture: Partial<Pasture> = {
        name: `Novo Pasto ${pastures.length + 1}`,
        area: Math.floor(Math.random() * 50) + 10,
        capacity: 1.0,
        status: 'Descanso',
        polygonGeojson: JSON.stringify({
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [0, 1],
              [1, 1],
              [1, 0],
              [0, 0],
            ],
          ],
        }),
      }
      onAddPasture(newPasture)
      setIsDrawing(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Integração Google Maps</AlertTitle>
        <AlertDescription>
          Adicione sua chave de API em <code>VITE_GOOGLE_MAPS_API_KEY</code>.
          Para demonstração, clique em "Desenhar Piquete" para simular a
          demarcação.
        </AlertDescription>
      </Alert>

      <div className="relative">
        <MapPlaceholder className="h-[400px] w-full rounded-md border shadow-sm" />

        {/* Overlay for simulation */}
        <div className="absolute top-4 right-4 bg-background/90 p-2 rounded shadow backdrop-blur">
          <Button size="sm" onClick={handleSimulateDraw} disabled={isDrawing}>
            <MapPin className="mr-2 h-4 w-4" />
            {isDrawing ? 'Desenhando...' : 'Desenhar Piquete'}
          </Button>
        </div>

        {/* Mock Polygons Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {pastures.length > 0 && (
            <div className="grid grid-cols-3 gap-4 opacity-50">
              {pastures.map((p) => (
                <div
                  key={p.id}
                  className="bg-green-500/30 border-2 border-green-600 w-24 h-24 flex items-center justify-center rounded text-xs font-bold text-white"
                >
                  {p.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
