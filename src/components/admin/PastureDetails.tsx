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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'

interface PastureDetailsProps {
  data: any
}

export function PastureDetails({ data }: PastureDetailsProps) {
  return (
    <Tabs defaultValue="map" className="w-full animate-fade-in">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
        <TabsTrigger value="map" className="py-2">
          Mapa & Identificação
        </TabsTrigger>
        <TabsTrigger value="capacity" className="py-2">
          Capacidade & Prod.
        </TabsTrigger>
        <TabsTrigger value="schedule" className="py-2">
          Cronograma
        </TabsTrigger>
        <TabsTrigger value="rotation" className="py-2">
          Manejo Rotativo
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="py-2">
          Manutenção
        </TabsTrigger>
      </TabsList>

      <TabsContent value="map" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Identificação de Pastos</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Integração Google Maps</AlertTitle>
              <AlertDescription>
                Para habilitar o mapa interativo, configure a variável{' '}
                <code>VITE_GOOGLE_MAPS_API_KEY</code> no arquivo .env.
              </AlertDescription>
            </Alert>
            {/* Use Google Maps JavaScript API to render Polygons here */}
            <MapPlaceholder className="h-[400px] w-full rounded-md" />
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Piquetes Identificados</h4>
              <div className="flex flex-wrap gap-2">
                {data.paddocks.map((p: any) => (
                  <Badge
                    key={p.id}
                    variant={p.status === 'Ocupado' ? 'default' : 'outline'}
                  >
                    {p.name} ({p.area} ha) - {p.status}
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
              <div className="text-3xl font-bold text-primary">
                {data.productivity.msPerHa} kg MS/ha
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Última medição: {data.productivity.lastMeasurement}
              </p>
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="text-sm font-medium">Cálculo Sugerido:</p>
                <p className="text-sm text-muted-foreground">
                  Considerando eficiência de pastejo de 50%, a capacidade atual
                  suporta aprox. {(data.productivity.msPerHa / 450).toFixed(1)}{' '}
                  UA/ha.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Indicação Creep Feeding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div
                  className={`h-4 w-4 rounded-full ${data.creepFeeding ? 'bg-green-500' : 'bg-gray-300'}`}
                />
                <span className="text-2xl font-bold">
                  {data.creepFeeding ? 'Sim' : 'Não'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {data.creepFeeding
                  ? 'Estruturas de suplementação privativa para bezerros identificadas.'
                  : 'Não há indicação de uso de Creep Feeding nesta área.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="schedule" className="space-y-4 mt-4">
        <div className="grid gap-4 md:grid-cols-2">
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
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Início:</span>
                  <span>{data.vedacao.startDate}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Fim Previsto:</span>
                  <span>{data.vedacao.endDate}</span>
                </div>
                <div className="pt-2">
                  <span className="font-medium block mb-1">
                    Pastos Vedados:
                  </span>
                  <div className="flex gap-2">
                    {data.vedacao.paddocks.map((p: string) => (
                      <Badge key={p} variant="secondary">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="rotation" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Plano de Rotação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{data.rotationPlan}</p>
            <div className="mt-4 p-4 border rounded-md bg-muted/20">
              <h4 className="font-semibold mb-2">Divisão Sugerida</h4>
              <p className="text-sm text-muted-foreground">
                Para otimizar o descanso, sugere-se dividir os piquetes maiores
                (acima de 20ha) utilizando cerca elétrica móvel.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="maintenance" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Plano de Manutenção</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {data.maintenance.map((item: any, i: number) => (
                <li
                  key={i}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        item.status === 'done'
                          ? 'bg-green-500'
                          : 'bg-yellow-500'
                      }`}
                    />
                    <span className="font-medium">{item.item}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.date}
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
