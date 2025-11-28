import { PublicContent } from '@/components/public/PublicContent'
import { AuthContent } from '@/components/public/AuthContent'
import { useAuth } from '@/contexts/AuthContext'
import { Calculator, Map, CloudRain } from 'lucide-react'

export default function PastureManagement() {
  const { user } = useAuth()

  if (user) {
    return (
      <AuthContent
        title="Manejo das Pastagens"
        description="Gerencie suas pastagens com precisão. Utilize as ferramentas abaixo para calcular a capacidade de suporte, planejar o rodízio de piquetes e monitorar o clima para tomada de decisão."
        tools={[
          {
            name: 'Mapa de Piquetes',
            icon: Map,
            pathSuffix: '/pastagens',
            description: 'Visualize e demarque seus piquetes no mapa.',
          },
          {
            name: 'Calculadora de Capacidade',
            icon: Calculator,
            pathSuffix: '/pastagens',
            description: 'Calcule a lotação ideal (UA/ha) baseada na MS.',
          },
          {
            name: 'Monitoramento Climático',
            icon: CloudRain,
            pathSuffix: '/dashboard',
            description: 'Acompanhe chuvas e previsão do tempo.',
          },
        ]}
      />
    )
  }

  return (
    <PublicContent title="Manejo das Pastagens">
      <p className="mb-4">
        O manejo eficiente das pastagens é o alicerce da pecuária zebuína
        produtiva e sustentável. A identificação correta das espécies
        forrageiras, como as do gênero <em>Brachiaria</em> e <em>Panicum</em>, e
        o entendimento do seu ciclo de crescimento são cruciais para maximizar a
        produção de carne e leite a pasto.
      </p>
      <p className="mb-4">
        O cálculo da capacidade de suporte, expresso em Matéria Seca por hectare
        (MS/ha), é uma ferramenta indispensável para o pecuarista moderno. Ele
        permite ajustar a taxa de lotação animal, garantindo que a oferta de
        forragem seja compatível com a demanda do rebanho. Isso evita tanto a
        degradação do pasto pelo superpastejo quanto o desperdício de alimento
        pelo subpastejo, otimizando o desempenho zootécnico.
      </p>
      <p className="mb-4">
        A produtividade do sistema pode ser significativamente aumentada através
        de técnicas como o pastejo rotacionado. A divisão da área em piquetes,
        utilizando cercas elétricas de baixo custo e fácil manutenção, permite
        períodos de descanso estratégicos para a rebrota vigorosa do capim. Esse
        manejo melhora a qualidade nutricional da dieta e favorece a
        persistência da pastagem a longo prazo.
      </p>
      <p>
        Além disso, a implementação de áreas de <strong>Creep Feeding</strong>{' '}
        em locais estratégicos do pasto favorece o desenvolvimento acelerado dos
        bezerros, permitindo a suplementação exclusiva sem a competição com as
        matrizes. Um manejo de pastagens bem executado resulta em maior
        rentabilidade, conservação do solo e longevidade do sistema produtivo.
      </p>
    </PublicContent>
  )
}
