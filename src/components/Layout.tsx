import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LoginWidget } from '@/components/auth/LoginWidget'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Header />
      <div className="container flex justify-end py-2 px-4 border-b bg-muted/10">
        <LoginWidget />
      </div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
