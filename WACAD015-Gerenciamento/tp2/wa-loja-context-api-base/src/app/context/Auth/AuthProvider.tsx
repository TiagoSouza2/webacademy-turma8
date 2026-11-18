'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  email: string | null
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthContext must be used within AuthProvider')
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setEmail(localStorage.getItem('user'))
  }, [])

  const login = (userEmail: string) => {
    setEmail(userEmail)
    localStorage.setItem('user', userEmail)
    router.push('/')
  }
  const logout = () => {
    setEmail(null)
    localStorage.removeItem('user')
  }

  return <AuthContext.Provider value={{ email, login, logout }}>{children}</AuthContext.Provider>
}
