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
export type Contract = {
  id: string
  title: string
  content: string
  status: "draft" | "sent" | "signed" | "expired" | "declined"
  clientId?: string
  clientName?: string
  createdAt: string
  updatedAt: string
  signedAt?: string
  expiresAt?: string
  signatureRequestId?: string
  signatureUrl?: string
}

export type SignatureRequest = {
  contractId: string
  recipientName: string
  recipientEmail: string
  message?: string
  expiresIn: number
}

// Get all contracts
export const getContracts = async (): Promise<Contract[]> => {
  try {
    const response = await api.get("/contracts")
    return response.data
  } catch (error) {
    console.error("Error fetching contracts:", error)
    throw error
  }
}

// Get contract by ID
export const getContract = async (id: string): Promise<Contract> => {
  try {
    const response = await api.get(`/contracts/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching contract ${id}:`, error)
    throw error
  }
}

// Create contract
export const createContract = async (contractData: Partial<Contract>): Promise<Contract> => {
  try {
    const response = await api.post("/contracts", contractData)
    return response.data
  } catch (error) {
    console.error("Error creating contract:", error)
    throw error
  }
}

// Update contract
export const updateContract = async (id: string, contractData: Partial<Contract>): Promise<Contract> => {
  try {
    const response = await api.put(`/contracts/${id}`, contractData)
    return response.data
  } catch (error) {
    console.error(`Error updating contract ${id}:`, error)
    throw error
  }
}

// Delete contract
export const deleteContract = async (id: string): Promise<void> => {
  try {
    await api.delete(`/contracts/${id}`)
  } catch (error) {
    console.error(`Error deleting contract ${id}:`, error)
    throw error
  }
}

// Send signature request
export const sendSignatureRequest = async (requestData: SignatureRequest): Promise<any> => {
  try {
    const response = await api.post("/contracts/signature-request", requestData)
    return response.data
  } catch (error) {
    console.error("Error sending signature request:", error)
    throw error
  }
}

// Sign contract
export const signContract = async (id: string, signatureData: string): Promise<Contract> => {
  try {
    const response = await api.post(`/contracts/${id}/sign`, { signatureData })
    return response.data
  } catch (error) {
    console.error(`Error signing contract ${id}:`, error)
    throw error
  }
}

// Decline contract
export const declineContract = async (id: string, reason: string): Promise< Contract | any> => {
  try {
    const response = await api.post(`/contracts/${id}/decline`, { reason })
    return response.data

  } catch (error) {
    console.error(`Error declining contract  ${ reason }`)
   

  }  
}

// Get signature status
export const getSignatureStatus = async (id: string): Promise<any> => {
  try {
    const response = await api.get(`/contracts/${id}/signature-status`)
    return response.data
  } catch (error) {
    console.error(`Error getting signature status for contract ${id}:`, error)
    throw error
  }
}
