import { useState, useEffect, useRef, useCallback } from 'react'
import { MapPlaceholder } from '@/components/ui/map-placeholder'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, Loader2, MapPin, Eraser } from 'lucide-react'
import { Pasture } from '@/lib/types'
import { useGoogleMaps } from '@/hooks/useGoogleMaps'

// Default center (Uberaba-MG region as example)
const defaultCenter = { lat: -19.747, lng: -47.939 }

interface PastureMapProps {
  pastures: Pasture[]
  onAddPasture: (pasture: Partial<Pasture>) => void
}

export function PastureMap({ pastures, onAddPasture }: PastureMapProps) {
  const { isLoaded, error } = useGoogleMaps()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const drawingManagerRef = useRef<any>(null)
  const polygonsRef = useRef<any[]>([])
  const [isDrawing, setIsDrawing] = useState(false)

  const initMap = useCallback(() => {
    if (!mapRef.current || !isLoaded) return

    const google = (window as any).google

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 14,
        mapTypeId: 'satellite',
        streetViewControl: false,
        mapTypeControl: true,
      })
    }

    // Initialize Drawing Manager
    if (!drawingManagerRef.current) {
      drawingManagerRef.current = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: false,
        polygonOptions: {
          fillColor: '#10b981',
          fillOpacity: 0.4,
          strokeWeight: 2,
          strokeColor: '#059669',
          clickable: true,
          editable: false,
          zIndex: 1,
        },
      })
      drawingManagerRef.current.setMap(mapInstanceRef.current)

      google.maps.event.addListener(
        drawingManagerRef.current,
        'overlaycomplete',
        (event: any) => {
          if (event.type === google.maps.drawing.OverlayType.POLYGON) {
            const polygon = event.overlay
            const path = polygon.getPath()
            const coordinates = []
            for (let i = 0; i < path.getLength(); i++) {
              const xy = path.getAt(i)
              coordinates.push([xy.lng(), xy.lat()])
            }
            // Close the loop
            coordinates.push(coordinates[0])

            const area = google.maps.geometry.spherical.computeArea(path)
            const areaHa = (area / 10000).toFixed(2)

            const geoJson = {
              type: 'Polygon',
              coordinates: [coordinates],
            }

            // Remove the drawn polygon from map as it will be re-rendered by props
            polygon.setMap(null)

            // Trigger add pasture
            onAddPasture({
              name: `Novo Pasto (${areaHa} ha)`,
              area: Number(areaHa),
              capacity: 1.0,
              status: 'Descanso',
              polygonGeojson: JSON.stringify(geoJson),
            })

            // Reset drawing mode
            setIsDrawing(false)
            drawingManagerRef.current.setDrawingMode(null)
          }
        },
      )
    }
  }, [isLoaded, onAddPasture])

  // Render existing pastures
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return

    const google = (window as any).google

    // Clear existing polygons
    polygonsRef.current.forEach((p) => p.setMap(null))
    polygonsRef.current = []

    pastures.forEach((pasture) => {
      if (pasture.polygonGeojson) {
        try {
          const geoJson = JSON.parse(pasture.polygonGeojson)
          const paths = geoJson.coordinates[0].map((coord: number[]) => ({
            lat: coord[1],
            lng: coord[0],
          }))

          let fillColor = '#10b981' // Default/Descanso (Green)
          if (pasture.status === 'Ocupado') fillColor = '#ef4444' // Red
          if (pasture.status === 'Vedado') fillColor = '#eab308' // Yellow
          if (pasture.status === 'Manutenção') fillColor = '#6b7280' // Gray

          const polygon = new google.maps.Polygon({
            paths,
            strokeColor: fillColor,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: fillColor,
            fillOpacity: 0.35,
          })

          // Add label or info window logic here if needed
          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="color:black; font-weight:bold;">${pasture.name}<br/>${pasture.area} ha</div>`,
          })

          polygon.addListener('click', (e: any) => {
            infoWindow.setPosition(e.latLng)
            infoWindow.open(mapInstanceRef.current)
          })

          polygon.setMap(mapInstanceRef.current)
          polygonsRef.current.push(polygon)
        } catch (e) {
          console.error('Error parsing geojson for pasture', pasture.name, e)
        }
      }
    })
  }, [pastures, isLoaded])

  useEffect(() => {
    initMap()
  }, [initMap])

  const toggleDrawing = () => {
    if (!drawingManagerRef.current) return
    const google = (window as any).google
    if (isDrawing) {
      drawingManagerRef.current.setDrawingMode(null)
      setIsDrawing(false)
    } else {
      drawingManagerRef.current.setDrawingMode(
        google.maps.drawing.OverlayType.POLYGON,
      )
      setIsDrawing(true)
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Info className="h-4 w-4" />
        <AlertTitle>Erro no Mapa</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      {!isLoaded && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Carregando Mapa</AlertTitle>
          <AlertDescription className="flex items-center gap-2">
            Conectando ao Google Maps...
            <Loader2 className="h-3 w-3 animate-spin" />
          </AlertDescription>
        </Alert>
      )}

      <div className="relative h-[400px] w-full rounded-md border shadow-sm overflow-hidden">
        {!isLoaded && <MapPlaceholder className="h-full w-full" />}
        <div
          ref={mapRef}
          className={`h-full w-full ${!isLoaded ? 'hidden' : 'block'}`}
        />

        {isLoaded && (
          <div className="absolute top-4 right-4 bg-background/90 p-2 rounded shadow backdrop-blur flex gap-2">
            <Button
              size="sm"
              onClick={toggleDrawing}
              variant={isDrawing ? 'secondary' : 'default'}
            >
              {isDrawing ? (
                <>
                  <Eraser className="mr-2 h-4 w-4" /> Cancelar Desenho
                </>
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" /> Desenhar Piquete
                </>
              )}
            </Button>
          </div>
        )}

        {/* Legend Overlay */}
        {isLoaded && (
          <div className="absolute bottom-4 left-4 bg-background/90 p-2 rounded shadow backdrop-blur text-xs space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500/50 border border-red-500 rounded-sm"></div>
              <span>Ocupado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500/50 border border-green-500 rounded-sm"></div>
              <span>Descanso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500/50 border border-yellow-500 rounded-sm"></div>
              <span>Vedado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500/50 border border-gray-500 rounded-sm"></div>
              <span>Manutenção</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
