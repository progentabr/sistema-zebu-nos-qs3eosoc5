import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, FileText, Sprout } from 'lucide-react'

interface PublicContentProps {
  title: string
  children: React.ReactNode
}

export function PublicContent({ title, children }: PublicContentProps) {
  return (
    <div className="container py-12 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            {title}
          </h1>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <Card className="border-none shadow-lg bg-gradient-to-b from-background to-muted/20">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-lg text-muted-foreground max-w-none leading-relaxed text-justify">
              {children}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          <Button size="lg" className="w-full h-14 text-lg shadow-md" asChild>
            <Link to="/cadastro">
              <Sprout className="mr-2 h-5 w-5" />
              Cadastre sua fazenda
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full h-14 text-lg shadow-sm border-primary/20 hover:bg-primary/5"
            asChild
          >
            <Link to="/calculadora-publica">
              <Calculator className="mr-2 h-5 w-5" />
              Calcule agora
            </Link>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full h-14 text-lg shadow-sm"
            asChild
          >
            <Link to="/contato">
              <FileText className="mr-2 h-5 w-5" />
              Solicitar plano
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
