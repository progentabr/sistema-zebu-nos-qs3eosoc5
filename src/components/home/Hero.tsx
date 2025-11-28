import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, Sprout, BrainCircuit } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            <BrainCircuit className="mr-1 h-3 w-3" />
            Inteligência Artificial Aplicada
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            Gestão Inteligente para <br />
            <span className="text-primary">Criadores de Zebuínos</span>
          </h1>

          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl leading-relaxed">
            Otimize sua produção com um sistema completo de manejo. Utilize
            nossa Inteligência Artificial para tomar decisões precisas sobre
            pastagens, nutrição e reprodução, garantindo a máxima eficiência do
            seu rebanho.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <Button
              size="lg"
              className="rounded-full px-8 text-lg h-12"
              asChild
            >
              <Link to="/cadastro">
                Cadastre sua fazenda
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-lg h-12"
              asChild
            >
              <Link to="/pastagens">
                <Sprout className="mr-2 h-4 w-4" />
                Ver ferramentas
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/40 blur-3xl" />
      </div>
    </section>
  )
}
