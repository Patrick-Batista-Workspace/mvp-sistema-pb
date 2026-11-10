"use client"

import { useState } from "react"
import {
  DollarSign,
  Search,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { type Payment, type PaymentStatus, type PaymentMethod } from "@/lib/mock-data"
import { useData } from "@/lib/data-store"

function getPaymentStatusStyle(status: PaymentStatus) {
  switch (status) {
    case "Pago":
      return {
        badge: "bg-success/20 text-success border-success/30",
        icon: CheckCircle2,
      }
    case "Atrasado":
      return {
        badge: "bg-destructive/20 text-destructive border-destructive/30",
        icon: AlertCircle,
      }
    case "Pendente":
      return {
        badge: "bg-warning/20 text-warning border-warning/30",
        icon: Clock,
      }
  }
}

export function FinancialContent() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const { payments, students, addPayment } = useData()
  const [studentId, setStudentId] = useState("")
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("")
  const canConfirm = Boolean(studentId && Number(amount) > 0 && method)

  function handleSelectStudent(id: string) {
    setStudentId(id)
    const fee = students.find((s) => s.id === id)?.monthlyFee
    if (fee) setAmount(String(fee))
  }

  function handleConfirm() {
    if (!canConfirm) return
    addPayment({ studentId, amount: Number(amount), method: method as PaymentMethod })
    setStudentId("")
    setAmount("")
    setMethod("")
    setShowPaymentModal(false)
  }

  const filtered = payments.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter
    const matchesSearch = p.studentName
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalReceived = payments
    .filter((p) => p.status === "Pago")
    .reduce((s, p) => s + p.amount, 0)
  const totalPending = payments
    .filter((p) => p.status === "Pendente" || p.status === "Atrasado")
    .reduce((s, p) => s + p.amount, 0)

  return (
    <div className="flex flex-col gap-5 px-4 py-6 md:px-8 md:py-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Financeiro
        </h1>
        <p className="text-sm text-muted-foreground">
          Controle de pagamentos e recebiveis
        </p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Recebido
          </span>
          <p className="mt-1 text-xl font-bold text-success">
            R$ {totalReceived.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            A Receber
          </span>
          <p className="mt-1 text-xl font-bold text-warning">
            R$ {totalPending.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por aluno..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["all", "Pago", "Pendente", "Atrasado"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {s === "all" ? "Todos" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Payment List */}
      <div className="flex flex-col gap-3">
        {filtered.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <DollarSign className="size-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Nenhum pagamento encontrado
            </p>
          </div>
        )}
      </div>

      {/* Register Payment Button */}
      <Button
        onClick={() => setShowPaymentModal(true)}
        className="fixed bottom-20 right-4 z-40 h-14 w-14 rounded-full shadow-lg shadow-primary/25 md:static md:h-auto md:w-auto md:rounded-lg md:shadow-none"
      >
        <DollarSign className="size-5 md:mr-2" />
        <span className="sr-only md:not-sr-only">Registrar Pagamento</span>
      </Button>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Registrar Pagamento
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Aluno</Label>
              <Select value={studentId} onValueChange={handleSelectStudent}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder="Buscar aluno..." />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Valor (R$)</Label>
              <Input
                type="number"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Metodo de Pagamento</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pix">Pix</SelectItem>
                  <SelectItem value="Cartao">Cartao</SelectItem>
                  <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Comprovante</Label>
              <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/50 p-6 transition-colors hover:border-primary/30">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Upload className="size-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Arraste ou clique para enviar
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentModal(false)}
              className="border-border text-muted-foreground"
            >
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={!canConfirm}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PaymentCard({ payment }: { payment: Payment }) {
  const style = getPaymentStatusStyle(payment.status)
  const StatusIcon = style.icon

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
        <StatusIcon className={`size-4 ${
          payment.status === "Pago" ? "text-success" :
          payment.status === "Atrasado" ? "text-destructive" :
          "text-warning"
        }`} />
      </div>
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <span className="truncate text-sm font-semibold text-foreground">
          {payment.studentName}
        </span>
        <span className="text-xs text-muted-foreground">
          Vencimento: {new Date(payment.dueDate).toLocaleDateString("pt-BR")}
        </span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-bold text-foreground">
          R$ {payment.amount.toLocaleString("pt-BR")}
        </span>
        <Badge
          variant="outline"
          className={`px-1.5 py-0 text-[10px] ${style.badge}`}
        >
          {payment.status}
        </Badge>
      </div>
    </div>
  )
}
