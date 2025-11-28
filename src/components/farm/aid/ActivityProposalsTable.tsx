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
import { ActivityProposal } from '@/lib/types'
import { Check, X } from 'lucide-react'

interface ActivityProposalsTableProps {
  proposals: ActivityProposal[]
}

export function ActivityProposalsTable({
  proposals,
}: ActivityProposalsTableProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Atividade</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                Nenhuma proposta de atividade no momento.
              </TableCell>
            </TableRow>
          ) : (
            proposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell className="font-medium">{proposal.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {proposal.description}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      proposal.priority === 'high'
                        ? 'destructive'
                        : proposal.priority === 'medium'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {proposal.priority === 'high'
                      ? 'Alta'
                      : proposal.priority === 'medium'
                        ? 'Média'
                        : 'Baixa'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{proposal.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
