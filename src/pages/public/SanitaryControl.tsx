import { PublicContent } from '@/components/public/PublicContent'
import { AuthContent } from '@/components/public/AuthContent'
import { useAuth } from '@/contexts/AuthContext'
import { Syringe, ShieldCheck, CalendarClock } from 'lucide-react'

export default function SanitaryControl() {
  const { user } = useAuth()

  if (user) {
    return (
      <AuthContent
        title="Controle Sanitário"
        description="Mantenha a saúde do rebanho em dia. Acesse o calendário de vacinação oficial e registre todos os tratamentos e manejos sanitários realizados."
        tools={[
          {
            name: 'Calendário de Vacinação',
            icon: CalendarClock,
            pathSuffix: '/sanitario',
            description: 'Acompanhe datas de vacinas obrigatórias.',
          },
          {
            name: 'Registro de Tratamentos',
            icon: Syringe,
            pathSuffix: '/sanitario',
            description: 'Histórico de medicamentos aplicados.',
          },
          {
            name: 'Controle de Parasitas',
            icon: ShieldCheck,
            pathSuffix: '/sanitario',
            description: 'Gestão de banhos e vermifugações.',
          },
        ]}
      />
    )
  }

  return (
    <PublicContent title="Controle Sanitário">
      <p className="mb-4">
        O controle sanitário é vital para garantir a saúde, o bem-estar e a
        produtividade do rebanho zebuíno. Um programa sanitário preventivo e bem
        estruturado evita surtos de doenças que podem causar mortalidade ou
        queda significativa no desempenho dos animais, protegendo o patrimônio
        do produtor.
      </p>
      <p className="mb-4">
        O cumprimento rigoroso do calendário oficial de vacinação, especialmente
        contra a Febre Aftosa, Brucelose e Raiva, é obrigatório e fundamental
        para a segurança sanitária nacional. Além das vacinas obrigatórias, é
        importante imunizar o rebanho contra clostridioses e doenças
        reprodutivas, conforme a incidência regional e recomendação veterinária.
      </p>
      <p className="mb-4">
        O controle estratégico de endo e ectoparasitas merece atenção especial.
        Verminoses gastrointestinais podem causar perdas silenciosas de peso,
        enquanto carrapatos e moscas-dos-chifres transmitem doenças e causam
        estresse intenso. A rotação de princípios ativos e o tratamento baseado
        em exames (OPG) são práticas recomendadas para evitar a resistência
        parasitária.
      </p>
      <p>
        A prevenção é sempre o melhor remédio. Manter registros detalhados de
        todas as ocorrências sanitárias e tratamentos realizados permite uma
        gestão mais eficiente e garante a qualidade e a segurança do produto
        final oferecido ao mercado.
      </p>
    </PublicContent>
  )
}
