"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Zap, LogIn, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, login } = useAuth()
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    if (isAuthenticated) router.replace("/")
  }, [isAuthenticated, router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (login(user, password)) {
      router.replace("/")
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
            <Zap className="size-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Patrick Batista
            </h1>
            <p className="text-sm text-muted-foreground">High Performance</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="user" className="text-foreground">
              Usuario
            </Label>
            <Input
              id="user"
              autoComplete="username"
              autoFocus
              value={user}
              onChange={(e) => {
                setUser(e.target.value)
                setError(false)
              }}
              className="bg-secondary border-border text-foreground"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-foreground">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              className="bg-secondary border-border text-foreground"
            />
          </div>

          {error && (
            <p className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="size-4" />
              Usuario ou senha invalidos
            </p>
          )}

          <Button type="submit" className="mt-2 w-full">
            <LogIn className="mr-2 size-4" />
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
