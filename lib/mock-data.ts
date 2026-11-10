export type StudentLevel = "Pro" | "Intermediario" | "Iniciante"
export type PaymentStatus = "Pago" | "Pendente" | "Atrasado"
export type StudentStatus = "Ativo" | "Inativo"
export type PaymentMethod = "Pix" | "Cartao" | "Dinheiro"

export interface Student {
  id: string
  name: string
  email: string
  phone: string
  level: StudentLevel
  status: StudentStatus
  modality: string
  shift: string
  attendanceRate: number
  subscriptionStatus: string
  medicalInfo: string
  goals: string
  joinDate: string
  monthlyFee: number
}

export interface Payment {
  id: string
  studentId: string
  studentName: string
  amount: number
  dueDate: string
  paymentDate?: string
  status: PaymentStatus
  method?: PaymentMethod
  receiptUrl?: string
}

export interface TrainingSession {
  id: string
  name: string
  time: string
  date: string
  students: { id: string; name: string; level: StudentLevel }[]
}

export interface TrainingHistory {
  id: string
  date: string
  type: string
  duration: string
  notes: string
}

export const students: Student[] = [
  {
    id: "1",
    name: "Lucas Ferreira",
    email: "lucas@email.com",
    phone: "5511999001001",
    level: "Pro",
    status: "Ativo",
    modality: "Corrida",
    shift: "Manha",
    attendanceRate: 92,
    subscriptionStatus: "Ativo",
    medicalInfo: "Sem restricoes",
    goals: "Maratona sub-3h",
    joinDate: "2024-03-15",
    monthlyFee: 350,
  },
  {
    id: "2",
    name: "Ana Carolina Santos",
    email: "ana@email.com",
    phone: "5511999002002",
    level: "Intermediario",
    status: "Ativo",
    modality: "Triathlon",
    shift: "Manha",
    attendanceRate: 88,
    subscriptionStatus: "Ativo",
    medicalInfo: "Asma leve controlada",
    goals: "Completar primeiro Ironman 70.3",
    joinDate: "2024-06-01",
    monthlyFee: 400,
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    phone: "5511999003003",
    level: "Iniciante",
    status: "Ativo",
    modality: "Corrida",
    shift: "Tarde",
    attendanceRate: 75,
    subscriptionStatus: "Ativo",
    medicalInfo: "Sem restricoes",
    goals: "Completar primeira meia-maratona",
    joinDate: "2025-01-10",
    monthlyFee: 300,
  },
  {
    id: "4",
    name: "Mariana Costa",
    email: "mariana@email.com",
    phone: "5511999004004",
    level: "Pro",
    status: "Ativo",
    modality: "Natacao",
    shift: "Manha",
    attendanceRate: 95,
    subscriptionStatus: "Ativo",
    medicalInfo: "Sem restricoes",
    goals: "Classificacao para campeonato estadual",
    joinDate: "2023-08-20",
    monthlyFee: 380,
  },
  {
    id: "5",
    name: "Rafael Mendes",
    email: "rafael@email.com",
    phone: "5511999005005",
    level: "Intermediario",
    status: "Inativo",
    modality: "Corrida",
    shift: "Noite",
    attendanceRate: 45,
    subscriptionStatus: "Suspenso",
    medicalInfo: "Lesao no joelho (em recuperacao)",
    goals: "Retorno apos reabilitacao",
    joinDate: "2024-02-01",
    monthlyFee: 300,
  },
  {
    id: "6",
    name: "Camila Rodrigues",
    email: "camila@email.com",
    phone: "5511999006006",
    level: "Iniciante",
    status: "Ativo",
    modality: "Triathlon",
    shift: "Tarde",
    attendanceRate: 82,
    subscriptionStatus: "Ativo",
    medicalInfo: "Sem restricoes",
    goals: "Perda de peso e condicionamento",
    joinDate: "2025-02-01",
    monthlyFee: 350,
  },
  {
    id: "7",
    name: "Thiago Almeida",
    email: "thiago@email.com",
    phone: "5511999007007",
    level: "Pro",
    status: "Ativo",
    modality: "Ciclismo",
    shift: "Manha",
    attendanceRate: 90,
    subscriptionStatus: "Ativo",
    medicalInfo: "Sem restricoes",
    goals: "Campeonato de MTB",
    joinDate: "2023-11-15",
    monthlyFee: 380,
  },
  {
    id: "8",
    name: "Juliana Martins",
    email: "juliana@email.com",
    phone: "5511999008008",
    level: "Intermediario",
    status: "Ativo",
    modality: "Corrida",
    shift: "Noite",
    attendanceRate: 78,
    subscriptionStatus: "Ativo",
    medicalInfo: "Sem restricoes",
    goals: "10km abaixo de 45min",
    joinDate: "2024-09-01",
    monthlyFee: 300,
  },
]

