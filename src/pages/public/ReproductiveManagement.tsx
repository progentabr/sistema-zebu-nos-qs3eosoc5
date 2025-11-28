import { PublicContent } from '@/components/public/PublicContent'
import { AuthContent } from '@/components/public/AuthContent'
import { useAuth } from '@/contexts/AuthContext'
import { Dna, CalendarRange, Baby } from 'lucide-react'

export default function ReproductiveManagement() {
  const { user } = useAuth()

  if (user) {
    return (
      <AuthContent
        title="Manejo Reprodutivo"
        description="Maximize seus índices reprodutivos. Gerencie a estação de monta, protocolos de IATF e acompanhe as taxas de prenhez e natalidade do seu rebanho."
        tools={[
          {
            name: 'Estação de Monta',
            icon: CalendarRange,
            pathSuffix: '/reproducao',
            description: 'Planejamento e controle da estação.',
          },
          {
            name: 'Protocolos IATF',
            icon: Dna,
            pathSuffix: '/reproducao',
            description: 'Gestão de inseminações e diagnósticos.',
          },
          {
            name: 'Índices Zootécnicos',
            icon: Baby,
            pathSuffix: '/reproducao',
            description: 'Taxas de prenhez, natalidade e desmame.',
          },
        ]}
      />
    )
  }

  return (
    <PublicContent title="Manejo Reprodutivo">
      <p className="mb-4">
        A eficiência reprodutiva é o motor que impulsiona a rentabilidade da
        pecuária de cria. O objetivo é produzir um bezerro por vaca ao ano, com
        qualidade genética e peso adequado. Para isso, o estabelecimento de uma
        Estação de Monta bem definida é essencial, concentrando os nascimentos
        na época de maior disponibilidade de pasto.
      </p>
      <p className="mb-4">
        A Inseminação Artificial em Tempo Fixo (IATF) revolucionou o manejo
        reprodutivo, permitindo a inseminação de um grande número de matrizes
        sem a necessidade de observação de cio, além de acelerar o melhoramento
        genético através do uso de touros provados. Essa biotecnologia aumenta a
        taxa de prenhez no início da estação, resultando em bezerros mais
        pesados na desmama (bezerros do cedo).
      </p>
      <p className="mb-4">
        O manejo nutricional das matrizes é determinante para o sucesso
        reprodutivo. Vacas com bom escore corporal emprenham mais facilmente.
        Além disso, o diagnóstico de gestação precoce e o descarte estratégico
        de matrizes vazias ou improdutivas são práticas fundamentais para manter
        um rebanho fértil e economicamente viável.
      </p>
      <p>
        Monitorar índices como taxa de prenhez, taxa de natalidade e intervalo
        entre partos permite identificar gargalos e tomar decisões assertivas
        para maximizar a produção de bezerros e o retorno sobre o capital
        investido.
      </p>
    </PublicContent>
  )
}
