import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Animal } from '@/lib/types'

interface AnimalsIdentificationTableProps {
  animals: Animal[]
}

export function AnimalsIdentificationTable({
  animals,
}: AnimalsIdentificationTableProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAnimals = animals.filter((animal) => {
    const matchesCategory =
      filterCategory === 'all' || animal.category === filterCategory
    const matchesSearch = animal.tag
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Buscar por brinco..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            <SelectItem value="Vaca Prenhe">Vaca Prenhe</SelectItem>
            <SelectItem value="Vaca Vazia">Vaca Vazia</SelectItem>
            <SelectItem value="Novilha">Novilha</SelectItem>
            <SelectItem value="Bezerro">Bezerro</SelectItem>
            <SelectItem value="Touro">Touro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brinco</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Peso Atual (kg)</TableHead>
              <TableHead>Última Pesagem</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnimals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Nenhum animal encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredAnimals.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell className="font-medium">{animal.tag}</TableCell>
                  <TableCell>{animal.category}</TableCell>
                  <TableCell>{animal.weightHistory.current}</TableCell>
                  <TableCell>
                    {new Date(
                      animal.weightHistory.lastWeighingDate,
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{animal.status}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
