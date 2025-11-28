import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { farmService } from '@/services/farmService'

interface CreepFeedingModuleProps {
  farmId: string
}

export function CreepFeedingModule({ farmId }: CreepFeedingModuleProps) {
  const { toast } = useToast()
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [cost, setCost] = useState('')

  const handleRegister = async () => {
    if (!product || !amount) return
    try {
      await farmService.saveCreepFeedingRecord(farmId, {
        product,
        amount: Number(amount),
        cost: Number(cost),
        date: new Date().toISOString(),
      })
      toast({ title: 'Sucesso', description: 'Abastecimento registrado.' })
      setProduct('')
      setAmount('')
      setCost('')
    } catch (e) {
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
        <CardTitle>Registro de Creep Feeding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Produto Utilizado</Label>
          <Input
            placeholder="Ex: Ração Inicial 22%"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Quantidade (kg)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Custo Total (R$)</Label>
            <Input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleRegister} className="w-full">
          Registrar Abastecimento
        </Button>
      </CardContent>
    </Card>
  )
}
