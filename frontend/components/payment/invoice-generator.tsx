"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Loader2, Plus, Trash2, Download, Send } from "lucide-react"
import { createInvoice } from "@/lib/api/payments"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
}

interface InvoiceGeneratorProps {
  clientId?: string
  clientName?: string
  onSuccess: (invoiceId: string) => void
}

export function InvoiceGenerator({ clientId, clientName, onSuccess }: InvoiceGeneratorProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [invoiceData, setInvoiceData] = useState({
    clientName: clientName || "",
    clientEmail: "",
    dueDate: "",
    notes: "",
  })
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: `item-${Date.now()}`, description: "", quantity: 1, rate: 0 },
  ])

  const handleInvoiceDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInvoiceData((prev) => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const addItem = () => {
    setItems((prev) => [...prev, { id: `item-${Date.now()}`, description: "", quantity: 1, rate: 0 }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    // Add tax or other calculations here if needed
    return subtotal
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const invoiceItems = items.filter((item) => item.description.trim() !== "")

      if (invoiceItems.length === 0) {
        toast({
          title: "No items added",
          description: "Please add at least one item to the invoice.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const invoicePayload = {
        clientId,
        clientName: invoiceData.clientName,
        clientEmail: invoiceData.clientEmail,
        dueDate: invoiceData.dueDate,
        notes: invoiceData.notes,
        items: invoiceItems,
        subtotal: calculateSubtotal(),
        total: calculateTotal(),
      }

      const response = await createInvoice(invoicePayload)

      toast({
        title: "Invoice created",
        description: "The invoice has been created successfully.",
      })

      onSuccess(response.id)
    } catch (error) {
      console.error("Invoice creation error:", error)
      toast({
        title: "Failed to create invoice",
        description: "There was an error creating the invoice. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader>
          <CardTitle>Create Invoice</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={invoiceData.clientName}
                  onChange={handleInvoiceDataChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  value={invoiceData.clientEmail}
                  onChange={handleInvoiceDataChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={handleInvoiceDataChange}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Invoice Items</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem} className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Item
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-5">
                      <Label htmlFor={`item-desc-${index}`} className="sr-only">
                        Description
                      </Label>
                      <Input
                        id={`item-desc-${index}`}
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor={`item-qty-${index}`} className="sr-only">
                        Quantity
                      </Label>
                      <Input
                        id={`item-qty-${index}`}
                        type="number"
                        placeholder="Qty"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor={`item-rate-${index}`} className="sr-only">
                        Rate
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <Input
                          id={`item-rate-${index}`}
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="pl-7"
                          value={item.rate}
                          onChange={(e) => handleItemChange(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-between items-center">
                      <span className="text-sm font-medium">${(item.quantity * item.rate).toFixed(2)}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length <= 1}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-2">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Additional notes or payment instructions..."
                value={invoiceData.notes}
                onChange={handleInvoiceDataChange}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" disabled={isLoading}>
              <Download className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Create Invoice
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}
