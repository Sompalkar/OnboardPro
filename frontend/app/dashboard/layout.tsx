"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ToastContainer } from "@/components/toast-container"
import { getCurrentUser } from "@/lib/api/auth"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
          return
        }

        // Verify token by fetching current user
        const userData = await getCurrentUser()
        setUser(userData)

        // Store user data in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userData))
      } catch (error) {
        console.error("Authentication error:", error)
        // Token is invalid or expired
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // This should not happen as we redirect in the useEffect
  }

  return (
    <motion.div
      className="flex min-h-screen flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DashboardHeader user={user} />
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <DashboardSidebar />
        <main className="flex flex-1 flex-col">
          {children}
          <ToastContainer />
        </main>
      </div>
    </motion.div>
  )
}
