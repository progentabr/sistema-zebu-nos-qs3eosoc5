import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { HealthProtocol } from '@/lib/types'

interface HealthProtocolsTableProps {
  protocols: HealthProtocol[]
}

export function HealthProtocolsTable({ protocols }: HealthProtocolsTableProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Data Prevista</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Obs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {protocols.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                Nenhum protocolo cadastrado.
              </TableCell>
            </TableRow>
          ) : (
            protocols.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="capitalize">
                  {p.type.replace('_', ' ')}
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      p.status === 'done'
                        ? 'default'
                        : p.status === 'delayed'
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {p.status === 'done'
                      ? 'Realizado'
                      : p.status === 'delayed'
                        ? 'Atrasado'
                        : 'Pendente'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.observation}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
