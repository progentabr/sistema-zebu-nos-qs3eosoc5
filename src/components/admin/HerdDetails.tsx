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
import {
  Download,
  ExternalLink,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react'
import { HerdData } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'
import { Link } from 'react-router-dom'

interface HerdDetailsProps {
  data: HerdData
  farmId: string
}

export function HerdDetails({ data, farmId }: HerdDetailsProps) {
  const { toast } = useToast()

  const handleExport = () => {
    const headers = ['ID', 'Brinco', 'Categoria', 'Peso Atual', 'Status']
    const rows = data.animals.map((a) => [
      a.id,
      a.tag,
      a.category,
      a.weightHistory.current,
      a.status,
    ])
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `rebanho_fazenda_${farmId}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: 'Exportação concluída',
      description: 'O relatório zootécnico foi baixado.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="inventory" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="inventory">Inventário & Pesagem</TabsTrigger>
            <TabsTrigger value="indices">Índices Zootécnicos</TabsTrigger>
            <TabsTrigger value="movements">Movimentações</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Exportar Relatório
          </Button>
        </div>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Identificação e Controle de Peso</CardTitle>
              <Button variant="link" asChild className="text-primary">
                <Link to="/admin/manejo-fazendas">
                  Ver dados de pastagem{' '}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brinco</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Nascimento (kg)</TableHead>
                    <TableHead>Desmame (kg)</TableHead>
                    <TableHead>Atual (kg)</TableHead>
                    <TableHead>Última Pesagem</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.animals.map((animal) => (
                    <TableRow key={animal.id}>
                      <TableCell className="font-medium">
                        {animal.tag}
                      </TableCell>
                      <TableCell>{animal.category}</TableCell>
                      <TableCell>{animal.weightHistory.birth || '-'}</TableCell>
                      <TableCell>{animal.weightHistory.d205 || '-'}</TableCell>
                      <TableCell className="font-bold">
                        {animal.weightHistory.current}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          animal.weightHistory.lastWeighingDate,
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{animal.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taxa de Natalidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.indices.birthRate}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taxa de Prenhez
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.indices.pregnancyRate}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mortalidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {data.indices.mortalityRate}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taxa de Desfrute
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {data.indices.offTakeRate}%
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Entrada e Saída</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.movements.map((mov) => (
                    <TableRow key={mov.id}>
                      <TableCell>
                        {new Date(mov.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {mov.type === 'entry' ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-500" />
                          )}
                          <span className="capitalize">
                            {mov.type === 'entry' ? 'Entrada' : 'Saída'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{mov.category}</TableCell>
                      <TableCell className="font-medium">
                        {mov.quantity}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {mov.description}
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
