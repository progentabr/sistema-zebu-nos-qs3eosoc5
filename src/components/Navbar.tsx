import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

const navItems = [
  { name: 'Manejo das Pastagens', path: '/pastagens' },
  { name: 'Manejo Nutricional', path: '/nutricao' },
  { name: 'Controle Sanitário', path: '/sanitario' },
  { name: 'Manejo Reprodutivo', path: '/reproducao' },
  { name: 'Manejo Rebanho', path: '/rebanho' },
  { name: 'Auxílio Gerenciamento', path: '/auxilio' },
]

export function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-40 shadow-sm">
      <div className="container flex h-14 items-center px-4 justify-between md:justify-center">
        {/* Desktop Nav */}
        <div className="hidden md:flex w-full justify-center gap-1 lg:gap-6 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-medium transition-all px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground whitespace-nowrap',
                location.pathname === item.path
                  ? 'text-primary bg-primary/10 font-semibold'
                  : 'text-muted-foreground',
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Nav Trigger */}
        <div className="md:hidden flex w-full justify-between items-center">
          <span className="text-sm font-semibold text-muted-foreground">
            Menu
          </span>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-left mb-4">Navegação</SheetTitle>
              <div className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-base font-medium transition-colors hover:text-primary p-3 rounded-md hover:bg-accent',
                      location.pathname === item.path
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {user && (
                  <>
                    <div className="h-px bg-border my-2" />
                    <Link
                      to={
                        user.role === 'admin'
                          ? '/admin/dashboard'
                          : `/farm/${user.farmIds?.[0] || '1'}/dashboard`
                      }
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-primary p-3 rounded-md hover:bg-accent"
                    >
                      Ir para Dashboard
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
