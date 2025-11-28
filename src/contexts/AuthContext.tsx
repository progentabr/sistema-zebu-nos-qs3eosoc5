import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, UserRole } from '@/lib/types'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: User | null
  login: (email: string, role: UserRole) => Promise<void>
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

  const login = async (email: string, role: UserRole) => {
    setIsLoading(true)
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: '123',
      email,
      name: email.split('@')[0],
      role,
      farmIds: role === 'farm' ? ['1', '2'] : undefined,
    }

    setUser(mockUser)
    localStorage.setItem('zebu_user', JSON.stringify(mockUser))
    setIsLoading(false)

    if (role === 'admin') {
      navigate('/admin/dashboard')
    } else {
      // In a real app, show farm selector if multiple. Here default to first.
      navigate(`/farm/${mockUser.farmIds?.[0] || '1'}/dashboard`)
    }
  }

  const logout = () => {
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
