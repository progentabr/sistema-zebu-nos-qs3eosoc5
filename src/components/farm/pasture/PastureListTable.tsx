import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pasture } from '@/lib/types'
import { Eye } from 'lucide-react'

interface PastureListTableProps {
  pastures: Pasture[]
  onSelect: (pasture: Pasture) => void
}

export function PastureListTable({
  pastures,
  onSelect,
}: PastureListTableProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Área (ha)</TableHead>
            <TableHead>Capacidade (UA/ha)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Creep Feeding</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastures.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                Nenhum pasto cadastrado. Utilize o mapa para demarcar.
              </TableCell>
            </TableRow>
          ) : (
            pastures.map((pasture) => (
              <TableRow key={pasture.id}>
                <TableCell className="font-medium">{pasture.name}</TableCell>
                <TableCell>{pasture.area} ha</TableCell>
                <TableCell>{pasture.capacity}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      pasture.status === 'Ocupado'
                        ? 'default'
                        : pasture.status === 'Vedado'
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {pasture.status}
                  </Badge>
                </TableCell>
                <TableCell>{pasture.creepFeeding ? 'Sim' : 'Não'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelect(pasture)}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
