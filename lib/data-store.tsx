"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import {
  students as seedStudents,
  payments as seedPayments,
  trainingSessions,
  type Student,
  type Payment,
} from "@/lib/mock-data"

// Cache temporario: os dados vivem no sessionStorage do navegador e somem
// ao fechar a aba. Cada nova visita comeca com os dados de demonstracao.
const STORAGE_KEY = "pb-demo-data-v1"

interface StoredData {
  students: Student[]
  payments: Payment[]
}

export type NewStudentInput = Pick<
  Student,
  "name" | "phone" | "modality" | "level" | "shift" | "monthlyFee"
>

export interface NewPaymentInput {
  studentId: string
  amount: number
  method: NonNullable<Payment["method"]>
}

interface DataContextValue extends StoredData {
  trainingSessions: typeof trainingSessions
  metrics: {
    activeStudents: number
    totalMRR: number
    pendingPayments: number
    dailyAttendance: number
  }
  addStudent: (input: NewStudentInput) => Student
  addPayment: (input: NewPaymentInput) => Payment
  resetData: () => void
}

const DataContext = createContext<DataContextValue | null>(null)

const seed = (): StoredData => ({ students: seedStudents, payments: seedPayments })

function readStorage(): StoredData | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredData) : null
  } catch {
    return null
  }
}

function writeStorage(data: StoredData) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // storage indisponivel (aba privada etc.): segue so em memoria
  }
}

const today = () => new Date().toISOString().slice(0, 10)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<StoredData>(seed)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = readStorage()
    if (stored) setData(stored)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) writeStorage(data)
  }, [data, loaded])

  const value = useMemo<DataContextValue>(() => {
    const active = data.students.filter((s) => s.status === "Ativo")
    return {
      ...data,
      trainingSessions,
      metrics: {
        activeStudents: active.length,
        totalMRR: active.reduce((sum, s) => sum + s.monthlyFee, 0),
        pendingPayments: data.payments.filter(
          (p) => p.status === "Pendente" || p.status === "Atrasado"
        ).length,
        dailyAttendance: 6,
      },
      addStudent: (input) => {
        const student: Student = {
          ...input,
          id: `s${Date.now()}`,
          email: "-",
          status: "Ativo",
          attendanceRate: 0,
          subscriptionStatus: "Ativo",
          medicalInfo: "Nao informado",
          goals: "Nao informado",
          joinDate: today(),
        }
        setData((d) => ({ ...d, students: [...d.students, student] }))
        return student
      },
      addPayment: ({ studentId, amount, method }) => {
        const student = data.students.find((s) => s.id === studentId)
        const payment: Payment = {
          id: `p${Date.now()}`,
          studentId,
          studentName: student?.name ?? "Aluno",
          amount,
          dueDate: today(),
          paymentDate: today(),
          status: "Pago",
          method,
        }
        setData((d) => ({ ...d, payments: [payment, ...d.payments] }))
        return payment
      },
      resetData: () => setData(seed()),
    }
  }, [data])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error("useData must be used inside <DataProvider>")
  return ctx
}
