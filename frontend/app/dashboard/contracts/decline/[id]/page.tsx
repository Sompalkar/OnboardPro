"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { declineContract } from "@/lib/api/contracts"
import { Loader2, XCircle } from 'lucide-react'
import { motion } from "framer-motion"

export default function DeclineContractPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [reason, setReason] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [declined, setDeclined] = useState(false)

  const contractId = params.id as string

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await declineContract(contractId, reason)
      setDeclined(true)
      toast({
        title: "Document declined",
        description: "The document has been declined successfully.",
      })
    } catch (err) {
      console.error("Error declining contract:", err)
      toast({
        title: "Failed to decline document",
        description: "There was an error declining the document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (declined) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[60vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <XCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Document Declined</h2>
        <p className="text-lg text-muted-foreground mb-6">
          You have declined to sign this document. The sender has been notified.
        </p>
        <Button onClick={() => router.push("/")}>Return to Home</Button>
      </motion.div>
    )
  }

  return (
    <div className="container max-w-2xl py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Decline Document</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Reason for Declining</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Please provide a reason for declining to sign this document. This information will be shared with the sender.
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter your reason for declining..."
                    rows={5}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={submitting}
              >
                Go Back
              </Button>
              <Button 
                type="submit" 
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Confirm Decline"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
