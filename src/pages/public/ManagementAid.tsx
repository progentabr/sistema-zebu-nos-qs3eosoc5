import { PublicContent } from '@/components/public/PublicContent'
import { AuthContent } from '@/components/public/AuthContent'
import { useAuth } from '@/contexts/AuthContext'
import { BrainCircuit, CalendarCheck, TrendingUp } from 'lucide-react'

export default function ManagementAid() {
  const { user } = useAuth()

  if (user) {
    return (
      <AuthContent
        title="Auxílio no Gerenciamento"
        description="Sua assistente virtual para a fazenda. Receba insights baseados em dados, planeje tarefas da equipe e controle custos com ajuda da Inteligência Artificial."
        tools={[
          {
            name: 'Assistente IA',
            icon: BrainCircuit,
            pathSuffix: '/auxilio',
            description: 'Receba sugestões e análises automáticas.',
          },
          {
            name: 'Agenda de Tarefas',
            icon: CalendarCheck,
            pathSuffix: '/auxilio',
            description: 'Organize o trabalho da equipe de campo.',
          },
          {
            name: 'Análise de Custos',
            icon: TrendingUp,
            pathSuffix: '/auxilio',
            description: 'Visão geral financeira e indicadores.',
          },
        ]}
      />
    )
  }

  return (
    <PublicContent title="Auxílio no Gerenciamento">
      <p className="mb-4">
        A complexidade da pecuária moderna exige mais do que apenas conhecimento
        prático; exige gestão estratégica baseada em dados. O auxílio no
        gerenciamento através de tecnologias digitais e Inteligência Artificial
        (IA) surge como um diferencial competitivo, permitindo ao produtor
        antecipar problemas e aproveitar oportunidades.
      </p>
      <p className="mb-4">
        Sistemas inteligentes podem cruzar dados de clima, cotações de mercado,
        desempenho do rebanho e custos de insumos para sugerir as melhores
        decisões. Por exemplo, a IA pode indicar o momento ideal para venda de
        animais, a melhor estratégia de suplementação para o período ou alertar
        sobre riscos sanitários iminentes na região.
      </p>
      <p className="mb-4">
        Além da análise estratégica, ferramentas de gestão auxiliam na rotina
        operacional: organização da agenda de tarefas da equipe, controle de
        estoque de insumos, gestão do fluxo de caixa e apuração de resultados. A
        tecnologia atua como um "gerente virtual", trabalhando 24 horas por dia
        para garantir que nada passe despercebido.
      </p>
      <p>
        Adotar ferramentas de auxílio ao gerenciamento é dar um passo em direção
        à pecuária de precisão, onde cada decisão é fundamentada em informações
        confiáveis, resultando em maior eficiência, menor risco e maior
        lucratividade para o negócio rural.
      </p>
    </PublicContent>
  )
}
