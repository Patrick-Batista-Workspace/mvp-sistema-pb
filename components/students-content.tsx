"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  MessageCircle,
  Filter,
  X,
  User as UserIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { type Student, type StudentLevel } from "@/lib/mock-data"
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

function getStatusColor(status: string) {
  return status === "Ativo"
    ? "bg-success/20 text-success border-success/30"
    : "bg-destructive/20 text-destructive border-destructive/30"
}

export function StudentsContent() {
  const [search, setSearch] = useState("")
  const [shiftFilter, setShiftFilter] = useState("all")
  const [modalityFilter, setModalityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [showNewStudent, setShowNewStudent] = useState(false)
  const { students, addStudent } = useData()
  const emptyForm = { name: "", phone: "", modality: "", level: "", shift: "", monthlyFee: "" }
  const [form, setForm] = useState(emptyForm)
  const setField = (k: keyof typeof emptyForm) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }))
  const canSubmit = Boolean(form.name.trim() && form.modality && form.level && form.shift)

  function handleCreate() {
    if (!canSubmit) return
    const digits = form.phone.replace(/\D/g, "")
    addStudent({
      name: form.name.trim(),
      phone: digits && !digits.startsWith("55") ? `55${digits}` : digits,
      modality: form.modality,
      level: form.level as StudentLevel,
      shift: form.shift,
      monthlyFee: Number(form.monthlyFee) || 0,
    })
    setForm(emptyForm)
    setShowNewStudent(false)
  }

  const filtered = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchesShift = shiftFilter === "all" || s.shift === shiftFilter
    const matchesModality =
      modalityFilter === "all" || s.modality === modalityFilter
    const matchesStatus = statusFilter === "all" || s.status === statusFilter
    return matchesSearch && matchesShift && matchesModality && matchesStatus
  })

  const hasActiveFilters =
    shiftFilter !== "all" || modalityFilter !== "all" || statusFilter !== "all"

  function clearFilters() {
    setShiftFilter("all")
    setModalityFilter("all")
    setStatusFilter("all")
  }

  return (
    <div className="flex flex-col gap-5 px-4 py-6 md:px-8 md:py-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Alunos
        </h1>
        <p className="text-sm text-muted-foreground">
          Gerencie seus alunos e informacoes
        </p>
      </header>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={
              hasActiveFilters
                ? "border-primary text-primary"
                : "border-border text-muted-foreground"
            }
          >
            <Filter className="size-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
            <Select value={shiftFilter} onValueChange={setShiftFilter}>
              <SelectTrigger className="h-8 w-auto min-w-28 gap-1 border-border bg-secondary text-secondary-foreground text-xs">
                <SelectValue placeholder="Turno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Turnos</SelectItem>
                <SelectItem value="Manha">Manha</SelectItem>
                <SelectItem value="Tarde">Tarde</SelectItem>
                <SelectItem value="Noite">Noite</SelectItem>
              </SelectContent>
            </Select>
            <Select value={modalityFilter} onValueChange={setModalityFilter}>
              <SelectTrigger className="h-8 w-auto min-w-28 gap-1 border-border bg-secondary text-secondary-foreground text-xs">
                <SelectValue placeholder="Modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Modalidades</SelectItem>
                <SelectItem value="Corrida">Corrida</SelectItem>
                <SelectItem value="Triathlon">Triathlon</SelectItem>
                <SelectItem value="Natacao">Natacao</SelectItem>
                <SelectItem value="Ciclismo">Ciclismo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-auto min-w-28 gap-1 border-border bg-secondary text-secondary-foreground text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 text-xs text-muted-foreground"
              >
                <X className="mr-1 size-3" />
                Limpar
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Student Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <UserIcon className="size-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Nenhum aluno encontrado
            </p>
          </div>
        )}
      </div>

      {/* FAB - New Student */}
      <button
        onClick={() => setShowNewStudent(true)}
        className="fixed bottom-20 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
        aria-label="Adicionar novo aluno"
      >
        <Plus className="size-6" />
      </button>

      {/* New Student Modal */}
      <Dialog open={showNewStudent} onOpenChange={setShowNewStudent}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">Novo Aluno</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Nome completo</Label>
              <Input
                placeholder="Ex: Joao da Silva"
                value={form.name}
                onChange={(e) => setField("name")(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Telefone (WhatsApp)</Label>
              <Input
                placeholder="(11) 99999-0000"
                value={form.phone}
                onChange={(e) => setField("phone")(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Modalidade</Label>
                <Select value={form.modality} onValueChange={setField("modality")}>
                  <SelectTrigger className="bg-secondary border-border text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corrida">Corrida</SelectItem>
                    <SelectItem value="Triathlon">Triathlon</SelectItem>
                    <SelectItem value="Natacao">Natacao</SelectItem>
                    <SelectItem value="Ciclismo">Ciclismo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Nivel</Label>
                <Select value={form.level} onValueChange={setField("level")}>
                  <SelectTrigger className="bg-secondary border-border text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Iniciante">Iniciante</SelectItem>
                    <SelectItem value="Intermediario">Intermediario</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Turno</Label>
              <Select value={form.shift} onValueChange={setField("shift")}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manha">Manha</SelectItem>
                  <SelectItem value="Tarde">Tarde</SelectItem>
                  <SelectItem value="Noite">Noite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Mensalidade (R$)</Label>
              <Input
                type="number"
                placeholder="0"
                value={form.monthlyFee}
                onChange={(e) => setField("monthlyFee")(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewStudent(false)}
              className="border-border text-muted-foreground"
            >
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={!canSubmit}>
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StudentCard({ student }: { student: Student }) {
  return (
    <Link href={`/perfil/?id=${student.id}`}>
      <div className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
          <span className="text-sm font-bold">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-foreground">
              {student.name}
            </span>
            <Badge
              variant="outline"
              className={`shrink-0 px-1.5 py-0 text-[10px] ${getStatusColor(student.status)}`}
            >
              {student.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`px-1.5 py-0 text-[10px] ${getLevelColor(student.level)}`}
            >
              {student.level}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {student.modality} - {student.shift}
            </span>
          </div>
        </div>
        <a
          href={`https://wa.me/${student.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success transition-colors hover:bg-success/20"
          aria-label={`Enviar mensagem para ${student.name}`}
        >
          <MessageCircle className="size-4" />
        </a>
      </div>
    </Link>
  )
}
