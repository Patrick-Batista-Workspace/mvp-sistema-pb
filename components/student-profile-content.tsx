"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  MessageCircle,
  Activity,
  CreditCard,
  User,
  Heart,
  Target,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  trainingHistory,
  type StudentLevel,
  type PaymentStatus,
} from "@/lib/mock-data"
import { useData } from "@/lib/data-store"

function getLevelColor(level: StudentLevel) {
  switch (level) {
    case "Pro":
      return "bg-primary/20 text-primary border-primary/30"
    case "Intermediario":
      return "bg-warning/20 text-warning border-warning/30"
    case "Iniciante":
      return "bg-sky-500/20 text-sky-400 border-sky-500/30"
  }
}

function getPaymentStatusColor(status: PaymentStatus) {
  switch (status) {
    case "Pago":
      return "bg-success/20 text-success border-success/30"
    case "Atrasado":
      return "bg-destructive/20 text-destructive border-destructive/30"
    case "Pendente":
      return "bg-warning/20 text-warning border-warning/30"
  }
}

export function StudentProfileContent() {
  const searchParams = useSearchParams()
  const studentId = searchParams.get("id") ?? ""
  const { students, payments } = useData()
  const student = students.find((s) => s.id === studentId)

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <User className="size-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">Aluno nao encontrado</p>
        <Link href="/alunos/" className="text-sm text-primary hover:underline">
          Voltar para alunos
        </Link>
      </div>
    )
  }

  const studentPayments = payments.filter((p) => p.studentId === studentId)

  return (
    <div className="flex flex-col gap-5 px-4 py-6 md:px-8 md:py-8">
      {/* Back Button */}
      <Link
        href="/alunos/"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        <span>Voltar</span>
      </Link>

      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative flex items-start gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-xl font-bold">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div>
              <h1 className="text-lg font-bold text-foreground">
                {student.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={`text-xs ${getLevelColor(student.level)}`}
                >
                  {student.level}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    student.status === "Ativo"
                      ? "bg-success/20 text-success border-success/30"
                      : "bg-destructive/20 text-destructive border-destructive/30"
                  }`}
                >
                  {student.status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <a
                href={`https://wa.me/${student.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success/20"
              >
                <MessageCircle className="size-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="relative mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Activity className="size-3.5" />
              Taxa de Presenca
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Progress value={student.attendanceRate} className="h-2 flex-1" />
              <span className="text-sm font-bold text-primary">
                {student.attendanceRate}%
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CreditCard className="size-3.5" />
              Assinatura
            </div>
            <p className="mt-2 text-sm font-bold text-foreground">
              {student.subscriptionStatus}
            </p>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="info" className="flex flex-col gap-3">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="info" className="text-xs">
            Informacoes
          </TabsTrigger>
          <TabsTrigger value="training" className="text-xs">
            Treinos
          </TabsTrigger>
          <TabsTrigger value="financial" className="text-xs">
            Financeiro
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="info">
          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Informacoes Medicas
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {student.medicalInfo}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Objetivos
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {student.goals}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Dados Pessoais
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Email</span>
                  <span className="text-xs font-medium text-foreground">
                    {student.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Modalidade
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {student.modality}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Turno</span>
                  <span className="text-xs font-medium text-foreground">
                    {student.shift}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Data de Entrada
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {new Date(student.joinDate).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Mensalidade
                  </span>
                  <span className="text-xs font-bold text-primary">
                    R$ {student.monthlyFee.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Training History Tab */}
        <TabsContent value="training">
          <div className="flex flex-col gap-3">
            {trainingHistory.map((session) => (
              <div
                key={session.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                      <Activity className="size-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {session.type}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(session.date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {session.duration}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-10">
                  {session.notes}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Financial History Tab */}
        <TabsContent value="financial">
          <div className="flex flex-col gap-3">
            {studentPayments.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center">
                <CreditCard className="size-10 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Nenhum historico financeiro
                </p>
              </div>
            ) : (
              studentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    {payment.status === "Pago" ? (
                      <CheckCircle2 className="size-4 text-success" />
                    ) : payment.status === "Atrasado" ? (
                      <AlertCircle className="size-4 text-destructive" />
                    ) : (
                      <Clock className="size-4 text-warning" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">
                        R$ {payment.amount.toLocaleString("pt-BR")}
                      </span>
                      <Badge
                        variant="outline"
                        className={`px-1.5 py-0 text-[10px] ${getPaymentStatusColor(payment.status)}`}
                      >
                        {payment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        Vencimento:{" "}
                        {new Date(payment.dueDate).toLocaleDateString("pt-BR")}
                      </span>
                      {payment.method && (
                        <span className="text-foreground/60">
                          - {payment.method}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
