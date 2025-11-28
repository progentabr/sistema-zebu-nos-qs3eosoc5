import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

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

  return (
    <nav className="border-b bg-background/50 backdrop-blur-sm">
      <div className="container flex h-12 items-center px-4">
        {/* Desktop Nav */}
        <div className="hidden md:flex w-full justify-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex w-full justify-end">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
