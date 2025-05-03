import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Types
export type Client = {
  _id: string
  name: string
  email: string
  phone?: string
  company?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  status: "active" | "inactive" | "pending"
  notes?: string
  createdAt: string
  updatedAt: string
}

export type ClientFormData = Omit<Client, "_id" | "createdAt" | "updatedAt">

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

// Get all clients
export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await api.get("/clients")
    return response.data
  } catch (error) {
    console.error("Get clients error:", error)
    throw error
  }
}

// Get client by ID
export const getClientById = async (id: string): Promise<Client> => {
  try {
    const response = await api.get(`/clients/${id}`)
    return response.data
  } catch (error) {
    console.error("Get client error:", error)
    throw error
  }
}

// Create client
export const createClient = async (data: ClientFormData): Promise<Client> => {
  try {
    const response = await api.post("/clients", data)
    return response.data
  } catch (error) {
    console.error("Create client error:", error)
    throw error
  }
}

// Update client
export const updateClient = async (id: string, data: Partial<ClientFormData>): Promise<Client> => {
  try {
    const response = await api.put(`/clients/${id}`, data)
    return response.data
  } catch (error) {
    console.error("Update client error:", error)
    throw error
  }
}

// Delete client
export const deleteClient = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/clients/${id}`)
    return response.data
  } catch (error) {
    console.error("Delete client error:", error)
    throw error
  }
}

// Get client contracts
export const getClientContracts = async (id: string) => {
  try {
    const response = await api.get(`/clients/${id}/contracts`)
    return response.data
  } catch (error) {
    console.error("Get client contracts error:", error)
    throw error
  }
}

// Get client payments
export const getClientPayments = async (id: string) => {
  try {
    const response = await api.get(`/clients/${id}/payments`)
    return response.data
  } catch (error) {
    console.error("Get client payments error:", error)
    throw error
  }
}
