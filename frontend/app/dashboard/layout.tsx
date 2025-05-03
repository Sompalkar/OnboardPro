"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  Bell,
  FileText,
  Home,
  Menu,
  User,
  Users,
  LayoutTemplateIcon as TemplateIcon,
  CreditCard,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ToastContainer } from "@/components/toast-container"
import { logoutUser } from "@/lib/api/auth"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }

    try {
      setUser(JSON.parse(storedUser))
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    logoutUser()
    router.push("/login")
  }

  if (!user) {
    return null // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <FileText className="h-5 w-5" />
                <span className="font-bold">OnboardPro</span>
              </Link>
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  pathname === "/dashboard"
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/clients"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  pathname?.includes("/dashboard/clients")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Users className="h-5 w-5" />
                Clients
              </Link>
              <Link
                href="/dashboard/templates"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  pathname?.includes("/dashboard/templates")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <TemplateIcon className="h-5 w-5" />
                Templates
              </Link>
              <Link
                href="/dashboard/payments"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  pathname?.includes("/dashboard/payments")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <CreditCard className="h-5 w-5" />
                Payments
              </Link>
              <Link
                href="/dashboard/analytics"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  pathname?.includes("/dashboard/analytics")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <BarChart className="h-5 w-5" />
                Analytics
              </Link>
              <Link
                href="/dashboard/settings"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  pathname?.includes("/dashboard/settings")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                onClick={() => {
                  setIsMobileNavOpen(false)
                  handleLogout()
                }}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <FileText className="h-5 w-5" />
          <span className="font-bold">OnboardPro</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <User className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">{user.name}</span>
          </Button>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium ${
                pathname === "/dashboard"
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/clients"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium ${
                pathname?.includes("/dashboard/clients")
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
            >
              <Users className="h-4 w-4" />
              Clients
            </Link>
            <Link
              href="/dashboard/templates"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium ${
                pathname?.includes("/dashboard/templates")
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
            >
              <TemplateIcon className="h-4 w-4" />
              Templates
            </Link>
            <Link
              href="/dashboard/payments"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium ${
                pathname?.includes("/dashboard/payments")
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Payments
            </Link>
            <Link
              href="/dashboard/analytics"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium ${
                pathname?.includes("/dashboard/analytics")
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
            >
              <BarChart className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium ${
                pathname?.includes("/dashboard/settings")
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
        </aside>
        <main className="flex flex-1 flex-col">
          {children}
          <ToastContainer />
        </main>
      </div>
    </div>
  )
}
