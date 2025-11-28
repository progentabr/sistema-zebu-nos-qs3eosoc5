import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MapPlaceholder } from '@/components/ui/map-placeholder'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface PastureDetailsProps {
  data: any
}

export function PastureDetails({ data }: PastureDetailsProps) {
  return (
    <Tabs defaultValue="map" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
        <TabsTrigger value="map">Mapa & Identificação</TabsTrigger>
        <TabsTrigger value="capacity">Capacidade & Prod.</TabsTrigger>
        <TabsTrigger value="schedule">Cronograma</TabsTrigger>
        <TabsTrigger value="rotation">Manejo Rotativo</TabsTrigger>
        <TabsTrigger value="maintenance">Manutenção</TabsTrigger>
      </TabsList>

      <TabsContent value="map" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Identificação de Pastos</CardTitle>
          </CardHeader>
          <CardContent>
            {/* GOOGLE_MAPS_API_KEY should be configured in the environment variables */}
            {/* Use Google Maps JavaScript API to render Polygons here */}
            <MapPlaceholder className="h-[400px] w-full rounded-md" />
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Piquetes Identificados</h4>
              <div className="flex flex-wrap gap-2">
                {data.paddocks.map((p: any) => (
                  <Badge key={p.id} variant="outline">
                    {p.name} ({p.area} ha)
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="capacity" className="space-y-4 mt-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Capacidade de Suporte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.productivity.msPerHa} kg MS/ha
              </div>
              <p className="text-sm text-muted-foreground">
                Última medição: {data.productivity.lastMeasurement}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Indicação Creep Feeding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.creepFeeding ? 'Sim' : 'Não'}
              </div>
              <p className="text-sm text-muted-foreground">
                Recomendado para a fase atual.
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="schedule" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Previsão de Entrada/Saída</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Pasto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.schedule.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.action}</TableCell>
                    <TableCell>{item.paddock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vedação (Diferimento)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Início:</strong> {data.vedacao.startDate}
            </p>
            <p>
              <strong>Fim:</strong> {data.vedacao.endDate}
            </p>
            <p>
              <strong>Pastos:</strong> {data.vedacao.paddocks.join(', ')}
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rotation" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Plano de Rotação</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data.rotationPlan}</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="maintenance" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Plano de Manutenção</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.maintenance.map((item: any, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.status === 'done' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  />
                  <span>
                    {item.item} - <span className="text-sm">{item.date}</span>
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
