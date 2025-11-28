export function Footer() {
  return (
    <footer className="border-t bg-background py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2024 Sistema Zebuínos. Todos os direitos reservados.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:underline">
            Privacidade
          </a>
          <a href="#" className="hover:underline">
            Termos
          </a>
        </div>
      </div>
    </footer>
  )
}
