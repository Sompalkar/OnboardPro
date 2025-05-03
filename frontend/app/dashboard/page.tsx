"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart,
  Bell,
  Calendar,
  CreditCard,
  Download,
  FileText,
  Home,
  Menu,
  Plus,
  Settings,
  User,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

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
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/clients"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Users className="h-5 w-5" />
                Clients
              </Link>
              <Link
                href="/dashboard/templates"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <FileText className="h-5 w-5" />
                Templates
              </Link>
              <Link
                href="/dashboard/payments"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <CreditCard className="h-5 w-5" />
                Payments
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <BarChart className="h-5 w-5" />
                Analytics
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
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
            <span className="hidden md:inline">Account</span>
          </Button>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 font-medium transition-all hover:text-gray-900 dark:bg-gray-800 dark:hover:text-gray-50"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/clients"
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Users className="h-4 w-4" />
              Clients
            </Link>
            <Link
              href="/dashboard/templates"
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <FileText className="h-4 w-4" />
              Templates
            </Link>
            <Link
              href="/dashboard/payments"
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <CreditCard className="h-4 w-4" />
              Payments
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <BarChart className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
            <Button size="sm" className="ml-auto gap-1">
              <Plus className="h-4 w-4" />
              New Client
            </Button>
          </div>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Contracts</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">-2 from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$4,325</div>
                    <p className="text-xs text-muted-foreground">+20% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Contract signed by Alex Johnson</p>
                          <p className="text-xs text-muted-foreground">Website Redesign Project</p>
                        </div>
                        <div className="text-xs text-muted-foreground">2h ago</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Payment received from Sarah Williams</p>
                          <p className="text-xs text-muted-foreground">Logo Design Project</p>
                        </div>
                        <div className="text-xs text-muted-foreground">5h ago</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Contract sent to Michael Brown</p>
                          <p className="text-xs text-muted-foreground">SEO Consultation</p>
                        </div>
                        <div className="text-xs text-muted-foreground">1d ago</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New client added: Tech Solutions Inc.</p>
                          <p className="text-xs text-muted-foreground">Mobile App Development</p>
                        </div>
                        <div className="text-xs text-muted-foreground">2d ago</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full border">
                          <X className="h-3 w-3" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Follow up with Sarah Williams</p>
                          <p className="text-xs text-muted-foreground">Due today</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full border">
                          <X className="h-3 w-3" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Send invoice to Alex Johnson</p>
                          <p className="text-xs text-muted-foreground">Due tomorrow</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full border">
                          <X className="h-3 w-3" />
                        </div>
                        <div className="space-y-1">
                          <p />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Create proposal for Tech Solutions Inc.</p>
                          <p className="text-xs text-muted-foreground">Due in 3 days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Your revenue trends over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Analytics visualization would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Monthly Reports</CardTitle>
                    <CardDescription>Download your business reports</CardDescription>
                  </div>
                  <Button size="sm" className="ml-auto gap-1">
                    <Download className="h-4 w-4" />
                    Download All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">April 2023 Report</p>
                        <p className="text-sm text-muted-foreground">PDF • 2.4MB</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">March 2023 Report</p>
                        <p className="text-sm text-muted-foreground">PDF • 3.1MB</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">February 2023 Report</p>
                        <p className="text-sm text-muted-foreground">PDF • 2.8MB</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
