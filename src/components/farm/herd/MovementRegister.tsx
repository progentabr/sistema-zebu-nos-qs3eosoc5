import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { farmService } from '@/services/farmService'
import { ArrowRightLeft } from 'lucide-react'

interface MovementRegisterProps {
  farmId: string
}

export function MovementRegister({ farmId }: MovementRegisterProps) {
  const { toast } = useToast()
  const [type, setType] = useState<'entry' | 'exit'>('entry')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async () => {
    if (!quantity || !category) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Preencha quantidade e categoria.',
      })
      return
    }

    try {
      await farmService.registerMovement(farmId, {
        type,
        quantity: Number(quantity),
        category,
        description,
        date: new Date().toISOString(),
      })
      toast({ title: 'Sucesso', description: 'Movimentação registrada.' })
      setQuantity('')
      setDescription('')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao registrar.',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5" /> Entrada e Saída
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Tipo de Movimentação</Label>
          <Select value={type} onValueChange={(v: any) => setType(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entrada (Compra/Nascimento)</SelectItem>
              <SelectItem value="exit">Saída (Venda/Morte)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Quantidade</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Input
              placeholder="Ex: Bezerros"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Descrição / Motivo</Label>
          <Input
            placeholder="Ex: Compra Leilão X"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Registrar Movimentação
        </Button>
      </CardContent>
    </Card>
  )
}
