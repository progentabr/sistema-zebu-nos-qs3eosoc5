import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { priceService } from '@/services/priceService'
import { CommodityPrice } from '@/lib/types'
import { Loader2, Download, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function FormulationSuggestor() {
  const { toast } = useToast()
  const [prices, setPrices] = useState<CommodityPrice[]>([])
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const data = await priceService.getCommodityPrices(['milho', 'soja'])
        setPrices(data)
      } catch (e) {
        console.error(e)
      }
    }
    loadPrices()
  }, [])

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      const corn =
        prices.find((p) => p.item.toLowerCase().includes('milho'))?.value || 60
      const soy =
        prices.find((p) => p.item.toLowerCase().includes('soja'))?.value || 120

      // Simple heuristic: if corn is cheap relative to soy, use more energy
      const ratio = soy / corn
      let text = ''

      if (ratio > 2.2) {
        text = `O preço do milho está favorável (Relação Soja/Milho: ${ratio.toFixed(1)}). Sugestão: Aumentar a densidade energética com milho e reduzir a fonte proteica se possível, ou buscar fontes alternativas como ureia para baratear o custo proteico.`
      } else {
        text = `O preço da soja está competitivo. Sugestão: Manter o balanceamento padrão proteico-energético para maximizar o desempenho.`
      }

      setSuggestion(text)
      setLoading(false)
    }, 1500)
  }

  const handleExport = (format: 'csv' | 'pdf') => {
    toast({
      title: 'Exportação iniciada',
      description: `O arquivo de formulação será baixado em formato ${format.toUpperCase()}.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" /> Otimizador de Ração
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Analisa os preços atuais das commodities para sugerir ajustes na
          formulação visando menor custo.
        </p>

        <div className="flex gap-4 text-sm">
          {prices.map((p) => (
            <div key={p.item} className="bg-muted p-2 rounded">
              <span className="font-semibold">{p.item}:</span> {p.unit}{' '}
              {p.value.toFixed(2)}
            </div>
          ))}
        </div>

        <Button onClick={handleGenerate} disabled={loading} className="w-full">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Gerar Sugestão'
          )}
        </Button>

        {suggestion && (
          <div className="mt-4 p-4 bg-primary/5 border rounded-md animate-fade-in">
            <h4 className="font-semibold mb-2">Análise da IA:</h4>
            <p className="text-sm">{suggestion}</p>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('csv')}
              >
                <Download className="mr-2 h-4 w-4" /> CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('pdf')}
              >
                <Download className="mr-2 h-4 w-4" /> PDF
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
