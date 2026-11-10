import { Suspense } from "react"
import { AppShell } from "@/components/app-shell"
import { StudentProfileContent } from "@/components/student-profile-content"

export default function PerfilPage() {
  return (
    <AppShell>
      <Suspense>
        <StudentProfileContent />
      </Suspense>
    </AppShell>
  )
}
