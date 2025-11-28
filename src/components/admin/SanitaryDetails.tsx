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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Download, AlertTriangle, ShieldCheck } from 'lucide-react'
import { SanitaryData } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'

interface SanitaryDetailsProps {
  data: SanitaryData
  farmId: string
}

export function SanitaryDetails({ data, farmId }: SanitaryDetailsProps) {
  const { toast } = useToast()

  const handleExport = () => {
    toast({
      title: 'Exportação iniciada',
      description: 'O calendário sanitário será baixado em instantes.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Alert variant="destructive" className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">Aviso Importante</AlertTitle>
        <AlertDescription className="text-red-700">
          Todas as recomendações sanitárias devem ser validadas. Consultar
          médico-veterinário antes de aplicar qualquer medicamento ou protocolo.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="calendars" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="calendars">
              Calendários & Protocolos
            </TabsTrigger>
            <TabsTrigger value="summary">Resumo & Observações</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Exportar Calendário
          </Button>
        </div>

        <TabsContent value="calendars" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Protocolos Sanitários da Fazenda</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Data Prevista</TableHead>
                    <TableHead>Estação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Obs</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.protocols.map((protocol) => (
                    <TableRow key={protocol.id}>
                      <TableCell className="capitalize">
                        {protocol.type.replace('_', ' ')}
                      </TableCell>
                      <TableCell className="font-medium">
                        {protocol.name}
                      </TableCell>
                      <TableCell>{protocol.date}</TableCell>
                      <TableCell>
                        {protocol.season ? (
                          <Badge variant="outline">
                            {protocol.season === 'dry' ? 'Seca' : 'Águas'}
                          </Badge>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            protocol.status === 'done'
                              ? 'bg-green-500'
                              : protocol.status === 'delayed'
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                          }
                        >
                          {protocol.status === 'done'
                            ? 'Realizado'
                            : protocol.status === 'delayed'
                              ? 'Atrasado'
                              : 'Pendente'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {protocol.observation}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Controle Adotado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 text-primary mt-1" />
                <div>
                  <p className="text-lg font-medium mb-2">Estratégia Geral</p>
                  <p className="text-muted-foreground">{data.adoptedControl}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observações de Saúde do Rebanho</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{data.observations}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
