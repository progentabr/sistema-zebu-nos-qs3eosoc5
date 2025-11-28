import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'

interface LoginButtonProps {
  onClick: () => void
}

export function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      className="gap-2 bg-background"
    >
      <LogIn className="h-4 w-4" />
      Entrar
    </Button>
  )
}
