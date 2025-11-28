import { User, UserRole } from '@/lib/types'

export const supabaseClient = {
  /**
   * Authenticates the user.
   * CONFIGURE HERE: Replace this mock with actual Supabase auth call.
   * e.g. await supabase.auth.signInWithPassword({ email, password })
   */
  authSignIn: async (
    email: string,
    password: string,
    role: UserRole,
    cpfCnpj?: string,
  ) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (password === 'error') {
      throw new Error('Credenciais inválidas')
    }

    // Mock role mismatch simulation
    // For testing: email containing 'admin' must be admin role
    if (email.toLowerCase().includes('admin') && role !== 'admin') {
      throw new Error('Role mismatch: Este usuário é um administrador.')
    }
    // For testing: email containing 'farm' must be farm role
    if (email.toLowerCase().includes('farm') && role !== 'farm') {
      throw new Error('Role mismatch: Este usuário é um produtor.')
    }

    // Mock user data
    const user: User = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role,
      // Mock multiple farms if email contains 'multi'
      farmIds:
        role === 'farm'
          ? email.toLowerCase().includes('multi')
            ? ['1', '2']
            : ['1']
          : undefined,
    }

    return { user, session: { access_token: 'mock-token-123' } }
  },

  authSignOut: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
  },
}
