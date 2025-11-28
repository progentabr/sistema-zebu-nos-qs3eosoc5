import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            Gestão Inteligente para <br />
            <span className="text-primary">Criadores de Zebuínos</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Potencialize sua produção com ferramentas avançadas de manejo,
            controle sanitário e inteligência artificial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="rounded-full px-8 text-lg" asChild>
              <Link to="/pastagens">Ver Ferramentas</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-lg"
            >
              Cadastre sua Fazenda
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
