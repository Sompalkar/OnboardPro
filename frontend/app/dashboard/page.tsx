"use client"
import { BarChart, Calendar, CreditCard, Download, FileText, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Contracts</CardTitle>
                  <FileText className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">-2 from last week</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$4,325</div>
                  <p className="text-xs text-muted-foreground">+20% from last month</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.4 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
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
                    <div className="mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-blue-500">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Follow up with Sarah Williams</p>
                      <p className="text-xs text-muted-foreground">Due today</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-blue-500">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Send invoice to Alex Johnson</p>
                      <p className="text-xs text-muted-foreground">Due tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-blue-500">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
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
                <BarChart className="h-16 w-16 mx-auto text-blue-500" />
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
    </div>
  )
}
