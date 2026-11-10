"use client"

import { Zap, LogOut } from "lucide-react"
import { MetricsBar } from "@/components/metrics-bar"
import { NextClassesList } from "@/components/next-classes-list"
import { useData } from "@/lib/data-store"
import { useAuth } from "@/lib/auth"

export function DashboardContent() {
  const { metrics: dashboardMetrics, trainingSessions } = useData()
  const { logout } = useAuth()
  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-8 md:py-8">
      {/* Mobile Header */}
      <header className="flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="size-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-foreground">
              Patrick Batista
            </h1>
            <p className="text-xs text-muted-foreground">High Performance</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          aria-label="Sair"
        >
          <LogOut className="size-4" />
          Sair
        </button>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:block">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Painel de Controle
        </h1>
        <p className="text-sm text-muted-foreground">
          Visao geral do seu negocio
        </p>
      </header>

      <MetricsBar
        activeStudents={dashboardMetrics.activeStudents}
        totalMRR={dashboardMetrics.totalMRR}
        pendingPayments={dashboardMetrics.pendingPayments}
        dailyAttendance={dashboardMetrics.dailyAttendance}
      />

      <NextClassesList sessions={trainingSessions} />
    </div>
  )
}
