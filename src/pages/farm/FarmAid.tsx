import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Sparkles } from 'lucide-react'

export default function FarmAid() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [proposals, setProposals] = useState<string[]>([])

  const handleGenerate = async () => {
    if (!input) return
    setIsLoading(true)
    // Mock AI call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setProposals([
      'Revisar suplementação mineral do lote 3 devido à seca.',
      'Agendar vacinação contra aftosa para próxima semana.',
      'Rotacionar pasto 4 para descanso de 30 dias.',
    ])
    setIsLoading(false)
  }

  return (
    <div className="container py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold">Auxílio com IA</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Descreva sua situação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ex: Meus bezerros estão perdendo peso e o pasto está seco..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
            />
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !input}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Gerar Propostas
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Propostas Geradas</CardTitle>
          </CardHeader>
          <CardContent>
            {proposals.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {proposals.map((p, i) => (
                  <li key={i} className="text-sm">
                    {p}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">
                As sugestões aparecerão aqui.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
