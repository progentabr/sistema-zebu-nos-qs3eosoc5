import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles } from 'lucide-react'

export function AIAssistantWidget() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" /> Assistente Virtual (IA)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[200px] bg-background rounded-md border p-4 text-sm text-muted-foreground overflow-y-auto">
          <p>
            Olá! Sou sua assistente virtual. Posso ajudar a analisar dados da
            fazenda, sugerir melhorias no manejo ou tirar dúvidas técnicas. Como
            posso ajudar hoje?
          </p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Digite sua pergunta..." />
          <Button>Enviar</Button>
        </div>
      </CardContent>
    </Card>
  )
}
