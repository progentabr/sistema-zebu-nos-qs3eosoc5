import { useState } from 'react'
import { LoginButton } from './LoginButton'
import { LoginModal } from './LoginModal'
import { useAuth } from '@/contexts/AuthContext'

export function LoginWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  if (user) return null

  return (
    <>
      <LoginButton onClick={() => setIsOpen(true)} />
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
