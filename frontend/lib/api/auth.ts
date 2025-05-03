import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Types
type LoginData = {
  email: string
  password: string
}

type RegisterData = {
  name: string
  email: string
  password: string
  company?: string
  role?: string
}

type AuthResponse = {
  token: string
  user: {
    id: string
    name: string
    email: string
    company?: string
    role: string
    subscription: {
      plan: string
      status: string
      endDate?: string
    }
  }
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

// Login user
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/login", data)
    return response.data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

// Register user
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/register", data)
    return response.data
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

// Get current user
export const getCurrentUser = async (): Promise<AuthResponse["user"]> => {
  try {
    const response = await api.get("/auth/me")
    return response.data
  } catch (error) {
    console.error("Get current user error:", error)
    throw error
  }
}

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}
