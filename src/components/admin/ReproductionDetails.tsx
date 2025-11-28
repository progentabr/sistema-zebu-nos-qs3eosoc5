import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Download, Calendar, AlertTriangle } from 'lucide-react'
import { ReproductionPlan } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'

interface ReproductionDetailsProps {
  data: ReproductionPlan
  farmId: string
}

export function ReproductionDetails({
  data,
  farmId,
}: ReproductionDetailsProps) {
  const { toast } = useToast()

  const handleExport = () => {
    const headers = ['ID', 'Brinco', 'Motivo', 'Idade']
    const rows = data.cullingList.map((item) => [
      item.id,
      item.tag,
      item.reason,
      item.age,
    ])
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `reproducao_descarte_${farmId}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: 'Exportação concluída',
      description: 'O relatório de reprodução foi baixado.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="plan" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="plan">Plano Reprodutivo</TabsTrigger>
            <TabsTrigger value="culling">Lista de Descarte</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Exportar CSV
          </Button>
        </div>

        <TabsContent value="plan" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Estação de Monta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Início:</span>
                  <span className="font-medium">
                    {new Date(data.breedingSeason.start).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Fim:</span>
                  <span className="font-medium">
                    {new Date(data.breedingSeason.end).toLocaleDateString()}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-muted-foreground block mb-1">
                    Método Adotado:
                  </span>
                  <Badge variant="secondary" className="text-sm">
                    {data.breedingSeason.method}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estratégias de Manejo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Desmame Tradicional
                  </h4>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        data.traditionalWeaning ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                    <span className="font-semibold">
                      {data.traditionalWeaning ? 'Sim' : 'Não'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Planejamento de Novilhas
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-muted p-2 rounded">
                      <span className="block text-xs text-muted-foreground">
                        Idade Entrada
                      </span>
                      <span className="font-bold">
                        {data.heiferPlan.entryAge} meses
                      </span>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <span className="block text-xs text-muted-foreground">
                        Peso Entrada
                      </span>
                      <span className="font-bold">
                        {data.heiferPlan.entryWeight} kg
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Meta: {data.heiferPlan.target}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="culling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" /> Animais para Descarte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brinco/ID</TableHead>
                    <TableHead>Idade (anos)</TableHead>
                    <TableHead>Motivo do Descarte</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.cullingList.map((animal) => (
                    <TableRow key={animal.id}>
                      <TableCell className="font-medium">
                        {animal.tag}
                      </TableCell>
                      <TableCell>{animal.age}</TableCell>
                      <TableCell>{animal.reason}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Ver Ficha
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
