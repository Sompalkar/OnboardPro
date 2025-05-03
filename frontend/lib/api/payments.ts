import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Types
export type Payment = {
  id: string
  clientId?: string
  clientName?: string
  amount: number
  description: string
  status: "pending" | "completed" | "failed" | "refunded"
  method: "card" | "paypal" | "bank_transfer"
  last4?: string
  cardName?: string
  createdAt: string
  updatedAt: string
}

export type Invoice = {
  id: string
  clientId?: string
  clientName: string
  clientEmail: string
  dueDate: string
  notes?: string
  items: Array<{
    description: string
    quantity: number
    rate: number
  }>
  subtotal: number
  total: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  createdAt: string
  updatedAt: string
  paidAt?: string
}

// Get all payments
export const getPayments = async (): Promise<Payment[]> => {
  try {
    const response = await api.get("/payments")
    return response.data
  } catch (error) {
    console.error("Error fetching payments:", error)
    throw error
  }
}

// Get payment by ID
export const getPayment = async (id: string): Promise<Payment> => {
  try {
    const response = await api.get(`/payments/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching payment ${id}:`, error)
    throw error
  }
}

// Create payment
export const createPayment = async (paymentData: Partial<Payment>): Promise<Payment> => {
  try {
    const response = await api.post("/payments", paymentData)
    return response.data
  } catch (error) {
    console.error("Error creating payment:", error)
    throw error
  }
}

// Update payment
export const updatePayment = async (id: string, paymentData: Partial<Payment>): Promise<Payment> => {
  try {
    const response = await api.put(`/payments/${id}`, paymentData)
    return response.data
  } catch (error) {
    console.error(`Error updating payment ${id}:`, error)
    throw error
  }
}

// Delete payment
export const deletePayment = async (id: string): Promise<void> => {
  try {
    await api.delete(`/payments/${id}`)
  } catch (error) {
    console.error(`Error deleting payment ${id}:`, error)
    throw error
  }
}

// Get all invoices
export const getInvoices = async (): Promise<Invoice[]> => {
  try {
    const response = await api.get("/invoices")
    return response.data
  } catch (error) {
    console.error("Error fetching invoices:", error)
    throw error
  }
}

// Get invoice by ID
export const getInvoice = async (id: string): Promise<Invoice> => {
  try {
    const response = await api.get(`/invoices/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching invoice ${id}:`, error)
    throw error
  }
}

// Create invoice
export const createInvoice = async (invoiceData: Partial<Invoice>): Promise<Invoice> => {
  try {
    const response = await api.post("/invoices", invoiceData)
    return response.data
  } catch (error) {
    console.error("Error creating invoice:", error)
    throw error
  }
}

// Update invoice
export const updateInvoice = async (id: string, invoiceData: Partial<Invoice>): Promise<Invoice> => {
  try {
    const response = await api.put(`/invoices/${id}`, invoiceData)
    return response.data
  } catch (error) {
    console.error(`Error updating invoice ${id}:`, error)
    throw error
  }
}

// Delete invoice
export const deleteInvoice = async (id: string): Promise<void> => {
  try {
    await api.delete(`/invoices/${id}`)
  } catch (error) {
    console.error(`Error deleting invoice ${id}:`, error)
    throw error
  }
}

// Send invoice
export const sendInvoice = async (id: string, recipientEmail?: string): Promise<Invoice> => {
  try {
    const response = await api.post(`/invoices/${id}/send`, { recipientEmail })
    return response.data
  } catch (error) {
    console.error(`Error sending invoice ${id}:`, error)
    throw error
  }
}

// Mark invoice as paid
export const markInvoiceAsPaid = async (id: string): Promise<Invoice> => {
  try {
    const response = await api.post(`/invoices/${id}/mark-paid`)
    return response.data
  } catch (error) {
    console.error(`Error marking invoice ${id} as paid:`, error)
    throw error
  }
}
