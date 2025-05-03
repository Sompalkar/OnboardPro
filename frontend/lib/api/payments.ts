import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Types
export type Payment = {
  _id: string
  client:
    | string
    | {
        _id: string
        name: string
        email: string
        company?: string
      }
  contract?:
    | string
    | {
        _id: string
        title: string
      }
  amount: number
  currency: string
  description?: string
  status: "pending" | "paid" | "failed" | "refunded"
  paymentMethod: "stripe" | "paypal" | "other"
  transactionId?: string
  invoiceUrl?: string
  dueDate?: string
  paidAt?: string
  createdAt: string
  updatedAt: string
}

export type PaymentFormData = {
  clientId: string
  contractId?: string
  amount: number
  currency: string
  description?: string
  paymentMethod: "stripe" | "paypal" | "other"
  dueDate?: string
}

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

// Get all payments
export const getPayments = async (): Promise<Payment[]> => {
  try {
    const response = await api.get("/payments")
    return response.data
  } catch (error) {
    console.error("Get payments error:", error)
    throw error
  }
}

// Get payment by ID
export const getPaymentById = async (id: string): Promise<Payment> => {
  try {
    const response = await api.get(`/payments/${id}`)
    return response.data
  } catch (error) {
    console.error("Get payment error:", error)
    throw error
  }
}

// Create payment request
export const createPayment = async (data: PaymentFormData): Promise<Payment> => {
  try {
    const response = await api.post("/payments", data)
    return response.data
  } catch (error) {
    console.error("Create payment error:", error)
    throw error
  }
}

// Get payments by status
export const getPaymentsByStatus = async (status: Payment["status"]): Promise<Payment[]> => {
  try {
    const response = await api.get(`/payments/status/${status}`)
    return response.data
  } catch (error) {
    console.error("Get payments by status error:", error)
    throw error
  }
}

// Get payments by client
export const getPaymentsByClient = async (clientId: string): Promise<Payment[]> => {
  try {
    const response = await api.get(`/payments/client/${clientId}`)
    return response.data
  } catch (error) {
    console.error("Get payments by client error:", error)
    throw error
  }
}
