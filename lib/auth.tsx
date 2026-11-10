"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Login de demonstracao (MVP 100% front-end). Nao e seguranca real:
// qualquer pessoa com acesso ao JS publicado consegue ver estas credenciais.
const DEMO_USER = "admin"
const DEMO_PASSWORD = "adminfoda"
const SESSION_KEY = "pb-auth"

interface AuthContextValue {
  /** null enquanto ainda le o sessionStorage (evita piscar a tela de login) */
  isAuthenticated: boolean | null
  login: (user: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      setIsAuthenticated(window.sessionStorage.getItem(SESSION_KEY) === "1")
    } catch {
      setIsAuthenticated(false)
    }
  }, [])

  function login(user: string, password: string) {
    const ok = user.trim() === DEMO_USER && password === DEMO_PASSWORD
    if (ok) {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1")
      } catch {}
      setIsAuthenticated(true)
    }
    return ok
  }

  function logout() {
    try {
      window.sessionStorage.removeItem(SESSION_KEY)
    } catch {}
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