export const payments: Payment[] = [
  { id: "p1", studentId: "1", studentName: "Lucas Ferreira", amount: 350, dueDate: "2026-02-10", paymentDate: "2026-02-08", status: "Pago", method: "Pix" },
  { id: "p2", studentId: "2", studentName: "Ana Carolina Santos", amount: 400, dueDate: "2026-02-10", paymentDate: "2026-02-10", status: "Pago", method: "Cartao" },
  { id: "p3", studentId: "3", studentName: "Pedro Oliveira", amount: 300, dueDate: "2026-02-10", status: "Pendente" },
  { id: "p4", studentId: "4", studentName: "Mariana Costa", amount: 380, dueDate: "2026-02-10", paymentDate: "2026-02-05", status: "Pago", method: "Pix" },
  { id: "p5", studentId: "5", studentName: "Rafael Mendes", amount: 300, dueDate: "2026-01-10", status: "Atrasado" },
  { id: "p6", studentId: "6", studentName: "Camila Rodrigues", amount: 350, dueDate: "2026-02-10", status: "Pendente" },
  { id: "p7", studentId: "7", studentName: "Thiago Almeida", amount: 380, dueDate: "2026-02-10", paymentDate: "2026-02-09", status: "Pago", method: "Dinheiro" },
  { id: "p8", studentId: "8", studentName: "Juliana Martins", amount: 300, dueDate: "2026-02-10", status: "Pendente" },
]

export const trainingSessions: TrainingSession[] = [
  {
    id: "t1",
    name: "Treino de Velocidade",
    time: "06:30",
    date: "2026-02-24",
    students: [
      { id: "1", name: "Lucas Ferreira", level: "Pro" },
      { id: "4", name: "Mariana Costa", level: "Pro" },
      { id: "7", name: "Thiago Almeida", level: "Pro" },
    ],
  },
  {
    id: "t2",
    name: "Treino de Resistencia",
    time: "08:00",
    date: "2026-02-24",
    students: [
      { id: "2", name: "Ana Carolina Santos", level: "Intermediario" },
      { id: "8", name: "Juliana Martins", level: "Intermediario" },
    ],
  },
  {
    id: "t3",
    name: "Treino Funcional",
    time: "15:00",
    date: "2026-02-24",
    students: [
      { id: "3", name: "Pedro Oliveira", level: "Iniciante" },
      { id: "6", name: "Camila Rodrigues", level: "Iniciante" },
    ],
  },
  {
    id: "t4",
    name: "Treino de Longa Distancia",
    time: "17:30",
    date: "2026-02-24",
    students: [
      { id: "8", name: "Juliana Martins", level: "Intermediario" },
    ],
  },
]

export const trainingHistory: TrainingHistory[] = [
  { id: "h1", date: "2026-02-22", type: "Intervalado", duration: "1h15min", notes: "8x400m com recuperacao de 90s" },
  { id: "h2", date: "2026-02-20", type: "Longa Distancia", duration: "1h45min", notes: "18km em ritmo moderado" },
  { id: "h3", date: "2026-02-18", type: "Funcional", duration: "50min", notes: "Circuito de forca e mobilidade" },
  { id: "h4", date: "2026-02-15", type: "Velocidade", duration: "1h", notes: "6x200m + 4x100m" },
  { id: "h5", date: "2026-02-13", type: "Regenerativo", duration: "40min", notes: "Trote leve e alongamento" },
]

export const dashboardMetrics = {
  activeStudents: students.filter((s) => s.status === "Ativo").length,
  totalMRR: students.filter((s) => s.status === "Ativo").reduce((sum, s) => sum + s.monthlyFee, 0),
  pendingPayments: payments.filter((p) => p.status === "Pendente" || p.status === "Atrasado").length,
  dailyAttendance: 6,
}
