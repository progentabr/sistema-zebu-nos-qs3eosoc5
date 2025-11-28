import { Button } from '@/components/ui/button'

export default function ManagementAid() {
  return (
    <div className="container py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-primary">
          Auxílio no Gerenciamento
        </h1>
        <div className="prose prose-lg text-muted-foreground">
          <p>
            Utilize o poder da Inteligência Artificial para auxiliar na gestão
            da sua fazenda. Receba propostas de atividades, controle custos e
            organize a agenda de tarefas da sua equipe.
          </p>
        </div>
        <div className="flex justify-center pt-8">
          <Button size="lg">Conhecer IA</Button>
        </div>
      </div>
    </div>
  )
}
