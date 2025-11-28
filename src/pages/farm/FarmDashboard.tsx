import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  Activity,
  Calendar,
  ClipboardList,
  Map as MapIcon,
  Users,
  Wheat,
} from 'lucide-react'

export default function FarmDashboard() {
  const { farmId } = useParams()

  const modules = [
    {
      title: 'Pastagens',
      icon: MapIcon,
      href: `/farm/${farmId}/pastagens`,
      color: 'text-green-600',
    },
    {
      title: 'Nutrição',
      icon: Wheat,
      href: `/farm/${farmId}/nutricao`,
      color: 'text-yellow-600',
    },
    {
      title: 'Sanitário',
      icon: Activity,
      href: `/farm/${farmId}/sanitario`,
      color: 'text-red-600',
    },
    {
      title: 'Reprodução',
      icon: Users,
      href: `/farm/${farmId}/reproducao`,
      color: 'text-purple-600',
    },
    {
      title: 'Rebanho',
      icon: ClipboardList,
      href: `/farm/${farmId}/rebanho`,
      color: 'text-blue-600',
    },
    {
      title: 'Auxílio IA',
      icon: Calendar,
      href: `/farm/${farmId}/auxilio`,
      color: 'text-indigo-600',
    },
  ]

  return (
    <div className="container py-8 px-4 space-y-8">
      <h1 className="text-3xl font-bold">Painel da Fazenda</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link key={module.title} to={module.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {module.title}
                </CardTitle>
                <module.icon className={`h-6 w-6 ${module.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Acessar módulo de {module.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
