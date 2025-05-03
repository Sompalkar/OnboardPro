import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Types
export type Template = {
  _id: string
  title: string
  description?: string
  content: string
  category: "contract" | "proposal" | "scope" | "legal" | "other"
  dynamicFields?: Array<{
    key: string
    description: string
  }>
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export type TemplateFormData = Omit<Template, "_id" | "createdAt" | "updatedAt">

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

// Get all templates
export const getTemplates = async (): Promise<Template[]> => {
  try {
    const response = await api.get("/templates")
    return response.data
  } catch (error) {
    console.error("Get templates error:", error)
    throw error
  }
}

// Get template by ID
export const getTemplateById = async (id: string): Promise<Template> => {
  try {
    const response = await api.get(`/templates/${id}`)
    return response.data
  } catch (error) {
    console.error("Get template error:", error)
    throw error
  }
}

// Create template
export const createTemplate = async (data: TemplateFormData): Promise<Template> => {
  try {
    const response = await api.post("/templates", data)
    return response.data
  } catch (error) {
    console.error("Create template error:", error)
    throw error
  }
}

// Update template
export const updateTemplate = async (id: string, data: Partial<TemplateFormData>): Promise<Template> => {
  try {
    const response = await api.put(`/templates/${id}`, data)
    return response.data
  } catch (error) {
    console.error("Update template error:", error)
    throw error
  }
}

// Delete template
export const deleteTemplate = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/templates/${id}`)
    return response.data
  } catch (error) {
    console.error("Delete template error:", error)
    throw error
  }
}

// Get templates by category
export const getTemplatesByCategory = async (category: Template["category"]): Promise<Template[]> => {
  try {
    const response = await api.get(`/templates/category/${category}`)
    return response.data
  } catch (error) {
    console.error("Get templates by category error:", error)
    throw error
  }
}
