import { PublicContent } from '@/components/public/PublicContent'
import { AuthContent } from '@/components/public/AuthContent'
import { useAuth } from '@/contexts/AuthContext'
import { Wheat, Scale, FileSpreadsheet } from 'lucide-react'

export default function NutritionalManagement() {
  const { user } = useAuth()

  if (user) {
    return (
      <AuthContent
        title="Manejo Nutricional"
        description="Acesse seus planos nutricionais e ferramentas de formulação. Garanta que seu rebanho receba os nutrientes necessários para cada fase de desenvolvimento."
        tools={[
          {
            name: 'Planos Nutricionais',
            icon: FileSpreadsheet,
            pathSuffix: '/nutricao',
            description: 'Gerencie dietas por categoria animal.',
          },
          {
            name: 'Formulação de Ração',
            icon: Wheat,
            pathSuffix: '/nutricao',
            description: 'Crie formulações baseadas em custo-benefício.',
          },
          {
            name: 'Controle de Suplementação',
            icon: Scale,
            pathSuffix: '/nutricao',
            description: 'Registre o fornecimento de sal e proteinado.',
          },
        ]}
      />
    )
  }

  return (
    <PublicContent title="Manejo Nutricional">
      <p className="mb-4">
        A nutrição adequada é um dos pilares fundamentais para o sucesso na
        criação de zebuínos. Um planejamento nutricional eficiente deve
        considerar as exigências específicas de cada categoria animal — desde
        bezerros em crescimento até matrizes em lactação e touros reprodutores —
        e as variações na qualidade das pastagens ao longo do ano.
      </p>
      <p className="mb-4">
        Durante o período das águas, o foco deve ser maximizar o ganho de peso
        aproveitando a alta disponibilidade de forragem, muitas vezes utilizando
        suplementação mineral para corrigir desequilíbrios. Já na época da seca,
        o uso de suplementos proteicos e energéticos (proteinados) torna-se
        essencial para manter o escore corporal e evitar a perda de peso,
        garantindo a continuidade do ciclo produtivo.
      </p>
      <p className="mb-4">
        A formulação de dietas deve ser dinâmica, ajustando-se aos custos dos
        insumos e ao valor da arroba. O uso estratégico de tecnologias como o{' '}
        <em>Creep Feeding</em> para bezerros e a terminação intensiva a pasto
        (TIP) pode acelerar o ciclo de produção e aumentar a taxa de desfrute da
        fazenda.
      </p>
      <p>
        Investir em nutrição não é apenas um custo, mas um investimento direto
        na saúde, fertilidade e precocidade do rebanho. Um manejo nutricional
        bem ajustado reflete diretamente na rentabilidade final da operação
        pecuária.
      </p>
    </PublicContent>
  )
}
