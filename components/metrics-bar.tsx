"use client"

import { Users, DollarSign, AlertCircle, CalendarCheck } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  accent?: boolean
}

function MetricCard({ title, value, icon: Icon, accent }: MetricCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="relative flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
          <span
            className={`text-2xl font-bold tracking-tight ${
              accent ? "text-primary" : "text-foreground"
            }`}
          >
            {value}
          </span>
        </div>
        <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
      </div>
    </div>
  )
}

interface MetricsBarProps {
  activeStudents: number
  totalMRR: number
  pendingPayments: number
  dailyAttendance: number
}

export function MetricsBar({
  activeStudents,
  totalMRR,
  pendingPayments,
  dailyAttendance,
}: MetricsBarProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <MetricCard
        title="Alunos Ativos"
        value={activeStudents}
        icon={Users}
        accent
      />
      <MetricCard
        title="MRR Total"
        value={`R$ ${totalMRR.toLocaleString("pt-BR")}`}
        icon={DollarSign}
      />
      <MetricCard
        title="Pgtos. Pendentes"
        value={pendingPayments}
        icon={AlertCircle}
      />
      <MetricCard
        title="Presenca Hoje"
        value={dailyAttendance}
        icon={CalendarCheck}
      />
    </div>
  )
}
