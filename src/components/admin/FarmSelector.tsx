import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2, Check } from 'lucide-react'
import { adminService } from '@/services/adminService'
import { Farm } from '@/lib/types'

interface FarmSelectorProps {
  onSelect: (farm: Farm) => void
  selectedFarmId?: string
}

export function FarmSelector({ onSelect, selectedFarmId }: FarmSelectorProps) {
  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchFarms = async () => {
      setLoading(true)
      try {
        const response = await adminService.listFarms(1, searchTerm)
        setFarms(response.data)
      } catch (error) {
        console.error('Failed to fetch farms', error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchFarms()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <div className="space-y-4 border rounded-md p-4 bg-card">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar fazenda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border max-h-[300px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : farms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Nenhuma fazenda encontrada.
                </TableCell>
              </TableRow>
            ) : (
              farms.map((farm) => (
                <TableRow
                  key={farm.id}
                  className={
                    selectedFarmId === farm.id ? 'bg-primary/5' : undefined
                  }
                >
                  <TableCell className="font-medium">{farm.name}</TableCell>
                  <TableCell>{farm.owner}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {farm.address}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant={
                        selectedFarmId === farm.id ? 'secondary' : 'outline'
                      }
                      onClick={() => onSelect(farm)}
                    >
                      {selectedFarmId === farm.id ? (
                        <>
                          <Check className="mr-2 h-3 w-3" /> Selecionado
                        </>
                      ) : (
                        'Selecionar'
                      )}
                    </Button>
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
