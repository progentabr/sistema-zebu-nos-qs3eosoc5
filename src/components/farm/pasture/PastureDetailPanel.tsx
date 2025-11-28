import { useState } from 'react'
import { Pasture } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, CheckSquare, Settings } from 'lucide-react'

interface PastureDetailPanelProps {
  pasture: Pasture
  onUpdate: (pasture: Pasture) => void
}

export function PastureDetailPanel({
  pasture,
  onUpdate,
}: PastureDetailPanelProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPasture, setEditedPasture] = useState<Pasture>(pasture)

  const handleSave = () => {
    onUpdate(editedPasture)
    setIsEditing(false)
  }

  const suggestedDivisions = Math.max(1, Math.floor(pasture.area / 10))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{pasture.name}</h2>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          <Settings className="mr-2 h-4 w-4" />
          {isEditing ? 'Cancelar' : 'Configurar'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dados Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Área (ha)</Label>
                <div className="text-lg font-semibold">{pasture.area}</div>
              </div>
              <div>
                <Label>Produtividade (kg MS/ha)</Label>
                <div className="text-lg font-semibold">
                  {pasture.productivity.msPerHa}
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label>Creep Feeding Instalado</Label>
                  <Switch
                    checked={editedPasture.creepFeeding}
                    onCheckedChange={(checked) =>
                      setEditedPasture({
                        ...editedPasture,
                        creepFeeding: checked,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status Atual</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={editedPasture.status}
                    onChange={(e) =>
                      setEditedPasture({
                        ...editedPasture,
                        status: e.target.value as any,
                      })
                    }
                  >
                    <option value="Ocupado">Ocupado</option>
                    <option value="Descanso">Descanso</option>
                    <option value="Vedado">Vedado</option>
                    <option value="Manutenção">Manutenção</option>
                  </select>
                </div>
                <Button onClick={handleSave} className="w-full">
                  Salvar Alterações
                </Button>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Creep Feeding:</span>
                  <Badge variant={pasture.creepFeeding ? 'default' : 'outline'}>
                    {pasture.creepFeeding ? 'Sim' : 'Não'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Divisões Sugeridas:
                  </span>
                  <span>{suggestedDivisions} piquetes</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vedação (Diferimento)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>Início</Label>
                    <Input
                      type="date"
                      value={editedPasture.vedacao?.startDate || ''}
                      onChange={(e) =>
                        setEditedPasture({
                          ...editedPasture,
                          vedacao: {
                            ...editedPasture.vedacao!,
                            startDate: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fim</Label>
                    <Input
                      type="date"
                      value={editedPasture.vedacao?.endDate || ''}
                      onChange={(e) =>
                        setEditedPasture({
                          ...editedPasture,
                          vedacao: {
                            ...editedPasture.vedacao!,
                            endDate: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Ativar Vedação</Label>
                  <Switch
                    checked={editedPasture.vedacao?.active}
                    onCheckedChange={(checked) =>
                      setEditedPasture({
                        ...editedPasture,
                        vedacao: { ...editedPasture.vedacao!, active: checked },
                      })
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {pasture.vedacao?.active ? (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                    <p className="font-medium">Pasto Vedado</p>
                    <p className="text-sm">
                      De{' '}
                      {new Date(pasture.vedacao.startDate).toLocaleDateString()}{' '}
                      até{' '}
                      {new Date(pasture.vedacao.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Nenhuma vedação ativa.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Cronograma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {pasture.schedule.length === 0 ? (
                <li className="text-muted-foreground text-sm">
                  Nenhum evento agendado.
                </li>
              ) : (
                pasture.schedule.map((event, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center text-sm border-b pb-2 last:border-0"
                  >
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span className="font-medium">{event.action}</span>
                    <Badge variant="outline">{event.animalCount} animais</Badge>
                  </li>
                ))
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" /> Manutenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {pasture.maintenance.length === 0 ? (
                <li className="text-muted-foreground text-sm">
                  Nenhuma manutenção pendente.
                </li>
              ) : (
                pasture.maintenance.map((item) => (
                  <li key={item.id} className="flex items-center gap-2 text-sm">
                    <div
                      className={`h-2 w-2 rounded-full ${item.status === 'done' ? 'bg-green-500' : 'bg-red-500'}`}
                    />
                    <span
                      className={
                        item.status === 'done'
                          ? 'line-through text-muted-foreground'
                          : ''
                      }
                    >
                      {item.item}
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
