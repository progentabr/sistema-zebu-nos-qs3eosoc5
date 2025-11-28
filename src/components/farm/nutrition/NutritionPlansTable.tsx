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
import { NutritionPlan } from '@/lib/types'
import { Edit } from 'lucide-react'

interface NutritionPlansTableProps {
  plans: NutritionPlan[]
  onEdit: (plan: NutritionPlan) => void
}

export function NutritionPlansTable({
  plans,
  onEdit,
}: NutritionPlansTableProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categoria</TableHead>
            <TableHead>Estação</TableHead>
            <TableHead>Estratégia</TableHead>
            <TableHead>Suplementação</TableHead>
            <TableHead>Creep Feeding</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                Nenhum plano nutricional cadastrado.
              </TableCell>
            </TableRow>
          ) : (
            plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.category}</TableCell>
                <TableCell>
                  <Badge
                    variant={plan.season === 'rainy' ? 'default' : 'secondary'}
                  >
                    {plan.season === 'rainy'
                      ? 'Águas'
                      : plan.season === 'dry'
                        ? 'Seca'
                        : 'Transição'}
                  </Badge>
                </TableCell>
                <TableCell>{plan.strategy}</TableCell>
                <TableCell>{plan.supplementation}</TableCell>
                <TableCell>{plan.creepFeeding ? 'Sim' : 'Não'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(plan)}
                  >
                    <Edit className="h-4 w-4" />
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
