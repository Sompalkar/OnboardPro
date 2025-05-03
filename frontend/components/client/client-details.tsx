"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Edit, Trash2, Mail, Phone, Building, MapPin, FileText, CreditCard } from "lucide-react"
import { deleteClient } from "@/lib/api/clients"
import { useRouter } from "next/navigation"

interface ClientDetailsProps {
  client: any
  onEdit: () => void
}

export function ClientDetails({ client, onEdit }: ClientDetailsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this client? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteClient(client.id)
      toast({
        title: "Client deleted",
        description: "Client has been deleted successfully.",
      })
      router.push("/dashboard/clients")
    } catch (error) {
      console.error("Error deleting client:", error)
      toast({
        title: "Failed to delete client",
        description: "There was an error deleting the client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{client.name}</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{client.phone || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm text-muted-foreground">{client.company || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{client.address || "Not provided"}</p>
                  </div>
                </div>
              </div>

              {client.notes && (
                <div className="pt-2">
                  <p className="text-sm font-medium mb-1">Notes</p>
                  <p className="text-sm text-muted-foreground">{client.notes}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="projects" className="pt-4">
              <div className="space-y-4">
                {client.projects && client.projects.length > 0 ? (
                  client.projects.map((project: any) => (
                    <Card key={project.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.status}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                          >
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <h3 className="text-lg font-medium">No projects yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">This client doesn't have any projects yet.</p>
                    <Button onClick={() => router.push("/dashboard/projects/create")}>Create Project</Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="payments" className="pt-4">
              <div className="space-y-4">
                {client.payments && client.payments.length > 0 ? (
                  client.payments.map((payment: any) => (
                    <Card key={payment.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">${payment.amount.toFixed(2)}</h4>
                            <p className="text-sm text-muted-foreground">{payment.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              payment.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : payment.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <h3 className="text-lg font-medium">No payments yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">This client doesn't have any payments yet.</p>
                    <Button onClick={() => router.push("/dashboard/payments/create")}>Create Invoice</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={() => router.push("/dashboard/clients")}>
            Back to Clients
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
