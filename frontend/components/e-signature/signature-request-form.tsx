"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { sendSignatureRequest } from "@/lib/api/contracts"

interface SignatureRequestFormProps {
  contractId: string
  onRequestSent: () => void
}

export function SignatureRequestForm({ contractId, onRequestSent }: SignatureRequestFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    message: "Please review and sign this document at your earliest convenience.",
    expiresIn: "7" // days
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleExpiryChange = (value: string) => {
    setFormData(prev => ({ ...prev, expiresIn: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await sendSignatureRequest({
        contractId,
        recipientName: formData.recipientName,
        recipientEmail: formData.recipientEmail,
        message: formData.message,
        expiresIn: parseInt(formData.expiresIn)
      })

      toast({
        title: "Signature request sent",
        description: `Request sent to ${formData.recipientEmail}`,
      })

      onRequestSent()
    } catch (error) {
      console.error("Error sending signature request:", error)
      toast({
        title: "Failed to send request",
        description: "There was an error sending the signature request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Send for Signature</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientEmail">Recipient Email</Label>
              <Input
                id="recipientEmail"
                name="recipientEmail"
                type="email"
                value={formData.recipientEmail}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiresIn">Expires In</Label>
              <Select
                value={formData.expiresIn}
                onValueChange={handleExpiryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select expiry time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send for Signature"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}
