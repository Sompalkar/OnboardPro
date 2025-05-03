"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart, CreditCard, FileText, Home, Settings, Users, LayoutTemplateIcon as TemplateIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function DashboardSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Templates", href: "/dashboard/templates", icon: TemplateIcon },
    { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden border-r md:block bg-white dark:bg-gray-950">
        <nav className="grid gap-2 p-4 text-sm">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/10 dark:hover:text-blue-400",
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-blue-600 dark:text-blue-400" : "")} />
                  {item.name}
                </Link>
              </motion.div>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar Content (for Sheet) */}
      <div className="md:hidden">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b p-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="font-bold">OnboardPro</span>
            </Link>
          </div>
          <nav className="grid gap-2 p-4 text-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/10 dark:hover:text-blue-400",
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-blue-600 dark:text-blue-400" : "")} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
