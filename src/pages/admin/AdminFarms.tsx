import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Search, Trash2, Edit, Loader2 } from 'lucide-react'
import { adminService } from '@/services/adminService'
import { Farm } from '@/lib/types'
import { FarmFormModal } from '@/components/admin/FarmFormModal'
import { useToast } from '@/hooks/use-toast'

export default function AdminFarms() {
  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { toast } = useToast()

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const fetchFarms = async () => {
    setLoading(true)
    try {
      const response = await adminService.listFarms(1, debouncedSearch)
      setFarms(response.data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao carregar fazendas.',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFarms()
  }, [debouncedSearch])

  const handleSave = async (farmData: Partial<Farm>) => {
    try {
      await adminService.upsertFarm(farmData)
      toast({
        title: 'Sucesso',
        description: 'Fazenda salva com sucesso.',
      })
      setIsModalOpen(false)
      fetchFarms()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao salvar fazenda.',
      })
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await adminService.deactivateFarm(deleteId)
      toast({
        title: 'Sucesso',
        description: 'Fazenda removida (inativada).',
      })
      setDeleteId(null)
      fetchFarms()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao remover fazenda.',
      })
    }
  }

  return (
    <div className="container py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gerenciar Fazendas</h1>
        <Button
          onClick={() => {
            setEditingFarm(null)
            setIsModalOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Fazenda
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, endereço ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : farms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Nenhuma fazenda encontrada.
                </TableCell>
              </TableRow>
            ) : (
              farms.map((farm) => (
                <TableRow key={farm.id}>
                  <TableCell className="font-medium">{farm.name}</TableCell>
                  <TableCell>{farm.owner}</TableCell>
                  <TableCell>{farm.email}</TableCell>
                  <TableCell>{farm.phone}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {farm.address}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        farm.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {farm.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingFarm(farm)
                        setIsModalOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setDeleteId(farm.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <FarmFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingFarm}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar remoção</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja inativar esta fazenda? Esta ação pode ser
              revertida posteriormente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
