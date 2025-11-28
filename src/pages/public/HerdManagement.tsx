import { PublicContent } from '@/components/public/PublicContent'
import { AuthContent } from '@/components/public/AuthContent'
import { useAuth } from '@/contexts/AuthContext'
import { ClipboardList, Scale, Tags } from 'lucide-react'

export default function HerdManagement() {
  const { user } = useAuth()

  if (user) {
    return (
      <AuthContent
        title="Manejo do Rebanho"
        description="Controle total do seu rebanho. Registre pesagens, movimentações, nascimentos e acompanhe o desempenho individual de cada animal."
        tools={[
          {
            name: 'Inventário Animal',
            icon: ClipboardList,
            pathSuffix: '/rebanho',
            description: 'Listagem completa e filtros de animais.',
          },
          {
            name: 'Controle de Pesagem',
            icon: Scale,
            pathSuffix: '/rebanho',
            description: 'Registro de peso e cálculo de GMD.',
          },
          {
            name: 'Identificação',
            icon: Tags,
            pathSuffix: '/rebanho',
            description: 'Gestão de brincos e categorias.',
          },
        ]}
      />
    )
  }

  return (
    <PublicContent title="Manejo do Rebanho">
      <p className="mb-4">
        O controle individual do rebanho é a base para uma gestão pecuária
        profissional e eficiente. Saber exatamente quantos animais existem na
        fazenda, onde estão e como estão desempenhando é fundamental para a
        tomada de decisão. A identificação correta, seja por brincos visuais,
        tatuagens ou identificação eletrônica (chips), é o primeiro passo para a
        rastreabilidade.
      </p>
      <p className="mb-4">
        O acompanhamento do ganho de peso é crucial. Pesagens periódicas
        permitem calcular o Ganho Médio Diário (GMD), identificar animais de
        desempenho superior para seleção e animais inferiores para descarte.
        Isso otimiza a conversão alimentar e reduz o tempo de permanência dos
        animais na fazenda, aumentando o giro de capital.
      </p>
      <p className="mb-4">
        Além do peso, o registro de eventos como nascimentos, mortes, compras,
        vendas e movimentações entre pastos garante a acurácia do inventário. A
        gestão zootécnica permite avaliar a eficiência de cada categoria animal
        e planejar a evolução do rebanho ao longo dos anos.
      </p>
      <p>
        Um sistema de gestão de rebanho organizado transforma dados brutos em
        informações valiosas, permitindo ao produtor conhecer o custo de
        produção de cada arroba e gerenciar sua fazenda como uma verdadeira
        empresa rural.
      </p>
    </PublicContent>
  )
}
