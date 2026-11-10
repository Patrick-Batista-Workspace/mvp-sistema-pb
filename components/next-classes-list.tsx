"use client"

import { Clock, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { TrainingSession, StudentLevel } from "@/lib/mock-data"

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

interface NextClassesListProps {
  sessions: TrainingSession[]
}

export function NextClassesList({ sessions }: NextClassesListProps) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          Proximos Treinos
        </h2>
        <span className="text-xs font-medium text-muted-foreground">Hoje</span>
      </div>
      <div className="flex flex-col gap-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                    <Clock className="size-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {session.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {session.time}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {session.students.map((student) => (
                    <span
                      key={student.id}
                      className="flex items-center gap-1"
                    >
                      <span className="text-xs text-foreground/80">
                        {student.name}
                      </span>
                      <Badge
                        variant="outline"
                        className={`px-1.5 py-0 text-[10px] ${getLevelColor(student.level)}`}
                      >
                        {student.level}
                      </Badge>
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
