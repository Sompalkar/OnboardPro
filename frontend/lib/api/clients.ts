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
export type Client = {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  address?: string
  notes?: string
  createdAt: string
  updatedAt: string
  projects?: any[]
  payments?: any[]
}

// Get all clients
export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await api.get("/clients")
    return response.data
  } catch (error) {
    console.error("Error fetching clients:", error)
    throw error
  }
}

// Get client by ID
export const getClient = async (id: string): Promise<Client> => {
  try {
    const response = await api.get(`/clients/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching client ${id}:`, error)
    throw error
  }
}

// Create client
export const createClient = async (clientData: Partial<Client>): Promise<Client> => {
  try {
    const response = await api.post("/clients", clientData)
    return response.data
  } catch (error) {
    console.error("Error creating client:", error)
    throw error
  }
}

// Update client
export const updateClient = async (id: string, clientData: Partial<Client>): Promise<Client> => {
  try {
    const response = await api.put(`/clients/${id}`, clientData)
    return response.data
  } catch (error) {
    console.error(`Error updating client ${id}:`, error)
    throw error
  }
}

// Delete client
export const deleteClient = async (id: string): Promise<void> => {
  try {
    await api.delete(`/clients/${id}`)
  } catch (error) {
    console.error(`Error deleting client ${id}:`, error)
    throw error
  }
}
