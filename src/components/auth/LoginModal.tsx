import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { mockFarms } from '@/services/mockService'
import { User } from '@/lib/types'

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
  role: z.enum(['admin', 'farm']),
  cpfCnpj: z.string().optional(),
})

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'login' | 'farm-select'>('login')
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'farm',
      cpfCnpj: '',
    },
  })

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const user = await login(
        values.email,
        values.password,
        values.role,
        values.cpfCnpj,
      )

      if (user) {
        if (user.role === 'admin') {
          toast({
            title: 'Login realizado',
            description: 'Bem-vindo, Administrador.',
          })
          navigate('/admin/dashboard')
          onClose()
        } else {
          // Farm role
          if (user.farmIds && user.farmIds.length > 1) {
            setAuthenticatedUser(user)
            setStep('farm-select')
          } else {
            const farmId = user.farmIds?.[0] || '1'
            toast({
              title: 'Login realizado',
              description: `Bem-vindo, ${user.name}.`,
            })
            navigate(`/farm/${farmId}/dashboard`)
            onClose()
          }
        }
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao entrar',
        description: error.message || 'Verifique suas credenciais.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFarmSelect = (farmId: string) => {
    navigate(`/farm/${farmId}/dashboard`)
    toast({
      title: 'Fazenda selecionada',
      description: 'Acessando dashboard...',
    })
    onClose()
  }

  const handleGoogleLogin = () => {
    toast({
      title: 'Google Login',
      description: 'Funcionalidade em desenvolvimento.',
    })
  }

  const handleForgotPassword = () => {
    toast({
      title: 'Recuperação de senha',
      description: 'Verifique seu email.',
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setStep('login')
          form.reset()
        }
        onClose()
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === 'login' ? 'Acessar Sistema' : 'Selecione a Fazenda'}
          </DialogTitle>
          <DialogDescription>
            {step === 'login'
              ? 'Entre com suas credenciais para continuar.'
              : 'Você possui acesso a múltiplas fazendas.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'login' ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil de Acesso</FormLabel>
                    <FormControl>
                      <Tabs
                        defaultValue={field.value}
                        onValueChange={(v) => field.onChange(v)}
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="farm">Fazenda</TabsTrigger>
                          <TabsTrigger value="admin">Admin</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpfCnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF / CNPJ (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2 pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  Entrar com Google
                </Button>

                <Button
                  type="button"
                  variant="link"
                  className="w-full text-sm text-muted-foreground"
                  onClick={handleForgotPassword}
                >
                  Esqueci minha senha
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-2">
              {authenticatedUser?.farmIds?.map((farmId) => {
                const farm = mockFarms.find((f) => f.id === farmId)
                return (
                  <Button
                    key={farmId}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => handleFarmSelect(farmId)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">
                        {farm?.name || `Fazenda ${farmId}`}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {farm?.owner || 'Proprietário'}
                      </span>
                    </div>
                  </Button>
                )
              })}
            </div>
            <Button
              variant="ghost"
              onClick={() => setStep('login')}
              className="w-full"
            >
              Voltar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
