"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { useAuth } from "@/lib/auth"

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated === false) router.replace("/login")
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar />
      <main className="pb-20 md:pb-0 md:pl-64">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
