"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, DollarSign, User, Zap, LogOut, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth"
import { useData } from "@/lib/data-store"

const navItems = [
  { href: "/", label: "Painel", icon: LayoutDashboard },
  { href: "/alunos", label: "Alunos", icon: Users },
  { href: "/financeiro", label: "Financeiro", icon: DollarSign },
  { href: "/perfil/?id=1", label: "Perfil", icon: User },
]

export function DesktopSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const { resetData } = useData()

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-border bg-card/60 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
          <Zap className="size-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-foreground">Patrick Batista</h1>
          <p className="text-xs text-muted-foreground">High Performance</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href.split("?")[0])
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="flex flex-col gap-1 border-t border-border px-3 py-4">
        <button onClick={resetData} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <RotateCcw className="size-5" />
          <span>Restaurar dados demo</span>
        </button>
        <button onClick={logout} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <LogOut className="size-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
}
