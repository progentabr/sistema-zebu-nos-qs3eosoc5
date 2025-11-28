import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { LucideIcon, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Tool {
  name: string
  icon: LucideIcon
  pathSuffix: string // e.g., '/pastagens' -> becomes /farm/:id/pastagens
  description: string
}

interface AuthContentProps {
  title: string
  description: string
  tools: Tool[]
}

export function AuthContent({ title, description, tools }: AuthContentProps) {
  const { user } = useAuth()
  const farmId = user?.farmIds?.[0] || '1'

  return (
    <div className="container py-12 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-primary">{title}</h1>
            <p className="text-muted-foreground max-w-2xl">{description}</p>
          </div>
          <Button asChild>
            <Link to={`/farm/${farmId}/dashboard`}>
              Ir para Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              to={`/farm/${farmId}${tool.pathSuffix}`}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {tool.name}
                  </CardTitle>
                  <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <tool.icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
