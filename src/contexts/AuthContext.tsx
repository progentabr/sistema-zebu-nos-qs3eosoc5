import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, UserRole } from '@/lib/types'
import { useNavigate } from 'react-router-dom'
import { supabaseClient } from '@/services/supabaseClient'

interface AuthContextType {
  user: User | null
  login: (
    email: string,
    password: string,
    role: UserRole,
    cpfCnpj?: string,
  ) => Promise<User | null>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate session check
    const storedUser = localStorage.getItem('zebu_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (
    email: string,
    password: string,
    role: UserRole,
    cpfCnpj?: string,
  ) => {
    setIsLoading(true)
    try {
      const { user: authUser } = await supabaseClient.authSignIn(
        email,
        password,
        role,
        cpfCnpj,
      )

      setUser(authUser)
      localStorage.setItem('zebu_user', JSON.stringify(authUser))
      return authUser
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await supabaseClient.authSignOut()
    setUser(null)
    localStorage.removeItem('zebu_user')
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
