import { MapPin } from 'lucide-react'

export function MapPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={`bg-muted/30 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground">Mapa Interativo</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Integração com Google Maps para visualização e demarcação de áreas.
        (Simulação)
      </p>
    </div>
  )
}
