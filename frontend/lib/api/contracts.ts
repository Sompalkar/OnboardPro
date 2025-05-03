import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Types
export type Contract = {
  _id: string
  client:
    | string
    | {
        _id: string
        name: string
        email: string
        company?: string
      }
  template?: string
  title: string
  content: string
  status: "draft" | "sent" | "viewed" | "signed" | "expired" | "cancelled"
  signatureRequest?: {
    id: string
    url: string
    expiresAt: string
  }
  signedDocument?: {
    url: string
    cloudinaryId: string
  }
  sentAt?: string
  viewedAt?: string
  signedAt?: string
  expiresAt?: string
  createdAt: string
  updatedAt: string
}

export type ContractFormData = {
  clientId: string
  templateId?: string
  title: string
  content: string
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

// Get all contracts
export const getContracts = async (): Promise<Contract[]> => {
  try {
    const response = await api.get("/contracts")
    return response.data
  } catch (error) {
    console.error("Get contracts error:", error)
    throw error
  }
}

// Get contract by ID
export const getContractById = async (id: string): Promise<Contract> => {
  try {
    const response = await api.get(`/contracts/${id}`)
    return response.data
  } catch (error) {
    console.error("Get contract error:", error)
    throw error
  }
}

// Create contract
export const createContract = async (data: ContractFormData): Promise<Contract> => {
  try {
    const response = await api.post("/contracts", data)
    return response.data
  } catch (error) {
    console.error("Create contract error:", error)
    throw error
  }
}

// Update contract
export const updateContract = async (id: string, data: Partial<ContractFormData>): Promise<Contract> => {
  try {
    const response = await api.put(`/contracts/${id}`, data)
    return response.data
  } catch (error) {
    console.error("Update contract error:", error)
    throw error
  }
}

// Delete contract
export const deleteContract = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/contracts/${id}`)
    return response.data
  } catch (error) {
    console.error("Delete contract error:", error)
    throw error
  }
}

// Send contract for signature
export const sendContract = async (id: string): Promise<Contract> => {
  try {
    const response = await api.post(`/contracts/${id}/send`)
    return response.data
  } catch (error) {
    console.error("Send contract error:", error)
    throw error
  }
}

// Get contracts by status
export const getContractsByStatus = async (status: Contract["status"]): Promise<Contract[]> => {
  try {
    const response = await api.get(`/contracts/status/${status}`)
    return response.data
  } catch (error) {
    console.error("Get contracts by status error:", error)
    throw error
  }
}
